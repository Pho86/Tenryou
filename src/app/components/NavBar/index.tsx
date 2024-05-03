"use client"
import Link from "next/link"
import { useState } from "react"
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion"
import Image from "next/image";
export default function NavBar({

}: {
    }) {

    const { scrollY } = useScroll();
    const [ham, showHam] = useState<boolean>(false);
    const [hidden, setHidden] = useState<boolean>(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious();
        //@ts-ignore
        if (latest > previous && latest > 300) {
            setHidden(true);
            showHam(false);
        } else {
            setHidden(false);
        }
    })

    return (
        <>
            <motion.nav className="w-full fixed hidden md:flex justify-between z-[1000] font-bold px-2 py-2 md:py-0 bg-bg-darker" variants={{
                visible: { y: 0 },
                hidden: { y: "-100%" },
            }}
                animate={hidden ? "hidden" : "visible"}
                transition={{ ease: "easeInOut", duration: .5 }}
            >
                <div className="w-full flex items-center justify-center">
                    <div className="justify-between w-full flex px-8">
                        <div className="border-primary cursor-pointer grid place-items-center md:pl-0 ">

                            <Link href="/" className="flex items-center justify-center transition-all cursor-pointer">
                                {/* <Image src="/" width={175} height={45} alt="" className="w-40 md:w-48" /> */}
                                Project Tao
                            </Link>
                        </div>
                        <div className="hidden md:flex justify-center items-center md:gap-3 sm:gap-2 gap-1">

                            <Link href="/characters" className="py-2 md:py-4 px-4 lg:px-6 transition-all cursor-pointer group">
                                <h3 className="group-hover:text-primary relative font-normal transition-all">Characters</h3>
                            </Link>
                            <Link href="/users" className="py-2 md:py-4 px-4 lg:px-6 transition-all cursor-pointer group">
                                <h3 className="group-hover:text-primary relative font-normal transition-all">Users</h3>
                            </Link>
                            <Link href="/teambuilder" className="py-2 md:py-4 px-4 lg:px-6 transition-all cursor-pointer group">
                                <h3 className="group-hover:text-primary relative font-normal transition-all">Team Builder</h3>
                            </Link>



                        </div>
                        <div className="flex md:hidden flex-col">
                            {/* {ham && <IoClose onClick={() => { showHam(!ham) }} className="p-1 text-white text-4xl cursor-pointer transition-all" />} */}
                            {/* {!ham && <GiHamburgerMenu onClick={() => { showHam(!ham) }} className="p-1 text-white text-4xl cursor-pointer transition-all" />} */}
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