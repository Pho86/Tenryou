"use client"
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
export default function Modal({
    exit,
    children,
    visible
}: {

    exit: () => void,
    children: React.ReactNode
    visible: boolean
}) {
    return <AnimatePresence>
        {visible && <div className="fixed  w-[100vw] h-[100dvh] top-0 left-0 flex items-center bg-bg bg-opacity-[30%] justify-center z-[8000]" onClick={() => { exit() }}>
            <motion.div className="max-h-[70dvh] md:max-h-[80dvh] md:max-w-[60dvw] p-8 bg-bg rounded-xl border-2 " onClick={(e) => e.stopPropagation()}
                initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} transition={{ ease: "easeInOut" }}>
                {children}
            </motion.div>
        </div>}
    </AnimatePresence >
}