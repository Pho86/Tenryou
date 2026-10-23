import { NextResponse } from "next/server";
import prompt from "../prompt";

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY as string);
const generationConfig = {
  temperature: 0.7,
  topP: 0.8,
  topK: 40,
  maxOutputTokens: 12000,
};

const model = genAI.getGenerativeModel({ model: "gemini-3.5-flash-lite", generationConfig });

export async function POST(req: Request) {
    try {
        const body = await req.json();

        let availableCharacters = "";
        if (Array.isArray(body.ownedCharacters)) {
            body.ownedCharacters.forEach((character: { name: string; weaponText?: string; elementText?: string; fileName?: string }) => {
                if (character && character.name) {
                    const characterInfo = `${character.name}, (${character.weaponText || 'Unknown'}), (${character.elementText || 'Unknown'}) (${character.fileName || 'Unknown'}) | `;
                    availableCharacters += characterInfo;
                }
            });
        }

        if (!availableCharacters) {
            return NextResponse.json("No character data provided", { status: 400 });
        }

        const systemPrompt = `${prompt}\n\nAvailable characters: ${availableCharacters}`;
        const result = await model.generateContentStream(systemPrompt);
        const encoder = new TextEncoder();

        const stream = new ReadableStream({
            async start(controller) {
                try {
                    for await (const chunk of result.stream) {
                        const text = chunk.text();
                        if (text) controller.enqueue(encoder.encode(text));
                    }
                } catch (error: unknown) {
                    console.error('Error while streaming the prompt:', error);
                    const message = error instanceof Error ? error.message : "Unknown error";
                    controller.enqueue(encoder.encode(`\n\nUnable to finish the response: ${message}`));
                } finally {
                    controller.close();
                }
            },
        });

        return new Response(stream, {
            headers: {
                "Content-Type": "text/plain; charset=utf-8",
                "Cache-Control": "no-cache, no-transform",
                "X-Accel-Buffering": "no",
            },
        });
    } catch (error: unknown) {
        console.error('Error processing the prompt:', error);
        const message = error instanceof Error ? error.message : "Unknown error occurred";
        return NextResponse.json(
            `Unable to process the prompt: ${message}`,
            { status: 500 }
        );
    }
}
