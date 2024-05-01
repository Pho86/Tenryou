"use client"
import Image from "next/image";
import NavBar from "../components/NavBar";
import { addFileName } from "../utils/helper";
import axios from "axios";
import { useEffect, useLayoutEffect, useState } from "react"
import { useRouter } from "next/navigation";


export default function UserPage() {
    const router = useRouter();
    const [user, setUser] = useState<any>({
        uid:''
    });
    useLayoutEffect(() => {
    }, []);


    const handleChange = (event: any) => {
        setUser({ ...user, [event.target.name]: event.target.value });
    };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
           router.push(`/users/${user.uid}`)
        }
        catch (error) {
           console.log(error)
        }
     }

    return (
        <>
            <NavBar />
            <main className="pt-16 px-4 md:px-8 mb-20 w-full flex flex-col gap-4 min-h-[90dvh] justify-center">
                <form className="flex justify-center items-center h-full w-full gap-2" onSubmit={handleSubmit} onChange={handleChange}>
                    <input type="number" name="uid" required onChange={()=>{}} value={user.uid} placeholder="Enter UID..." className="p-2 rounded-xl" />
                    <button className="" type="submit">Search</button>
                </form>
            </main>
            {/* <Footer /> */}
        </>
    );
}


