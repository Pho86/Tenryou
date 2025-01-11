import { NextResponse } from "next/server";
import prompt from "../prompt";

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY as string);
const generationConfig = {
};

const model = genAI.getGenerativeModel({ model: "gemini-pro", generationConfig });


export const runtime = "edge";


export async function POST(req: Request, res: NextResponse) {
    try {
        const body = await req.json();
        let currentInfo = "";

        if (body.part > 1) {
            currentInfo = body.currentInfo.join(' ');
        }

        let availableCharacters = "";
        body.ownedCharacters.forEach((character: any) => {
            if (character.name) {
                const characterInfo = `${character.name}, (${character.weaponText}), (${character.elementText}) (${character.fileName}) | `;
                availableCharacters += characterInfo;
            }
        });
        
        const promptText = body.part === 1 ? availableCharacters : currentInfo;
        const systemPrompt = `${prompt}, YOU ARE ON [PART ${body.part}] ${body.part > 1 ? `Past Info Provided: ${currentInfo}` : ""} PRINT ONLY [PART ${body.part}], ${promptText}`;


        const result = await model.generateContent(systemPrompt);
        return NextResponse.json(result.response.text(), { status: 200 });

    } catch (error) {
        console.error('Error processing the prompt:', error);
        return NextResponse.json({
            text: "Unable to process the prompt. Please ensure all required data is provided and try again."
        });
    }
}
