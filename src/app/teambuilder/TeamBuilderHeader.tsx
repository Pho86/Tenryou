"use client"
import { motion } from "framer-motion";

export default function TeamBuilderHeader() {
    return (
        <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-3 border-b border-bg-light/60 pb-6"
        >
            <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="font-mono text-sm font-semibold text-primary uppercase tracking-wider"
            >
                TOOLS
            </motion.span>
            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-text tracking-tight"
            >
                Team Builder
            </motion.h1>
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-2xl text-base md:text-lg text-text/70 leading-relaxed"
            >
                Assemble your party, filter by element and weapon, and get AI-powered team recommendations or build insights.
            </motion.p>
        </motion.header>
    );
}