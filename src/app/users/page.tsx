"use client"
import { useState } from "react"
import Link from "next/link";
export default function UserPage() {
    const [user, setUser] = useState({
        uid: '' as string
    });
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, [event.target.name]: event.target.value });
    };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    }

    return (
        <>
            <div className="flex flex-col gap-4 justify-center items-center mt-64">
                <p className="text-center">Make sure the profile settings in the game have &quot;Show character details&quot; enabled, otherwise the API will not be able to see profile details.</p>
                <p className="text-center">Example: 600020272</p>
                <form className="flex justify-center items-center h-full w-full gap-2" onSubmit={handleSubmit} >
                    <input type="number" name="uid" required value={user.uid} placeholder="Enter UID..." className="p-2 rounded-xl" onChange={handleChange} />
                    <Link href={`/users/${user.uid}`}>
                        <button className={`hover:bg-bg-dark p-2 rounded-xl transition-all border-2`} type="submit">Search</button>
                    </Link>
                </form>
            </div>
        </>
    );
}


