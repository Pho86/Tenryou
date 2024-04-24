import {
    motion,
    useMotionValueEvent,
    useScroll,
    useSpring,
    useTransform,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

export default function SmoothScroll({ children, className }: { children: React.ReactNode, className: string }) {
    const [isLoading, setIsLoading] = useState(true);

    const contentRef = useRef<HTMLDivElement>(null);
    const [contentHeight, setContentHeight] = useState(0);
    const [windowHeight, setWindowHeight] = useState(0);

    useEffect(() => {
        const handleResize = () => {
            if (contentRef.current != null) {
                setContentHeight(contentRef.current.scrollHeight);
            }
            setWindowHeight(window.innerHeight);
        };

        // Manually call the first time
        handleResize();

        // Setup listeners for window resizing
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [contentRef]);

    // Intercept normal scroll behavior
    const { scrollYProgress } = useScroll();
    const smoothProgress = useSpring(scrollYProgress, {
        mass: 0.1,
        stiffness: 100,
        damping: 20,
        restDelta: 0.001,
    });

    useMotionValueEvent(smoothProgress, "change", (latest) => {
        if (latest < 0.01) {
            setIsLoading(false);
        }
    });

    const y = useTransform(smoothProgress, (value) => {
        return value * -(contentHeight - windowHeight);
    });

    return (
        <>
            <div style={{ height: contentHeight }} />
            <motion.div
                className={`w-screen fixed top-0 flex flex-col transition-opacity duration-200 ease-in-out + ${className}`}
                ref={contentRef}
                style={{ y: isLoading ? 0 : y, opacity: isLoading ? 0 : 1 }}
            >
                {children}
            </motion.div>
        </>
    );
};

