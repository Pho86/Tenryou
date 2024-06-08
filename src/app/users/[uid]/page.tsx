import Profile from "@/app/components/Profile";
import Loader from "@/app/components/Loader";
import Link from "next/link";
import { addFileName } from "@/app/utils/helper";
import { Suspense } from "react";

export default async function UIDPage({ params }: { params: { uid: string } }) {
    try {
        const response = await fetch(`https://tenryou.live/api/user/${params.uid}`, {
            cache: 'no-cache'
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const playerData = await response.json();
        playerData.characters.forEach((character: any) => {
            addFileName([character]);
        });

        if (!playerData || !playerData.characters || playerData.characters.length === 0) {
            throw new Error('No characters found');
        }

        return (
            <Suspense fallback={<Loader />}>
                <Profile user={playerData} />
            </Suspense>
        );

    } catch (error) {
        console.error(error)
        return (
            <div className="h-[80dvh] flex flex-col gap-4 items-center justify-center">
                <h1 className="text-9xl">404</h1>
                <p className="text-2xl">Oops... Something went wrong. Maybe the user uid was wrong, or the servers/api is down.</p>
                <Link href="/" className="">
                    <button className="border-text border-2 hover:bg-bg-dark transition-all px-4 p-2 rounded-xl">Back To Home</button>
                </Link>
            </div>
        );
    }
}
