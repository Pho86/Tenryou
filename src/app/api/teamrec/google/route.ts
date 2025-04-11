import { NextResponse } from "next/server";
import prompt from "../prompt";

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY as string);
const generationConfig = {
  temperature: 0.7,
  topP: 0.8,
  topK: 40,
  maxOutputTokens: 4096, 
};

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", generationConfig });

export const runtime = "edge";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        let currentInfo = "";

        if (body.part > 1 && Array.isArray(body.currentInfo)) {
            currentInfo = body.currentInfo.join(' ');
        }

        let availableCharacters = "";
        if (Array.isArray(body.ownedCharacters)) {
            body.ownedCharacters.forEach((character: any) => {
                if (character && character.name) {
                    const characterInfo = `${character.name}, (${character.weaponText || 'Unknown'}), (${character.elementText || 'Unknown'}) (${character.fileName || 'Unknown'}) | `;
                    availableCharacters += characterInfo;
                }
            });
        }
        
        if (!availableCharacters && body.part === 1) {
            return NextResponse.json({
                error: "No character data provided"
            }, { status: 400 });
        }
        
        const promptText = body.part === 1 ? availableCharacters : currentInfo;
        const systemPrompt = `${prompt}, YOU ARE ON [PART ${body.part || 1}] ${
            body.part > 1 ? `Past Info Provided: ${currentInfo}` : ""
        } PRINT ONLY [PART ${body.part || 1}], ${promptText}`;

        console.log(`Sending request to Gemini for part ${body.part || 1}`);
        
        const result = await model.generateContent(systemPrompt);
        const responseText = result.response.text();
        
        return NextResponse.json(responseText, { status: 200 });

    } catch (error: any) {
        console.error('Error processing the prompt:', error);
        return NextResponse.json({
            error: error.message || "Unknown error occurred",
            details: error.toString()
        }, { status: 500 });
    }
}
