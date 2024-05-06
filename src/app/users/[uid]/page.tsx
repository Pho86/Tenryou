"use client"

import { useState, useLayoutEffect } from "react";
import Profile from "@/app/components/Profile";
import axios from "axios";
import NavBar from "@/app/components/NavBar";
import Loader from "@/app/components/Loader";
import { addFileName } from "@/app/utils/helper";
import Footer from "@/app/components/Footer";
import Link from "next/link";
export default function UIDPage({ params }: { params: { uid: string } }) {
    const [playerData, setPlayerData] = useState<any>();
    const [error, setError] = useState<boolean>(false);
    useLayoutEffect(() => {
        axios.get(`/api/player/${params.uid}`)
            .then(response => {
                response.data.characters.forEach((character: any) => {
                    addFileName([character]);
                })
                setPlayerData(response.data);
                console.log(response.data)
                document.title = (`${response.data.player.username} - Tenryou 💮`)
            })
            .catch(error => {
                setError(true)
            });
    }, [params.uid]);

    if (!playerData || !playerData.characters || playerData.characters.length === 0) {
        return (
            <>
                <NavBar active={2} />
                <main className="flex h-screen flex-col gap-10 items-center justify-center relative">
                    <h1 className="text-9xl">404</h1>
                    <p className="text-2xl">Oops... Something went wrong, maybe you inputted the wrong UID, or the account was not public.</p>
                    <Link href="/" className="">
                        <button className="border-text border-2 hover:bg-bg-dark transition-all px-4 p-2 rounded-xl">Back To Home</button>
                    </Link>
                    <div className="absolute bottom-0 w-full">
                        <Footer />
                    </div>
                </main>
            </>
        );
    }
    return (
        <>
            <NavBar active={2} />
            <main className="flex flex-col md:pt-16 px-8 justify-center items-center">
                <div className="w-full max-w-screen-2xl">

                    {playerData ? <Profile user={playerData} />
                        :
                        <Loader />
                    }
                </div>
                <Footer />
            </main>
        </>
    );
}
