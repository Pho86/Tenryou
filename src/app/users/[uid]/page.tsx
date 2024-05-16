"use client"

import { useState, useLayoutEffect } from "react";
import Profile from "@/app/components/Profile";
import axios from "axios";
import Loader from "@/app/components/Loader";
import { addFileName } from "@/app/utils/helper";
import Footer from "@/app/components/Footer";
import Link from "next/link";
import { User } from "@/app/types/user"

export default function UIDPage({ params }: { params: { uid: string } }) {
    const [playerData, setPlayerData] = useState<User>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);

    useLayoutEffect(() => {
        const storedData = sessionStorage.getItem(`userData_${params.uid}`);
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            setPlayerData(parsedData);
            setLoading(false);
            document.title = `${parsedData.player.username} - Tenryou 💮`;
        } else {
            axios.get(`/api/user/${params.uid}`)
                .then(response => {
                    response.data.characters.forEach((character: any) => {
                        addFileName([character]);
                    });
                    setPlayerData(response.data);
                    setLoading(false);
                    document.title = `${response.data.player.username} - Tenryou 💮`;
                    sessionStorage.setItem(`userData_${params.uid}`, JSON.stringify(response.data));
                })
                .catch(error => {
                    console.error(error);
                    setLoading(false);
                    setError(true);
                });
        }
    }, [params.uid]);

    if (loading) {
        return <>
            <main className="flex flex-col md:pt-16 px-8 justify-center items-center relative h-screen">
                <div className="w-full max-w-screen-2xl">
                    <Loader />
                </div>
            </main>
        </>;
    }

    if (error || !playerData || !playerData.characters || playerData.characters.length === 0) {
        return (
            <>
                <div className="h-[80dvh] flex flex-col gap-4 items-center justify-center">
                    <h1 className="text-9xl">404</h1>
                    <p className="text-2xl">Oops... Something went wrong.</p>
                    <Link href="/" className="">
                        <button className="border-text border-2 hover:bg-bg-dark transition-all px-4 p-2 rounded-xl">Back To Home</button>
                    </Link>
                </div>
            </>
        );
    }

    return (
        <>
            {playerData ? <Profile user={playerData} /> : <Loader />}
        </>
    );
}