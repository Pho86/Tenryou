import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';
import { EnkaNetwork } from 'enkanetwork';

export async function GET(req: any, { params }: { params: { uid: number } }) {
    const enka = new EnkaNetwork();
   
    const uid = params.uid;
    try {
        const playerData = await enka.fetchUser(uid as number);
        console.log(playerData)
        return NextResponse.json(playerData, { status: 200 });
    } catch (error) {
        console.error("Error fetching player data:", error);
        return NextResponse.json({ message: "Failed to fetch player data" }, { status: 500 });
    }
}