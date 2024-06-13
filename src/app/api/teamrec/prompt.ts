export const prompt = `
This prompt will be split into 4 distinct parts. When you return a message, only return the part of the prompt you will be generating based on, and you will receive the current generated text. Do not return any indicator of what part you are on and only return the parts where the part is currently on. There are guidelines of where the part starts via [PART 1 START] and [PART 1 END], [PART 2 START] and [PART 2 END], etc, so ONLY return the parts where that information lies, ensure you STOP after your part ends, so only the information between [PART X] and [PART X END]. 

[PART 1 START]

Your task is to optimize the effectiveness of your team in combat by selecting characters based by their archetypes and what is the strongest characters as of right now with synergies. Each character is listed in the format "CHARACTER_NAME, (WEAPON_TYPE), (ELEMENT_TYPE) (CHARACTER_FILENAME) |". 

Main DPS (Slot 1): Place the primary damage dealer in slot 1 to maximize damage output. Choose characters known for their high damage potential and primary damage-dealing abilities.

Support/Sub DPS (Slots 2 and 3): Fill slots 2 and 3 with support or sub DPS characters. Support characters should focus on buffing the team or providing utility, while sub DPS characters contribute significant damage alongside the main DPS.

Healer/Shielder (Slot 4): Reserve slot 4 for a healer or shielder to sustain the team through battles. Prioritize characters with healing abilities or shield-creating skills.

Your Goal: Create a balanced team capable of handling various challenges in the game.

Your Response: Your response should be an array containing ONLY the filename of the selected characters. Ensure it is only the CHARACTER_FILENAME, which contain crucial information for character identification. Sometimes there will be another list provided of characters that is not available to be chosen and that character cannot be chosen again for this team. You can only choose one traveller. Only if it is traveller return as Traveller (Element) instead of filename.

If there is another list of characters provided that cannot be chosen, please indicate and select alternative characters accordingly. 

[PART 1 END]

[PART 2 START]

Create reasoning for a short exercept of why certain characters were chosen, and create a teamname. This part should only be the team name and a 1 short paragraph description of who the team is and what each character does.

[PART 2 END]

[PART 3 START]

For each character, provide a guide detailing the most commonly used artifacts, weapons, and recommended substats from the community. Ensure the information displayed corresponds to the information of their archetype is correct: "CHARACTER_NAME, (WEAPON_TYPE), (ELEMENT_TYPE) (CHARACTER_FILENAME) |". 

[PART 3 END]

[PART 4 START]

Conclude with the most common rotations for the team and tips for playing the team effectively.

[PART 4 END]

---------
The format should be in Markdown.
---------

[PART 1 START]
Character_filename 1, Character_filename 2, Character_filename 3, Character_filename 4 [FILENAME IS PRIORITY DO NOT SPELLCHECK, IF PLAYERBOY OR PLAYERGIRL (TRAVELLER) RETURN AS Traveller (ELEMENT) INSTEAD]
[PART 1 END]

[PART 2 START Create a Team Name] # Combine character names, use a standardized name, or employ a creative word and build off of that.

Provide a brief description of the team, its elemental reactions, and the primary damage output. [PART 2 END] 

### Character 1 Name (Main DPS) [PART 2, PART 2 ENDS AFTER HOW MANY CHARACTERS WERE PROVIDED, ex. 2 characters, end after Character 2, 4 characters, end after Character 4] [PART 3 START]
Provide a short description of builds, stats, artifacts, weapons, and recommended stats/substats.

#### **Weapons:** [All weapons provided here should be a part of the specified (WEAPON TYPE) for this character, ensure that they match the correct type.]
* **5 Star:** 
* **4 Star:**
* **3 Star:**

#### **Artifacts:**
**SET_NAME**: [Set description. Explain why this set is good for the character and provide recommended mainstats for each artifact piece.]

**Substats:** [Recommended substats in a single line, normal weight]

### Character 2 Name (Sub DPS/Support)
Provide a short description of builds, stats, artifacts, weapons, and recommended stats/substats.

#### **Weapons:** [All provided weapons here should be a part of the specified (WEAPON TYPE) for this character]
* **5 Star:**
* **4 Star:**
* **3 Star:**

#### **Artifacts:**
**SET_NAME**: [Set description. Explain why this set is good for the character and provide recommended mainstats/substats for each artifact piece.]

**Substats:** [Recommended substats in a single line, normal weight]

### Character 3 Name (Sub DPS/Support)
Provide a short description of builds, stats, artifacts, weapons, and recommended stats/substats. Recommended substats should be in a single line.

#### **Weapons:** [All provided weapons here should be a part of the specified (WEAPON TYPE) for this character]
* **5 Star:**
* **4 Star:**
* **3 Star:**

#### **Artifacts:**
**SET_NAME**: [Set description. Explain why this set is good for the character and provide recommended mainstats for each artifact piece.]

**Substats:** [Recommended substats in a single line, normal weight]

### Character 4 Name (Healer)
Provide a short description of builds, stats, artifacts, weapons, and recommended stats/substats.

#### **Weapons:** [All provided weapons here should be a part of the specified (WEAPON TYPE) for this character]
* **5 Star:**
* **4 Star:**
* **3 Star:**

#### **Artifacts:**
**SET_NAME**: [Set description. Explain why this set is good for the character and provide recommended mainstats for each artifact piece.]

**Substats:** [Recommended substats in a single line, normal weight] 

[PART 3 END]

[PART 4 START]

### Team Rotation: 
1. [Step-by-step guide for the team rotation, including which character to start with, how to apply elemental effects, and when to switch characters.]

#### Tips:
* [Example tips for playing the team and each character.]

#### Team Strengths:
* [List the strengths of the team.]

#### Potential Weaknesses:
* [List the potential weaknesses of the team.] 

[PART 4 END]

[Additional Notes:
Try to ensure the characters are in the correct slots, with 1 = DPS 2/3 = Sub DPS or support, 4 = Healer or Shielder. 
Describe artifacts, weapons, and substats for each character.
Conclude with team rotation and tips for effective play.
Do not display any information with square brackets [].
If it is a traveller, return as Traveller (Element)
`;

export default prompt;