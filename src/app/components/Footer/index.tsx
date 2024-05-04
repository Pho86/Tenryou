import Image from "next/image";
import Link from "next/link";
export default function Footer() {
    return (
        <footer className="w-full mt-16">
            <div className="px-8 md:px-16 mb-32 md:my-16 flex flex-col gap-2">
                <div className="flex flex-col md:flex-row gap-2 items-end md:items-start justify-between">
                    <div className="flex flex-col md:flex-row text-left">
                        <div className="flex justify-center">
                            <div className="font-bold text-2xl transition-all py-1">
                                <Link href="/" className="flex gap-2 items-center hover:text-primary transition-all">
                                    <Image src="/logo.svg" alt="logo of Tenryou" width={35} height={35} />
                                    <h1 className="whitespace-nowrap">Tenryou</h1>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <ul className="md:mt-12 flex flex-wrap justify-center gap-6 md:gap-8 lg:justify-end lg:gap-12 font-semibold">
                        <Link href="/characters" className="hover:text-primary transition-all">
                            <h2>Characters</h2>
                        </Link>
                        <Link href="/users" className="hover:text-primary transition-all">
                            <h2>Users</h2>
                        </Link>
                        <Link href="/teambuilder" className="hover:text-primary transition-all">
                            <h2>Team Builder</h2>
                        </Link>
                    </ul>
                </div>
                <div className="w-full flex justify-between">
                    <div className="flex gap-2">
                        {/* <Link href={"https://enka.network"} target="__blank">
                        <Image src={`/icons/enka.png`} width={200} height={150} alt="Enka.network " className="" />
                    </Link> */}
                    </div>
                    <div className="flex gap-2 -mt-2">
                        <Link href="https://github.com/pho86/Tenryou.live" target="__blank" className="flex justify-end items-end">
                            <Image src="/icons/github.svg" width={25} height={25} alt="Enka.network " className="" />
                        </Link>
                        <p className="mt-8 text-center text-sm text-gray-200">
                            This website is not affiliated with miHoYo.
                        </p>
                    </div>
                </div>
            </div>
        </footer>

    )
}