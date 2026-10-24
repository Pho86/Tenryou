import { NextResponse } from 'next/server';
import { getPlayer } from '@/app/utils/enka';

export const revalidate = 300;

export async function GET(_req: Request, { params }: { params: Promise<{ uid: string }> }) {
    const { uid } = await params;

    try {
        const playerData = await getPlayer(uid);
        return NextResponse.json(playerData, { status: 200 });
    } catch (error) {
        console.error("Error fetching player data:", error);
        return NextResponse.json({ message: "Failed to fetch player data" }, { status: 500 });
    }
}
