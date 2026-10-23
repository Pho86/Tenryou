import { NextResponse, NextRequest } from "next/server"; 
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

export async function POST(req: NextRequest, ) {

  try {
    const body = await req.json();
    let team1 = "";
    let team2 = "";

    if (Array.isArray(body.activeCharacters)) {
      body.activeCharacters.forEach((character: any, index: number) => {
        if (character?.name) {
          const characterInfo = `${character.name}, (${character.weaponText}), (${character.elementText}) | `;
          if (index <= 3) {
            team1 += characterInfo;
          } else {
            team2 += characterInfo;
          }
        }
      });
    }

    const teams = body.team === 2 ? team2 : team1;

    if (!teams) {
      return NextResponse.json("No character data provided", { status: 400 });
    }

    const systemPrompt = `${prompt}\n\nTeam: ${teams}`;
    const result = await model.generateContentStream(systemPrompt);
    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of result.stream) {
            const text = chunk.text();
            if (text) controller.enqueue(encoder.encode(text));
          }
        } catch (error: any) {
          console.error("Error while streaming the prompt:", error);
          controller.enqueue(encoder.encode(`\n\nUnable to finish the response: ${error?.message || "Unknown error"}`));
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
  } catch (error: any) {
    console.error("Error processing the prompt:", error);
    return NextResponse.json(
      `Unable to process the prompt: ${error?.message || "Unknown error"}`,
      { status: 500 }
    );
  }
}
