"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

type NavItem = {
    path: string;
    name: string;
    icon: string;
    altname?: string;
    external?: boolean;
};

const topNavItems: NavItem[] = [
    { path: "/", name: "Home", icon: "/icons/home.svg" },
    { path: "/characters", name: "Characters", icon: "/icons/character_icon.svg" },
    { path: "/users", name: "Users", icon: "/icons/users.svg" },
    { path: "/teambuilder", name: "Team Builder", altname: "Team", icon: "/icons/team.svg" },
];

const databaseItems: NavItem[] = [
    { path: "/database", name: "Overview", icon: "/icons/items.webp" },
    { path: "/elements", name: "Elements", icon: "/icons/elements.webp" },
    { path: "/materials", name: "Materials", icon: "/icons/materials.webp" },
    { path: "/artifacts", name: "Artifacts", icon: "/icons/artifacts.webp" },
    { path: "/weapons", name: "Weapons", icon: "/icons/weapons.webp" },
    { path: "/namecards", name: "Namecards", icon: "/icons/namecards.webp" },
    { path: "/outfits", name: "Outfits", icon: "/icons/outfits.webp" },
    { path: "/achievements", name: "Achievements", icon: "/icons/achievements.webp" },
    { path: "https://act.hoyolab.com/ys/app/interactive-map/index.html", name: "Interactive Map", icon: "/icons/map.webp", external: true },
];

const databasePaths = new Set(databaseItems.map((i) => i.path).filter((p) => !p.startsWith("http")));

function isDatabasePath(pathname: string) {
    return databasePaths.has(pathname) || Array.from(databasePaths).some((p) => pathname.startsWith(p + "/"));
}

