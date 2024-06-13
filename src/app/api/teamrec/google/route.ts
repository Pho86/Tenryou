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
        let currentInfo = "";

        if (body.part > 1) {
            currentInfo = body.currentInfo.join(' ');
        }
        let availableCharacters = ""
        body.ownedCharacters.forEach((character:any, index:number) => {
            if (character.name) {
                const characterInfo = `${character.name}, (${character.weaponText}), (${character.elementText}) (${character.fileName}) | `;
                availableCharacters += characterInfo;
            }
        });
    
        const systemPrompt = `${prompt}, YOU ARE ON [PART ${body.part}]  ${body.part > 1 ? `Past Info Provided: ${currentInfo}` : ""} PRINT ONLY [PART ${body.part}]`;
        console.log(`YOU ARE ON [PART ${body.part}], ${availableCharacters} `)
        if(body.part == 1) {
            const result = await streamText({
                model: google('models/gemini-1.5-flash-latest'),
                system: systemPrompt,
                prompt: availableCharacters
            });
            return result.toTextStreamResponse();
        } else {
            const result = await streamText({
                model: google('models/gemini-1.5-flash-latest'),
                system: systemPrompt,
                prompt: currentInfo
            });
            return result.toTextStreamResponse();
        }

    } catch (error) {
        console.error('Error processing the prompt:', error);
        return NextResponse.json({
            text: "Unable to process the prompt. Please try again."
        });
    }
}