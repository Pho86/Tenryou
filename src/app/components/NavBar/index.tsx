"use client";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
const navItems = [
    {
        path: "/",
        name: "Home",
        icon: "/icons/home.svg"
    },
    {
        path: "/characters",
        name: "Characters",
        icon: "/icons/character_icon.svg"
    },
    {
        path: "/users",
        name: "Users",
        icon: "/icons/users.svg"
    },
    {
        path: "/teambuilder",
        name: "Team Builder",
        altname: "Team",
        icon: "/icons/team.svg"
    },
    {
        path: "/database",
        name: "Database",
        icon: "/icons/items.webp"
    },
];

export default function NavBar() {
    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState<boolean>(false);
    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious();
        //@ts-ignore
        if (latest > previous && latest > 350) {
            setHidden(true);
        } else {
            setHidden(false);
        }
    })

    let pathname = usePathname() || "/";

    if (pathname.includes("/achievements") || pathname.includes("/weapons") || pathname.includes("/materials") || pathname.includes("/elements") || pathname.includes("/artifacts") || pathname.includes("/namecards") || pathname.includes("/outfits")) pathname = "/database";
    if (pathname.includes("/characters")) pathname = "/characters";
    if (pathname.includes("/users")) pathname = "/users";

    return (
        <>
            <motion.nav className="w-full hidden px-8 md:px-16 md:flex justify-center z-[1000]  bg-bg-darker items-center py-2 rounded-lg fixed "
                variants={{
                    visible: { y: 0 },
                    hidden: { y: "-100%" },
                }}
                animate={hidden ? "hidden" : "visible"}
                transition={{ ease: "easeInOut", duration: .5 }}
            >
                <div className="flex gap-2 relative justify-between w-full z-[100] h-full items-center max-w-screen-2xl">
                    <div className="">
                        <Link href="/" className="flex text-2xl items-center gap-1 justify-center transition-all cursor-pointer font-bold hover:text-primary">
                            <Image src="/icon.svg" width={45} height={45} alt="Tenryou Icon" className="drop-shadow-icon" />
                            <span>Tenryou</span>
                        </Link>
                    </div>
                    <div className="h-full flex justify-between text-nowrap gap-2">
                        {navItems.map((item, index) => {
                            const isActive = item.path === pathname;
                            return (
                                <Link
                                    key={item.path}
                                    className={`px-4 py-2 rounded-xl w-full font-semibold h-full relative duration-300 ease-in ${isActive ? "text-primary" : "text-text"} hover:text-accent`}
                                    data-active={isActive}
                                    href={item.path}
                                >
                                    <span>{item.name}</span>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </motion.nav>
            <motion.nav className="w-full fixed bottom-0 md:hidden justify-between z-[1000] grid grid-cols-5 place-items-center text-nowrap text-xs  sm:text-sm font-bold px-1 py-1 bg-bg-darker"
            >
                {navItems.map((item, index) => {
                    const isActive = item.path === pathname;
                    return (
                        <Link
                            key={item.path}
                            className={`px-4 py-2 rounded-xl w-full font-semibold text-center flex flex-col items-center justify-center h-full relative transition-all ease-in ${isActive ? "text-primary" : "text-text"} hover:text-accent`}
                            data-active={isActive}
                            href={item.path}
                        >
                            <Image src={item.icon} width={30} height={30} alt="Home Icon" className=" h-10 w-10" />
                            <h3 className=" group-hover:text-primary relative font-normal transition-all">{item.altname ? item.altname : item.name}</h3>
                        </Link>
                    );
                })}

            </motion.nav >
        </>
    );
}