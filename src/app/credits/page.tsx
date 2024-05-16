"use client"
import Link from "next/link";
import { FaGithub } from "react-icons/fa6";
import ChangelogComponent from "../components/Changelog";

export default function CreditsPage() {
    return (
        <>
            <h1 className="text-3xl text-primary">Credits</h1>
            <p>Data: <Link href="https://github.com/theBowja/genshin-db" target="__blank" className="hover:text-primary underline underline-offset-4 font-semibold transition-all">Genshin-db</Link></p>
            <p>Images and Users API: <Link href="https://enka.network/" target="__blank" className="hover:text-primary underline underline-offset-4 font-semibold transition-all">Enka.Network</Link></p>
            <p>Events JSON: <Link href="https://ambr.top/en" target="__blank" className="hover:text-primary underline underline-offset-4 font-semibold transition-all">Ambr.Top</Link></p>
            <div className="flex items-center">
                <p>Want to Contribute? Or see an Issue?</p>
                <Link href="https://github.com/pho86/Tenryou" target="__blank" className="text-xl hover:text-primary transition-all p-1">
                    <FaGithub title="https://github.com/pho86/Tenryou" />
                </Link>
            </div>
            <ChangelogComponent />
        </>
    );
}
