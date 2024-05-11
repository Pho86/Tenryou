"use client"
import NavBar from "../components/NavBar";
import { useState } from "react"
import { useRouter } from "next/navigation";
import Footer from "../components/Footer";
import Link from "next/link";
export default function UserPage() {
    const router = useRouter();
    const [user, setUser] = useState<any>({
        uid: ''
    });
    const handleChange = (event: any) => {
        setUser({ ...user, [event.target.name]: event.target.value });
    };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    }

    return (
        <>
            <NavBar active={2} />
            <main className="px-4 md:px-8 mb-20 w-full flex flex-col h-full min-h-[100dvh] justify-center relative">
                <div className="flex flex-col gap-4">
                    <p className="text-center">Make sure the profile settings in the game have &quot;Show character details&quot; enabled, otherwise the API will not be able to see profile details.</p>
                    <p className="text-center">Example: 621895194</p>
                    <form className="flex justify-center items-center h-full w-full gap-2" onSubmit={handleSubmit} onChange={handleChange}>
                        <input type="number" name="uid" required onChange={() => { }} value={user.uid} placeholder="Enter UID..." className="p-2 rounded-xl" />
                        <Link href={`/users/${user.uid}`}>
                            <button className={`hover:bg-bg-dark p-2 rounded-xl transition-all border-2`} type="submit">Search</button>
                        </Link>
                    </form>
                </div>
                <Footer className="bottom-0 absolute" />
            </main>
        </>
    );
}


