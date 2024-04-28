// @ts-nocheck
"use client"
import Image from "next/image";
import NavBar from "../../components/NavBar";
import axios from "axios";
import { useLayoutEffect, useState } from "react"
import SmoothScroll from "@/app/components/SmoothScroll";
import StickyScroll from "@/app/components/StickyScroll";
import Footer from "@/app/components/Footer";
import { Character } from "@/app/utils/types";
import { addFileName } from "@/app/utils/helper";
import { motion } from "framer-motion"
import Link from "next/link";
export default function CharacterPage({ params }: { params: any }) {

    const [data, setData] = useState<Character[]>();
    const [error, setError] = useState('');
    useLayoutEffect(() => {
        axios
            .get<Character[]>(`https://genshin-db-api.vercel.app/api/v5/materials?query=${params.id}`)
            .then((res) => {
                console.log(res.data);
                let data = res.data;
                addFileName([data]);
                // @ts-ignore
                setData(data);
            })
            .catch(err => {
                setError(err.message);
            });


    }, []);
    return (
        <>
            <NavBar />

            {data ? <main className="flex flex-col px-4 gap-4">



                <Footer />
            </main>

                :
                <>
                </>}
        </>
    );
}
