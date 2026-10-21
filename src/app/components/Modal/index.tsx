"use client"
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef } from "react";
export default function Modal({
    exit,
    children,
    visible,
    label = "Dialog"
}: {

    exit: () => void,
    children: React.ReactNode
    visible: boolean
    label?: string
}) {
    const panelRef = useRef<HTMLDivElement>(null);
    const exitRef = useRef(exit);

    useEffect(() => {
        exitRef.current = exit;
    }, [exit]);

    useEffect(() => {
        if (!visible) return;
        const previouslyFocused = document.activeElement as HTMLElement | null;
        const panel = panelRef.current;
        panel?.focus();

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                exitRef.current();
                return;
            }
            if (event.key !== "Tab" || !panel) return;

            const focusable = Array.from(panel.querySelectorAll<HTMLElement>(
                'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
            ));
            if (focusable.length === 0) {
                event.preventDefault();
                panel.focus();
                return;
            }
            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            if (event.shiftKey && (document.activeElement === first || document.activeElement === panel)) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        };

        document.addEventListener("keydown", onKeyDown);
        return () => {
            document.removeEventListener("keydown", onKeyDown);
            previouslyFocused?.focus?.();
        };
    }, [visible]);

    return <AnimatePresence>
        {visible && <div className="fixed  w-[100vw] h-[100dvh] top-0 left-0 flex items-center bg-bg-darkest/40 justify-center z-[8000]" onClick={() => { exit() }}>
            <motion.div ref={panelRef} role="dialog" aria-modal="true" aria-label={label} tabIndex={-1} className="max-h-[70dvh] md:max-h-[80dvh] md:max-w-[60dvw] p-8 bg-bg-light rounded-xl border-2 border-bg-lighter shadow-2xl outline-none " onClick={(e) => e.stopPropagation()}
                initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} transition={{ ease: "easeInOut" }}>
                {children}
            </motion.div>
        </div>}
    </AnimatePresence >
}
