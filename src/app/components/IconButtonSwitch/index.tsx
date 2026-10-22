"use client"
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion";

export default function IconButtonSwitch({
    onClick = () => { },
    name,
    index,
    type = "weapons",
    active,
    star,
    className,
    "aria-label": ariaLabel
}: {
    onClick: () => void;
    name?: string,
    index: number
    type?: string,
    active: number,
    star?: boolean,
    className?: string,
    "aria-label"?: string
}) {
    const isActive = active === index;

    return (
        <motion.button
            onClick={onClick}
            aria-pressed={isActive}
            aria-label={ariaLabel || name}
            className="relative flex items-center justify-center"
            whileHover={{ scale: isActive ? 1 : 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
            style={{ outline: "none" }}
        >
            {star ? (
                <motion.div
                    className={`p-2 rounded-xl flex justify-center items-center ${isActive ? "bg-bg-dark" : ""}`}
                    animate={{ backgroundColor: isActive ? "var(--color-bg-dark)" : "transparent" }}
                    transition={{ duration: 0.15 }}
                >
                    <FaStar className={`text-2xl ${className || ""}`} aria-hidden="true" />
                </motion.div>
            ) : (
                <motion.div
                    className={`w-10 h-10 md:w-12 md:h-12 p-1 cursor-pointer rounded-xl ${isActive ? "bg-bg-dark" : ""} relative`}
                    animate={{ backgroundColor: isActive ? "var(--color-bg-dark)" : "transparent" }}
                    transition={{ duration: 0.15 }}
                >
                    <Image
                        src={`/${type === "weapons" ? "weapons" : "elements"}/${name}.${type === "weapons" ? "png" : "webp"}`}
                        width={50}
                        height={50}
                        alt=""
                        aria-hidden="true"
                        className="w-full h-full object-contain"
                    />
                    {isActive && (
                        <motion.div
                            className="absolute inset-0 bg-primary/20 rounded-xl"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.15 }}
                            aria-hidden="true"
                        />
                    )}
                </motion.div>
            )}
            <motion.div
                className="absolute -inset-1 rounded-[1.125rem] border-2 border-primary opacity-0"
                animate={{ opacity: isActive ? 1 : 0 }}
                transition={{ duration: 0.15 }}
                aria-hidden="true"
            />
        </motion.button>
    );
}