export default function NavBar() {
    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState<boolean>(false);
    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() ?? 0;
        if (latest > previous && latest > 350) {
            setHidden(true);
        } else {
            setHidden(false);
        }
    });

    const rawPathname = usePathname() || "/";
    let pathname = rawPathname;
    if (pathname.includes("/characters")) pathname = "/characters";
    if (pathname.includes("/users")) pathname = "/users";

    const [dbOpen, setDbOpen] = useState(false);
    const dbRef = useRef<HTMLDivElement>(null);
    const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        setDbOpen(false);
    }, [rawPathname]);

    useEffect(() => {
        if (!dbOpen) return;
        const closeOnOutside = (event: PointerEvent) => {
            if (!dbRef.current?.contains(event.target as Node)) setDbOpen(false);
        };
        const closeOnEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") setDbOpen(false);
        };
        document.addEventListener("pointerdown", closeOnOutside);
        document.addEventListener("keydown", closeOnEscape);
        return () => {
            document.removeEventListener("pointerdown", closeOnOutside);
            document.removeEventListener("keydown", closeOnEscape);
        };
    }, [dbOpen]);

    const openDb = () => {
        if (hoverTimer.current) clearTimeout(hoverTimer.current);
        setDbOpen(true);
    };
    const scheduleCloseDb = () => {
        if (hoverTimer.current) clearTimeout(hoverTimer.current);
        hoverTimer.current = setTimeout(() => setDbOpen(false), 140);
    };

    const dbActive = isDatabasePath(pathname);

    return (
        <>
            <motion.nav
                className="w-full hidden px-8 md:px-16 md:flex justify-center z-[1000] bg-bg-darker items-center py-2 rounded-lg fixed"
                variants={{ visible: { y: 0 }, hidden: { y: "-100%" } }}
                animate={hidden ? "hidden" : "visible"}
                transition={{ ease: "easeInOut", duration: 0.5 }}
            >
                <div className="flex gap-2 relative justify-between w-full z-[100] h-full items-center max-w-screen-2xl">
                    <Link href="/" className="flex text-2xl items-center gap-1 justify-center transition-all cursor-pointer font-bold hover:text-primary">
                        <Image src="/icon.svg" width={45} height={45} alt="Tenryou Icon" className="drop-shadow-icon" />
                        <span>Tenryou</span>
                    </Link>
                    <div className="h-full flex items-center text-nowrap gap-1">
                        {topNavItems.map((item) => {
                            const isActive = item.path === pathname;
                            return (
                                <Link
                                    key={item.path}
                                    className={`px-4 py-2 rounded-xl font-semibold h-full relative duration-300 ease-in ${isActive ? "text-primary" : "text-text"} hover:text-accent`}
                                    data-active={isActive}
                                    href={item.path}
                                >
                                    <span>{item.altname ? item.altname : item.name}</span>
                                </Link>
                            );
                        })}

                        <div
                            ref={dbRef}
                            className="relative"
                            onMouseEnter={openDb}
                            onMouseLeave={scheduleCloseDb}
                        >
                            <Link
                                href="/database"
                                onClick={() => setDbOpen(false)}
                                className={`px-4 py-2 rounded-xl font-semibold h-full relative duration-300 ease-in inline-flex items-center gap-1.5 ${dbActive ? "text-primary" : "text-text"} hover:text-accent`}
                                data-active={dbActive}
                                aria-haspopup="menu"
                                aria-expanded={dbOpen}
                            >
                                <span>Database</span>
                                <svg
                                    width="12"
                                    height="12"
                                    viewBox="0 0 12 12"
                                    fill="none"
                                    aria-hidden="true"
                                    className={`transition-transform duration-200 ${dbOpen ? "rotate-180" : ""}`}
                                >
                                    <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </Link>

                            <AnimatePresence>
                                {dbOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 6, scale: 0.98 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 6, scale: 0.98 }}
                                        transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
                                        className="absolute right-0 top-full z-[200] mt-2 w-[22rem] rounded-xl border border-bg-light/60 bg-bg-dark/95 p-2 shadow-[0_16px_40px_rgba(0,0,0,0.5)] backdrop-blur-md"
                                        role="menu"
                                        aria-label="Database sections"
                                    >
                                        <div className="grid grid-cols-2 gap-1">
                                            {databaseItems.map((item) => {
                                                const isActive = item.path === pathname;
                                                const linkProps = item.external
                                                    ? { target: "_blank", rel: "noopener noreferrer" }
                                                    : {};
                                                return (
                                                    <Link
                                                        key={item.path}
                                                        href={item.path}
                                                        onClick={() => setDbOpen(false)}
                                                        role="menuitem"
                                                        className={`flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${isActive ? "bg-primary/15 text-primary" : "text-text/80 hover:bg-bg-light/60 hover:text-text"}`}
                                                        {...linkProps}
                                                    >
                                                        <Image src={item.icon} width={20} height={20} alt="" className="h-5 w-5 shrink-0 object-contain" />
                                                        <span className="truncate">{item.name}</span>
                                                        {item.external && (
                                                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true" className="ml-auto shrink-0 opacity-60">
                                                                <path d="M3 1H9V7M9 1L1 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                                            </svg>
                                                        )}
                                                    </Link>
                                                );
                                            })}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </motion.nav>

            <motion.nav className="w-full fixed bottom-0 md:hidden justify-between z-[1000] grid grid-cols-5 place-items-center text-nowrap text-xs sm:text-sm font-bold px-1 py-1 bg-bg-darker">
                {topNavItems.map((item) => {
                    const isActive = item.path === pathname;
                    return (
                        <Link
                            key={item.path}
                            className={`px-2 py-2 rounded-xl w-full font-semibold text-center flex flex-col items-center justify-center h-full relative transition-all ease-in ${isActive ? "text-primary" : "text-text"} hover:text-accent`}
                            data-active={isActive}
                            href={item.path}
                        >
                            <Image src={item.icon} width={30} height={30} alt="Home Icon" className="h-10 w-10" />
                            <h3 className="group-hover:text-primary relative font-normal transition-all">{item.altname ? item.altname : item.name}</h3>
                        </Link>
                    );
                })}
                <Link
                    className={`px-2 py-2 rounded-xl w-full font-semibold text-center flex flex-col items-center justify-center h-full relative transition-all ease-in ${dbActive ? "text-primary" : "text-text"} hover:text-accent`}
                    data-active={dbActive}
                    href="/database"
                >
                    <Image src="/icons/items.webp" width={30} height={30} alt="Database Icon" className="h-10 w-10" />
                    <h3 className="group-hover:text-primary relative font-normal transition-all">Database</h3>
                </Link>
            </motion.nav>
        </>
    );
}
