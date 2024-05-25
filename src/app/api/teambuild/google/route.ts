export const maxDuration = 60;
import { NextResponse } from "next/server";
import { streamText } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import prompt from "../prompt";

export const runtime = "edge"

const google = createGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_API_KEY as string || ''
});
export async function POST(req: Request, res: NextResponse) {

    const body = await req.json();
    let team1 = ""
    let team2 = ""
    for (let i = 0; i < 8; i++) {
        if (body.activeCharacters[i].name) {
            if (i <= 3) team1 += `${body.activeCharacters[i].name}, (${body.activeCharacters[i].weaponText}), (${body.activeCharacters[i].elementText}) | `
            else team2 += `${body.activeCharacters[i].name}, (${body.activeCharacters[i].weaponText}), (${body.activeCharacters[i].elementText}) | `
        }
    }
    let teams = ""
    if (team2.length > 1) {
        teams += `${team1} +++ ${team2}`
    } else {
        teams = team1;
    }
    try {
        const result = await streamText({
            model: google('models/gemini-1.5-flash-latest'),
            system: prompt,
            prompt: teams
        });
        return result.toTextStreamResponse();
    } catch (error) {
        return NextResponse.json({
            text: "Unable to process the prompt. Please try again."
        });
    }
}