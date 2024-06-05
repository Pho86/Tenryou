import Profile from "@/app/components/Profile";
import Loader from "@/app/components/Loader";
import Link from "next/link";
import { addFileName } from "@/app/utils/helper";
import { Suspense } from "react";

export default async function UIDPage({ params }: { params: { uid: string } }) {
    const response = await fetch(`http://localhost:3000/api/user/${params.uid}`);
    if (!response.ok) {
        throw new Error("failed to fetch")
    }
    const res = await response.json()
    const playerData = res;
    playerData.characters.forEach((character: any) => {
        addFileName([character]);
    });
    document.title = `${playerData.player.username} - Tenryou 💮`;

    if (!playerData || !playerData.characters || playerData.characters.length === 0) {
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
            <Suspense fallback={<Loader />}>
                <Profile user={playerData} />
            </Suspense>
        </>
    );
}