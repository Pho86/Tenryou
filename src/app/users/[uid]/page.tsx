"use client"

import { useState, useEffect } from "react";
import Profile from "@/app/components/Profile";
import axios from "axios";
import NavBar from "@/app/components/NavBar";
import Loader from "@/app/components/Loader";
import { addFileName } from "@/app/utils/helper";
export default function UIDPage({ params }: { params: { uid: string } }) {
    const [playerData, setPlayerData] = useState<any>();

    useEffect(() => {
        axios.get(`/api/player/${params.uid}`)
            .then(response => {
                console.log(response.data)
                response.data.characters.forEach((character: any) => {
                    addFileName([character]);
                })
                setPlayerData(response.data);
            })
            .catch(error => {
                console.error("Error fetching player data:", error);
            });
    }, [params.uid]);

    return (
        <>
            <NavBar />
            <main className="flex flex-col md:pt-16 px-8">
                {playerData ? <Profile user={playerData} />
                    :
                    <Loader />
                }
            </main>
        </>
    );
}
