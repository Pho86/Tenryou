"use client"
import { motion } from "framer-motion";

export default function Loader({ size = "md", className = "" }: { size?: "sm" | "md" | "lg"; className?: string }) {
    const sizeClasses = {
        sm: "w-8 h-8",
        md: "w-12 h-12",
        lg: "w-16 h-16",
    };

    return (
        <div role="status" aria-live="polite" aria-label="Loading" className={`flex items-center justify-center ${className}`}>
            <motion.svg
                className={`${sizeClasses[size]} text-primary`}
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                style={{ transformOrigin: "center" }}
                aria-hidden="true"
            >
                <circle
                    cx="50"
                    cy="50.5"
                    r="48"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeDasharray="200"
                    strokeDashoffset="50"
                    fill="none"
                    opacity="0.25"
                />
                <motion.path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                />
            </motion.svg>
            <span className="sr-only">Loading</span>
        </div>
    );
}