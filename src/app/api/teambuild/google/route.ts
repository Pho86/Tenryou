export const maxDuration = 60;
import { NextResponse } from "next/server";
import { streamText } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
const prompt = `I want you to create a team with these characters, generally 4 characters from Genshin Impact. Each character is separated in a string listed by "CHARACTER_NAME, (WEAPON_TYPE), (ELEMENT_TYPE) | ". Every character that will is added to the list, is a character that is fully released and is not from any beta, no speculations are here. I generally want you have a standard team comp, consisting of a Main DPS, 2 supports/or sub DPS, and a healer. Create a guide of each character of the most used artifacts and weapons from the community and list out the recommended substats for these. At the end, state the most common rotations of how you should play the team and provide some tips of how to play the team. If there is multiple characters whose main roles is a healer, example if kokomi and barbara is on the same team, decide which character deals more damage, in this example, because Barbara has no skills that deal any damage, so she would therefore be the healer, meanwhile kokomi is able to deal damage, so she would become a sub DPS. However, if there is only 1 healer on the team, their role can be defined as just the healer, so if the team consisted of a main dps, sub dps, support, and this character was a healer, they are classified as the healer. and is characterized as the 4th slot. However, if there is no character that can be a healer present in the current team that is perfectly fine, create a team with 3 supports instead. If there is a team of less then 4 characters, that team is valid, but then the team comp would be different from your standard team, just ensure one character is the main DPS. The Format I want is in Markdown and disclaimers are provided, make sure you do not include the disclaimers when returning:

# Team Name, EX: Bloom and Burn, or if there is an existing team name such as Morgana (Venti, Mona, Ganyu, Diona) use that name instead. Just write the team name on this line only.
## Character Name 1, Character Name 2, Character Name 3, Character Name 4 (For this line just state their name only) 
a short description of what the team is and does, examples give some specific elemental reactions and what is your main damage.

### Character 1 (ROLE (EX.Main DPS)), try to reorder the characters depending on their role, so Main DPS should be 1, 2/3 should be supports/sub-dps, 4 should be healer. If you have to rearrange the characters, do so.
description of their builds and stats, artifacts, weapons, and recommended stats/substats. Some characters such as eula's main damage is from physical damage, the description should reflect that, however most characters do not benefit from physical damage and prefer their element's damage instead.
Example:
#### **Weapon:** Make sure to provide these with weapons, if there is no recommended stat dont add it
* **5 Star:**
* **4 Star:**
* **3 Star:**
#### **Artifacts:** 
**SET_NAME**: Provide the set description, and in a new line, provide why this set is good for them, and provide mainstats for each artifact piece that is recommended.

**Substats**: Provide some recommended sub stats for the character.

### Character 2 (ROLE (EX.Sub DPS))
...

### Character 3 (ROLE (EX.Support))
...

### Character 4 (ROLE (EX.Healer)) 
...

### Team Rotation
1. create a list of steps of who what an example team rotation to fight enemies. Ex. Start with ___ use them to apply ELEMENT and generate energy, swap to __ to ___ enemies... continue

#### Tips
* Give example tips of how to play the team and simple tips of each characters

#### Team Strengths

#### Potential Weaknesses

`;

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