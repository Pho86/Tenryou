"use client"
import Link from "next/link"
import { useState } from "react"
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion"
import Image from "next/image";
import ThemeSwitch from "../ThemeSwitcher";
export default function NavBar({
    active = 0
}: {
    active?: number
}) {

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

    return (
        <>
            <motion.nav className="w-full fixed hidden px-8 md:px-16 md:flex justify-center z-[1000] font-bold py-2 md:py-0 bg-bg-darker items-center " variants={{
                visible: { y: 0 },
                hidden: { y: "-100%" },
            }}
                animate={hidden ? "hidden" : "visible"}
                transition={{ ease: "easeInOut", duration: .5 }}
            >
                <div className="w-full flex items-center justify-center max-w-screen-2xl">
                    <div className="justify-between w-full flex ">
                        <div className="border-primary cursor-pointer grid place-items-center md:pl-0">
                            <Link href="/" className="flex text-2xl items-center gap-1 justify-center transition-all cursor-pointer font-philosopher font-bold hover:text-primary">
                                <Image src="/icon.svg" width={45} height={45} alt="Tenryou Icon" className="drop-shadow-icon" />
                                <h2>
                                    Tenryou
                                </h2>
                            </Link>
                        </div>
                        <div className="flex justify-center items-center md:gap-3 sm:gap-2 gap-1 font-semibold">
                            <Link href="/characters" className="py-2 md:py-4 px-4 lg:px-6 transition-all cursor-pointer group">
                                <h3 className={`${active == 1 && "text-primary "} group-hover:text-primary relative transition-all`}>Characters</h3>
                            </Link>
                            <Link href="/users" className="py-2 md:py-4 px-4 lg:px-6 transition-all cursor-pointer group">
                                <h3 className={`${active == 2 && "text-primary "} group-hover:text-primary relative transition-all`}>Users</h3>
                            </Link>
                            <Link href="/teambuilder" className="py-2 md:py-4 px-4 lg:px-6 transition-all cursor-pointer group">
                                <h3 className={`${active == 3 && "text-primary "} group-hover:text-primary relative transition-all`}>Team Builder</h3>
                            </Link>
                            {/* <ThemeSwitch/> */}
                        </div>
                    </div>
                </div>
            </motion.nav>
            <motion.nav className="w-full fixed bottom-0 md:hidden justify-between z-[1000] grid grid-cols-4 place-items-center font-bold px-2 py-2 bg-bg-darker"
            >
                <Link href="/" className="py-2 md:py-4 px-4 transition-all cursor-pointer flex flex-col group items-center justify-center gap-1">
                    <Image src={'/icons/home.svg'} width={30} height={30} alt="Home Icon" />
                    <h3 className=" group-hover:text-primary relative font-normal transition-all">Home</h3>
                </Link>
                <Link href="/characters" className="py-2 md:py-4 px-4 transition-all cursor-pointer flex flex-col group items-center justify-center gap-1">
                    <Image src={'/icons/characters.svg'} width={30} height={30} alt="Characters Icon" />
                    <h3 className="group-hover:text-primary relative font-normal transition-all">Characters</h3>
                </Link>
                <Link href="/users" className="py-2 md:py-4 px-4 transition-all cursor-pointer flex flex-col group items-center justify-center gap-1">
                    <Image src={'/icons/users.svg'} width={30} height={30} alt="Users Icon" />
                    <h3 className="group-hover:text-primary relative font-normal transition-all">Users</h3>
                </Link>
                <Link href="/teambuilder" className="py-2 md:py-4 px-4 transition-all cursor-pointer flex flex-col group items-center justify-center gap-1">
                    <Image src={'/icons/team.svg'} width={30} height={30} alt="Team Icon" />
                    <h3 className="group-hover:text-primary relative font-normal transition-all">TeamBuilder</h3>
                </Link>
            </motion.nav >

        </>
    )
}