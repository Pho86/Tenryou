import Image from "next/image";
import Link from "next/link";
export default function Footer() {
    return (
        <footer className="w-full my-2 mt-16">
            <div className="px-8 md:px-16 my-8">
                <div className="lg:flex lg:items-end lg:justify-between">
                    <div className="flex flex-col text-center lg:text-left">
                        <div className="flex justify-center lg:justify-start">
                            <div className="font-bold text-2xl hover:drop-shadow-primary-sm hover:-translate-x-[2px] hover:-translate-y-[2px] transition-all py-1">
                                <Link href="/" className="flex gap-2 items-center">
                                    <Image src="/next.svg" alt="logo of Tao" width={35} height={35} />
                                    <h1 className="whitespace-nowrap">Tao</h1>
                                </Link>
                            </div>
                        </div>
                        <p className="mt-6 text-pretty">Tao.</p>
                    </div>
                    <ul className="md:mt-12 flex flex-wrap justify-center gap-6 md:gap-8 lg:justify-end lg:gap-12">
                        <Link href="/" className="font-bold text-lg p-2 hover:drop-shadow-primary-sm hover:-translate-x-[1px] hover:-translate-y-[1px] transition-all hidden md:flex">
                            <h2>Home</h2>
                        </Link>
                        <Link href="/" className="font-bold text-lg p-2 hover:drop-shadow-primary-sm hover:-translate-x-[1px] hover:-translate-y-[1px] transition-all hidden md:flex">
                            <h2>Builds</h2>
                        </Link>
                        <Link href="/" className="font-bold text-lg p-2 hover:drop-shadow-primary-sm hover:-translate-x-[1px] hover:-translate-y-[1px] transition-all hidden md:flex">
                            <h2>Artifacts</h2>
                        </Link>
                    </ul>
                </div>

                <p className="mt-8 text-center text-sm text-gray-200 lg:text-right">
                    Copyright &copy; 2024
                </p>
            </div>
        </footer>

    )
}