"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { Character } from "@/app/types/character";
import { motion, AnimatePresence } from "framer-motion";
import { useDrag } from "@/app/components/TeamBuilder/drag-context";

const isCharacterOwned = (arr: Character[], targetName: string) =>
    arr.some((c) => c.name === targetName);

const rarityGradients: Record<number, string> = {
    4: "from-gradient-SR-start to-gradient-SR-end",
    5: "from-gradient-SSR-start to-gradient-SSR-end",
};

export default function TeamCharacterCard({
    character,
    index,
    selectCharacter,
    removeCharacter,
    activeProp,
    selectOwned,
    ownedOption,
    ownedCharacters,
    traveller = false,
    isSkeleton = false,
}: {
    character: Character;
    index: number;
    selectCharacter: (char: Character) => void;
    removeCharacter: (char: Character) => void;
    activeProp: () => boolean;
    selectOwned: (char: Character) => void;
    ownedOption: boolean;
    ownedCharacters: Character[];
    traveller?: boolean;
    isSkeleton?: boolean;
}) {
    const { startDrag } = useDrag();
    const [active, setActive] = useState<boolean>(activeProp());
    const [owned, setOwned] = useState<boolean>(false);
    const [hovered, setHovered] = useState<boolean>(false);
    const pointerStart = useRef<{ x: number; y: number } | null>(null);
    const dragging = useRef(false);

    useEffect(() => { setActive(activeProp()); }, [activeProp]);
    useEffect(() => {
        if (ownedOption) setOwned(isCharacterOwned(ownedCharacters, character.name));
    }, [ownedCharacters, ownedOption, character.name]);

    const gradientClass = rarityGradients[character.rarity] ?? rarityGradients[5];

    const handlePointerDown = useCallback((e: React.PointerEvent) => {
        if (isSkeleton) return;
        pointerStart.current = { x: e.clientX, y: e.clientY };
        dragging.current = false;
        // Do NOT setPointerCapture — we need pointerenter to fire on team slots
    }, [isSkeleton]);

    const handlePointerMove = useCallback((e: React.PointerEvent) => {
        if (!pointerStart.current) return;
        const dx = e.clientX - pointerStart.current.x;
        const dy = e.clientY - pointerStart.current.y;
        if (!dragging.current && Math.hypot(dx, dy) > 6) {
            dragging.current = true;
            startDrag(
                { kind: "roster", character, rosterIndex: index },
                e.clientX,
                e.clientY
            );
        }
    }, [character, index, startDrag]);

    const handlePointerUp = useCallback((e: React.PointerEvent) => {
        if (!dragging.current && pointerStart.current) {
            if (ownedOption) {
                selectOwned(character);
            } else if (active) {
                removeCharacter(character);
                setActive(false);
            } else {
                selectCharacter(character);
                setActive(true);
            }
        }
        pointerStart.current = null;
        dragging.current = false;
    }, [active, character, ownedOption, removeCharacter, selectCharacter, selectOwned]);

    if (isSkeleton) {
        return (
            <motion.div
                className="w-full rounded-xl bg-bg-dark/50 border border-bg-light/30 overflow-hidden"
                animate={{ opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            >
                <div
                    className="w-full bg-gradient-to-br from-bg-lighter to-bg-light rounded-t-xl rounded-br-4xl"
                    style={{ aspectRatio: "1/1" }}
                />
                <div className="h-4 w-3/4 mx-auto my-2 rounded bg-bg-lighter" />
            </motion.div>
        );
    }

    return (
        <motion.div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            animate={{
                scale: active ? 1.04 : hovered ? 1.02 : 1,
                boxShadow:
                    active || hovered
                        ? "0 0 2px 4px rgba(223, 229, 220, 1)"
                        : "none",
                filter:
                    ownedOption && !owned ? "brightness(0.45)" : "brightness(1)",
            }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="w-full relative rounded-xl cursor-grab active:cursor-grabbing select-none touch-none bg-white/5 border border-bg-light/30"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    if (ownedOption) selectOwned(character);
                    else if (active) { removeCharacter(character); setActive(false); }
                    else { selectCharacter(character); setActive(true); }
                }
            }}
            aria-pressed={active}
            aria-label={
                active
                    ? `Remove ${character.name} from team`
                    : `Add ${character.name} to team`
            }
        >
            {/* Element badge */}
            <div className="absolute top-1 left-1 z-10 drop-shadow-icon pointer-events-none">
                <Image
                    src={`/elements/${character.elementText}.webp`}
                    width={22}
                    height={22}
                    alt={character.element ?? ""}
                />
            </div>

            {/* Region badge */}
            {character.region && (
                <div className="absolute top-1 right-1 z-10 drop-shadow-icon pointer-events-none">
                    <Image
                        src={`/regions/${character.region}.webp`}
                        width={22}
                        height={22}
                        alt={character.region}
                    />
                </div>
            )}

            {/* Art */}
            <div
                className={`w-full rounded-t-xl rounded-br-4xl bg-gradient-to-br ${gradientClass} overflow-hidden relative`}
                style={{ aspectRatio: "1/1" }}
            >
                <Image
                    src={
                        traveller
                            ? "/characters/travellers.webp"
                            : `https://enka.network/ui/UI_AvatarIcon_${character.fileName}.png`
                    }
                    width={200}
                    height={200}
                    alt={character.name}
                    title={character.name}
                    className="w-full h-full object-cover pointer-events-none"
                    priority={index < 8}
                    draggable={false}
                />

                {/* Selected overlay */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"
                    animate={{ opacity: active ? 0.4 : 0 }}
                    transition={{ duration: 0.18 }}
                    aria-hidden="true"
                />

                {/* Remove badge */}
                <AnimatePresence>
                    {active && (
                        <motion.div
                            className="absolute top-1.5 right-1.5 w-5 h-5 bg-primary rounded-full flex items-center justify-center text-bg-darkest font-bold text-[10px] shadow-md z-20"
                            initial={{ scale: 0, rotate: -90 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: 0, rotate: 90 }}
                            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                            aria-hidden="true"
                        >
                            ✕
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Name label */}
            <div className="text-center w-full px-1 py-1 text-gray-900 font-bold rounded-b-xl bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center leading-tight">
                <span className={`text-[0.6rem] whitespace-nowrap ${active ? "text-primary" : "text-gray-900"}`}>
                    {traveller ? "Traveller" : character.name}
                </span>
                {traveller && character.elementText && (
                    <span className="text-[8px] font-bold text-primary/90 uppercase tracking-wider leading-none">
                        {character.elementText}
                    </span>
                )}
            </div>
        </motion.div>
    );
}
