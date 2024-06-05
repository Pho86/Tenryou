import Image from "next/image";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
export default function Footer({
    className
}: {
    className?: string

}) {
    return (
        <footer className={`w-full max-w-screen-2xl flex items-center justify-center ${className}`}>
            <div className="mb-32 md:mb-8 flex flex-col w-full">
                <div className="flex flex-col md:flex-row gap-2 items-end justify-between">
                    <div className="flex flex-col md:flex-row text-left">
                        <div className="flex justify-center">
                            <div className="font-bold text-2xl transition-all py-1">
                                <Link href="/" className="flex gap-1 text-2xl items-center hover:text-primary transition-all">
                                    <Image src="/icon.svg" alt="logo of Tenryou" width={45} height={45} className="drop-shadow-icon" />
                                    <span className="whitespace-nowrap">Tenryou</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <ul className="md:mt-12 flex flex-wrap justify-center gap-6 md:gap-8 lg:justify-end lg:gap-12 font-semibold">
                        <li><Link href="/characters" className="hover:text-primary transition-all">
                            <span>Characters</span>
                        </Link></li>
                        <li><Link href="/users" className="hover:text-primary transition-all">
                            <span>Users</span>
                        </Link></li>
                        <li><Link href="/teambuilder" className="hover:text-primary transition-all">
                            <span>Team Builder</span>
                        </Link></li>
                        <li><Link href="/database" className="hover:text-primary transition-all">
                            <span>Database</span>
                        </Link></li>
                    </ul>
                </div>
                <div className="w-full flex gap-2 md:flex-row flex-col md:justify-between mt-4">
                    <div className="flex justify-end md:items-center">
                        <p>Your Genshin Impact Companion Site | <Link href={"/credits"} className="hover:text-primary transition-all">V0.9</Link> | </p>
                        <Link href="https://github.com/pho86/Tenryou" target="__blank" className="text-xl hover:text-primary transition-all p-1">
                            <FaGithub title="Github" />
                        </Link>
                        {/* <Link href={"https://enka.network"} target="__blank">
                        <Image src={`/icons/enka.png`} width={200} height={150} alt="Enka.network " className="" />
                    </Link> */}
                    </div>
                    <div className="flex flex-col gap-2 justify-center">
                        <p className="text-right items-start text-sm text-gray-200">
                            This website is not affiliated with miHoYo, and all assets are property of original owners.
                        </p>

                    </div>
                </div>
            </div>
        </footer>

    )
}