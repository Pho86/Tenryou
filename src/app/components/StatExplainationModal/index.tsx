"use client"
import { AnimatePresence, motion } from "framer-motion";
import Modal from "../Modal";
export default function StatsModal({
    exit,
    visible
}: {

    exit: () => void,
    visible:boolean
}) {
    return <Modal visible={visible} exit={exit}>
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
    </Modal>
}