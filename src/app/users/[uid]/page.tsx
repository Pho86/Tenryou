"use client"

import { useState, useLayoutEffect } from "react";
import Profile from "@/app/components/Profile";
import axios from "axios";
import NavBar from "@/app/components/NavBar";
import Loader from "@/app/components/Loader";
import { addFileName } from "@/app/utils/helper";
import Footer from "@/app/components/Footer";
export default function UIDPage({ params }: { params: { uid: string } }) {
    const [playerData, setPlayerData] = useState<any>();

    useLayoutEffect(() => {
        axios.get(`/api/player/${params.uid}`)
            .then(response => {
                response.data.characters.forEach((character: any) => {
                    addFileName([character]);
                })
                setPlayerData(response.data);
                document.title = (`${response.data.player.username} - Tenryou 💮`)
            })
            .catch(error => {
                console.error("Error fetching player data:", error);
            });
    }, [params.uid]);

    return (
        <>
            <NavBar active={2}/>
            <main className="flex flex-col md:pt-16 px-8 justify-center items-center">
                <div className="w-full max-w-screen-2xl">

                {playerData ? <Profile user={playerData} />
                    :
                    <Loader />
                }
                </div>
                <Footer/>
            </main>
        </>
    );
}
