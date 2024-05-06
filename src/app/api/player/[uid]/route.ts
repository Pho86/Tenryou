import { NextApiRequest } from 'next';
// import { Wrapper } from 'enkanetwork.js';
import { NextResponse } from 'next/server';
import { EnkaNetwork } from 'enkanetwork';

export async function GET(req: any, { params }: { params: { uid: number } }) {
    const enka = new EnkaNetwork();
   
    const uid = params.uid;
    // const { genshin } = new Wrapper({
    //     cache: true
    // });
    try {
        // const playerData = await genshin.getPlayer(uid as string);
        const playerData = await enka.fetchUser(uid as number);
        console.log(playerData)
        return NextResponse.json(playerData, { status: 200 });
    } catch (error) {
        console.error("Error fetching player data:", error);
        return NextResponse.json({ message: "Failed to fetch player data" }, { status: 500 });
    }
}