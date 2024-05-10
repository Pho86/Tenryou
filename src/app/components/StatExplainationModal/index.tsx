"use client"
import { AnimatePresence, motion } from "framer-motion";
export default function StatsModal({
    exit,
}: {

    exit: () => void
}) {
    return <AnimatePresence>
        <div className="fixed w-[100vw] h-[100dvh] top-0 left-0 flex items-center bg-bg bg-opacity-[30%] justify-center z-[8000]" onClick={() => { exit() }}>
            <motion.div className="max-h-[70dvh] md:max-h-[80dvh] md:max-w-[60dvw] p-8 bg-bg rounded-xl " onClick={(e) => e.stopPropagation()}
                initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} transition={{ ease: "easeInOut" }}>
                <div className="flex flex-col gap-2">
                    <h2 className="font-bold text-3xl text-primary">Stats Explaination</h2>
                    <p><span className="font-bold">Crit Value</span> = Crit Rate * 2 + Crit Damage</p>
                    <div className="grid grid-cols-4 gap-2 place-items-center">
                        <div className="p-2 bg-red-500 w-full"></div>
                        <div className="p-2 bg-orange-500 w-full"></div>
                        <div className="p-2 bg-yellow-500 w-full"></div>
                        <div className="p-2 bg-green-500 w-full"></div>
                        <div className="p-2 text-red-500 ">Low</div>
                        <div className="p-2 text-orange-500">Average</div>
                        <div className="p-2 text-yellow-500">Decent</div>
                        <div className="p-2 text-green-500">Good</div>
                    </div>
                </div>
            </motion.div>
        </div>
    </AnimatePresence >
}