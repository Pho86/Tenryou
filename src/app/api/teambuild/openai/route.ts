import { NextResponse } from "next/server";
import OpenAI from "openai";
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});
import prompt from "../prompt";

export const runtime = "edge"

export async function POST(req: Request, res: NextResponse) {
    try {
        const body = await req.json();
        let team1 = "";
        let team2 = "";
        let currentInfo = "";

        if (body.part > 1) {
            currentInfo = body.currentInfo.join('');
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
        let teams = ""
        if (body.team == 1) teams = team1;
        else teams = team2;

        const systemPrompt = `${prompt}, YOU ARE ON [PART ${body.part}]  ${body.part > 1 && `Past Info Provided: ${currentInfo}`}`;
        const message = await openai.chat.completions.create({
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: teams }
            ],
            model: 'gpt-3.5-turbo',
        });
        return NextResponse.json({ message: message.choices[0].message.content }, { status: 200 })
    } catch (error) {
        console.error('Error processing the prompt:', error);
        return NextResponse.json({
            text: "Unable to process the prompt. Please try again."
        });
    }
}