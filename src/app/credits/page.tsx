"use client"
import Link from "next/link";
import { FaGithub } from "react-icons/fa6";
import ChangelogComponent from "../components/Changelog";
import Modal from "../components/Modal";
import { useState } from "react";

export default function CreditsPage() {
    const debug = () => {
        localStorage.clear();
        sessionStorage.clear();
    }
    const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
    return (
        <>
            <h1 className="text-3xl text-primary">Credits</h1>
            <p>Data: <Link href="https://github.com/theBowja/genshin-db" target="__blank" className="hover:text-primary underline underline-offset-4 font-semibold transition-all">Genshin-db</Link></p>
            <p>Images and Users API: <Link href="https://enka.network/" target="__blank" className="hover:text-primary underline underline-offset-4 font-semibold transition-all">Enka.Network</Link> via <Link className="hover:text-primary underline underline-offset-4 font-semibold transition-all" href="https://github.com/Jelosus2/enkanetwork.js">Enka.network.js</Link></p>
            <p>Events JSON: <Link href="https://ambr.top/en" target="__blank" className="hover:text-primary underline underline-offset-4 font-semibold transition-all">Ambr.Top</Link></p>
            <div className="flex items-center">
                <p>Want to Contribute? Or see an Issue?</p>
                <Link href="https://github.com/pho86/Tenryou" target="__blank" className="text-xl hover:text-primary transition-all p-1">
                    <FaGithub title="https://github.com/pho86/Tenryou" />
                </Link>
            </div>
            <ChangelogComponent />
            <h2 className="text-xl text-primary">Debug</h2>
            <button className="p-1 rounded-xl border-2 w-min text-nowrap transition-all hover:bg-bg-dark" onClick={() => {setShowConfirmation(true) }}>Clear Site Data</button>
            <Modal visible={showConfirmation} exit={() => setShowConfirmation(false)}>
                <div className="flex flex-col gap-4 items-center">
                    Are you sure you want to reset site data?
                    <div className="flex gap-2 items-center">
                        <button className="px-4 py-2 rounded-xl border-2 w-auto text-nowrap transition-all hover:bg-bg-dark" onClick={() => { debug(); setShowConfirmation(false) }}>Yes</button>
                        <button className="px-4 py-2 rounded-xl border-2 w-auto text-nowrap transition-all hover:bg-bg-dark" onClick={() => { setShowConfirmation(false) }}>No</button>
                    </div>
                </div>
            </Modal>
        </>
    );
}
