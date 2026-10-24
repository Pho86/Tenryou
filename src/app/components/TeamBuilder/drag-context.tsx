"use client";

import React, {
    createContext,
    useContext,
    useState,
    useCallback,
    useRef,
    useEffect,
    type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Character } from "@/app/types/character";

// ─── types ───────────────────────────────────────────────────────────────────

export type DragSource =
    | { kind: "roster"; character: Character; rosterIndex: number }
    | { kind: "slot"; character: Character; slotIndex: number };

interface DragState {
    source: DragSource | null;
    x: number;
    y: number;
    overSlot: number | null;
}

interface DragContextValue {
    drag: DragState;
    startDrag: (source: DragSource, x: number, y: number) => void;
    moveDrag: (x: number, y: number) => void;
    enterSlot: (index: number) => void;
    leaveSlot: () => void;
    endDrag: () => void;
    setOnDrop: (fn: (source: DragSource, targetSlot: number) => void) => void;
}

const DragContext = createContext<DragContextValue | null>(null);

export function useDrag() {
    const ctx = useContext(DragContext);
    if (!ctx) throw new Error("useDrag must be used inside DragProvider");
    return ctx;
}

// ─── provider ────────────────────────────────────────────────────────────────

export function DragProvider({ children }: { children: ReactNode }) {
    const [drag, setDrag] = useState<DragState>({
        source: null,
        x: 0,
        y: 0,
        overSlot: null,
    });

    // Refs mirror the live values so callbacks never go stale
    const activeSource = useRef<DragSource | null>(null);
    const activeOverSlot = useRef<number | null>(null);
    const onDropRef = useRef<((source: DragSource, targetSlot: number) => void) | null>(null);

    const startDrag = useCallback((source: DragSource, x: number, y: number) => {
        activeSource.current = source;
        activeOverSlot.current = null;
        setDrag({ source, x, y, overSlot: null });
    }, []);

    const moveDrag = useCallback((x: number, y: number) => {
        setDrag(prev => prev.source ? { ...prev, x, y } : prev);
    }, []);

    const enterSlot = useCallback((index: number) => {
        activeOverSlot.current = index;
        setDrag(prev => prev.source ? { ...prev, overSlot: index } : prev);
    }, []);

    const leaveSlot = useCallback(() => {
        activeOverSlot.current = null;
        setDrag(prev => prev.source ? { ...prev, overSlot: null } : prev);
    }, []);

    // endDrag reads from refs — never stale, no closure dependency
    const endDrag = useCallback(() => {
        const source = activeSource.current;
        const overSlot = activeOverSlot.current;
        if (source && overSlot !== null && onDropRef.current) {
            onDropRef.current(source, overSlot);
        }
        activeSource.current = null;
        activeOverSlot.current = null;
        setDrag({ source: null, x: 0, y: 0, overSlot: null });
    }, []); // stable — no deps needed

    const setOnDrop = useCallback((fn: (source: DragSource, targetSlot: number) => void) => {
        onDropRef.current = fn;
    }, []);

    // Global pointer-up / pointer-move on window
    useEffect(() => {
        const handlePointerUp = () => {
            if (activeSource.current) endDrag();
        };
        const handlePointerMove = (e: PointerEvent) => {
            if (activeSource.current) moveDrag(e.clientX, e.clientY);
        };
        window.addEventListener("pointerup", handlePointerUp);
        window.addEventListener("pointermove", handlePointerMove);
        return () => {
            window.removeEventListener("pointerup", handlePointerUp);
            window.removeEventListener("pointermove", handlePointerMove);
        };
    }, [endDrag, moveDrag]);

    return (
        <DragContext.Provider value={{ drag, startDrag, moveDrag, enterSlot, leaveSlot, endDrag, setOnDrop }}>
            {children}
            <DragGhost drag={drag} />
        </DragContext.Provider>
    );
}

// ─── ghost ────────────────────────────────────────────────────────────────────

function DragGhost({ drag }: { drag: DragState }) {
    const [mounted, setMounted] = useState(false);
    useEffect(() => { setMounted(true); }, []);
    if (!mounted) return null;

    const char = drag.source?.character;
    const isTraveller = char?.name.startsWith("Traveller");

    return createPortal(
        <AnimatePresence>
            {drag.source && char && (
                <motion.div
                    key="drag-ghost"
                    className="pointer-events-none fixed z-[9999] select-none"
                    style={{ left: drag.x - 44, top: drag.y - 56 }}
                    initial={{ opacity: 0, scale: 0.7, rotate: 0 }}
                    animate={{ opacity: 0.93, scale: 1, rotate: -4 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div className="w-[88px] rounded-xl overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.8)] ring-2 ring-primary/70">
                        <Image
                            src={
                                isTraveller
                                    ? "/characters/travellers.webp"
                                    : `https://enka.network/ui/UI_AvatarIcon_${char.fileName}.png`
                            }
                            width={200}
                            height={200}
                            alt={char.name}
                            className="w-full aspect-square object-cover rounded-t-xl"
                            draggable={false}
                        />
                        <div className="bg-white/90 px-1.5 py-1">
                            <p className="text-[10px] font-bold text-gray-900 text-center truncate leading-tight">
                                {char.name}
                            </p>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    );
}
