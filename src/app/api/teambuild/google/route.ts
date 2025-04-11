import { NextResponse, NextRequest } from "next/server"; 
import prompt from "../prompt";
export const runtime = "edge";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY as string);
const generationConfig = {
  temperature: 0.7,
  topP: 0.8,
  topK: 40,
  maxOutputTokens: 4096, 
};

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", generationConfig });

export async function POST(req: NextRequest, ) {

  try {
    const body = await req.json();
    let team1 = "";
    let team2 = "";
    let currentInfo = "";

    if (body.part > 1) {
      currentInfo = body.currentInfo.join("");
    }
    
    body.activeCharacters.forEach((character: any, index: number) => {
      if (character.name) {
        const characterInfo = `${character.name}, (${character.weaponText}), (${character.elementText}) | `;
        if (index <= 3) {
          team1 += characterInfo;
        } else {
          team2 += characterInfo;
        }
      }
    });

    let teams = body.team === 1 ? team1 : team2;

    const systemPrompt = `${prompt}, YOU ARE ON [PART ${body.part}], the team is ${teams} ${
      body.part > 1 ? `Past Info Provided: ${currentInfo}` : ""
    }`;

    const result = await model.generateContent(systemPrompt);
    return NextResponse.json(result.response.text(), { status: 200 });
  } catch (error) {
    console.error("Error processing the prompt:", error);
    return NextResponse.json({
      text: "Unable to process the prompt. Please try again.",
    });
  }
}
