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
            <motion.nav className="w-full fixed flex justify-between z-[1000] font-bold px-5 py-2 md:py-0 bg-bg-darker" variants={{
                visible: { y: 0 },
                hidden: { y: "-100%" },
            }}
                animate={hidden ? "hidden" : "visible"}
                transition={{ ease: "easeInOut", duration: .5 }}
            >
                <div className="w-full flex items-center justify-center">
                    <div className="justify-between w-full flex px-8">
                        <div className="border-primary cursor-pointer grid place-items-center md:pl-0 ">

                            <Link href="/" className="flex items-center justify-center transition-all cursor-pointer ">
                                {/* <Image src="/" width={175} height={45} alt="" className="w-40 md:w-48" /> */}
                                Project Tao
                            </Link>
                        </div>
                        <div className="hidden md:flex justify-center items-center md:gap-3 sm:gap-2 gap-1">

                            <Link href="/characters" className="py-2 md:py-4 px-4 lg:px-6 transition-all cursor-pointer group">
                                <h3 className="group-hover:before:scale-x-100 group-hover:before:origin-left group-hover:text-primary relative font-normal transition-all">Characters</h3>
                            </Link>
                            <Link href="/artifacts" className="py-2 md:py-4 px-4 lg:px-6 transition-all cursor-pointer group">
                                <h3 className="group-hover:before:scale-x-100 group-hover:before:origin-left group-hover:text-primary relative font-normal transition-all">Artifacts</h3>
                            </Link>
                            <Link href="/weapons" className="py-2 md:py-4 px-4 lg:px-6 transition-all cursor-pointer group">
                                <h3 className="group-hover:before:scale-x-100 group-hover:before:origin-left group-hover:text-primary relative font-normal transition-all">Weapons</h3>
                            </Link>
                            <Link href="/teambuilder" className="py-2 md:py-4 px-4 lg:px-6 transition-all cursor-pointer group">
                                <h3 className="group-hover:before:scale-x-100 group-hover:before:origin-left group-hover:text-primary relative font-normal transition-all">Weapons</h3>
                            </Link>



                        </div>
                        <div className="flex md:hidden flex-col">
                            {/* {ham && <IoClose onClick={() => { showHam(!ham) }} className="p-1 text-white text-4xl cursor-pointer transition-all" />} */}
                            {/* {!ham && <GiHamburgerMenu onClick={() => { showHam(!ham) }} className="p-1 text-white text-4xl cursor-pointer transition-all" />} */}
                        </div>
                    </div>
                </div>
            </motion.nav>
            <AnimatePresence>
                {ham && <motion.nav className="p-8 fixed bg-bg w-full flex flex-col text-heebo top-8 text-xl gap-2 z-[1000] border-primary md:hidden"
                    initial={{ opacity: 0, y: "-110%" }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: "-100%" }} transition={{ ease: "easeInOut" }}>
                    <li className="flex flex-col gap-5 w-full">
                        <ul className="border-b py-2 w-full transition-all cursor-pointer hover:text-primary hover:border-primary">

                            <Link href="/" className="border-b py-2 w-full transition-all cursor-pointer hover:text-primary hover:border-primary">
                                <h2>Characters</h2>
                            </Link>

                        </ul>
                        


                        <p className="pt-40 text-accent text-md">© </p>
                    </li>
                </motion.nav>}
            </AnimatePresence>
            <AnimatePresence>
                <motion.div className={`w-full fixed z-10 h-full bg-zinc-950 bg-opacity-30 ${ham ? "fixed" : "hidden"}`} onClick={() => { showHam(!ham) }}>

                </motion.div>
            </AnimatePresence>
        </>
    )
}