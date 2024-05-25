import { NextResponse } from "next/server";
import OpenAI from "openai";
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});
import prompt from "../prompt";

export const runtime = "edge"

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
        const message = await openai.chat.completions.create({
            messages: [
                { role: 'system', content: prompt },
                { role: 'user', content: teams }
            ],
            model: 'gpt-3.5-turbo',
        });
        return NextResponse.json({ message: message.choices[0].message.content }, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            text: "Unable to process the prompt. Please try again."
        });
    }
}