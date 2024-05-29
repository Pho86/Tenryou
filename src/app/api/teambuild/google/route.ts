import { NextResponse } from "next/server";
import { streamText } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import prompt from "../prompt";

export const runtime = "edge"

const google = createGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_API_KEY as string || '',
    
});
export async function POST(req: Request, res: NextResponse) {
    try {
        const body = await req.json();
        let team1 = "";
        let team2 = "";
        let currentInfo = "";

        if (body.part > 1) {
            currentInfo = body.currentInfo.join('');
        }

        body.activeCharacters.forEach((character:any, index:number) => {
            if (character.name) {
                const characterInfo = `${character.name}, (${character.weaponText}), (${character.elementText}) | `;
                if (index <= 3) {
                    team1 += characterInfo;
                } else {
                    team2 += characterInfo;
                }
            }
        });

        const teams = team2 ? `${team1} +++ ${team2}` : team1;

        const systemPrompt = `Print only [PART ${body.part}] ${prompt} ${body.part > 1 && `Past Info Provided: ${currentInfo}`}`;
        
        console.log(`Print only [PART ${body.part}] ${prompt} ${body.part > 1 && `Past Info Provided: ${currentInfo}`}`);

        const result = await streamText({
            model: google('models/gemini-1.5-flash-latest'),
            system: systemPrompt,
            prompt: teams
        });

        return result.toTextStreamResponse();
    } catch (error) {
        console.error('Error processing the prompt:', error);
        return NextResponse.json({
            text: "Unable to process the prompt. Please try again."
        });
    }
}