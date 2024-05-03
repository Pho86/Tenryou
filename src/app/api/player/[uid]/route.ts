import { NextApiRequest } from 'next';
import { Wrapper } from 'enkanetwork.js';
import { NextResponse } from 'next/server';

export async function GET(req: NextApiRequest, { params }: { params: { uid: string } }) {
    const uid = params.uid;
    const { genshin } = new Wrapper({
        cache: true
    });
    try {
        const playerData = await genshin.getPlayer(uid as string);
        return NextResponse.json(playerData, { status: 200 });
    } catch (error) {
        console.error("Error fetching player data:", error);
        return NextResponse.json({ message: "Failed to fetch player data" }, { status: 500 });
    }
}