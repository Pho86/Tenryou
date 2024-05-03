
import { NextApiRequest } from 'next';
import { AssetFinder } from 'enkanetwork.js';
import { NextResponse } from 'next/server';

export async function GET(req: NextApiRequest, { params }: { params: { id: number } }) {
    const id = params.id;
    const { genshin } = new AssetFinder();

    try {
        const charData = await genshin.character(id as number).assets;
        return NextResponse.json(charData, { status: 200 });
    } catch (error) {
        console.error("Error fetching player data:", error);
        return NextResponse.json({ message: "Failed to fetch player data" }, { status: 500 });
    }
}