export const prompt = `
This prompt will be split into 3 distinct parts. When you return a message, only return the part of the prompt you will be generating based on, and you will receive the current generated text. Do not return any indicator of what part you are on and only return the parts where the part is currently on. There are guidelines of where the part starts via [PART 1 START] and [PART 1 END], [PART 2 START] and [PART 2 END], etc, so ONLY return the parts where that information lies, so only the information between [PART X] and [PART X END]. 

[PART 1 START]

Create a team with generally 4 characters from Genshin Impact. Each character is listed as "CHARACTER_NAME, (WEAPON_TYPE), (ELEMENT_TYPE) | ". Swap the characters to ensure the character is in the correct slot, so reorder this team to match the guidelines provided. If the main DPS is in slot 4, make the main DPS into slot 1, but if slot 4 is a healer, keep it a healer. Ensure the Main DPS is in the first slot, chosen based on who provides the most DPS with the least utility and the one who is most commonly used as a main DPS or provides the most damage. The second and third slots should be supports/sub DPS, try to choose one only, either support or sub DPS, depending on if they bring more damage by buffing or dealing damage. The fourth slot should be a healer or shielder to protect the team. These are guidelines, not strict rules. If the team lacks a healer or shielder, that is acceptable.

[PART 1 END]

[PART 2 START]

For each character, provide a guide detailing the most commonly used artifacts, weapons, and recommended substats from the community.

[PART 2 END]

[PART 3 START]

Conclude with the most common rotations for the team and tips for playing the team effectively. If there are multiple healers, assign the healer role based on their damage output capabilities. If only one healer is present, they remain classified as the healer. If no healer is present, create a team with 3 supports instead. Teams with fewer than 4 characters are valid, but ensure one character is designated as the Main DPS.

The format should be in Markdown.

[PART 3 END]

# [Create a Team Name: combine character names, use a standardized name, or use a creative word and build off of that] [PART 1 START] 
## Character Name 1, Character Name 2, Character Name 3, Character Name 4 [Only provide the character name, do not provide any information such as element or weapon, and do not add any characters if less then 4 characters was provided]
[Provide a short description of the team, its elemental reactions, and the primary damage from the team.] [PART 1 END] 

### Character 1 Name (Main DPS) [PART 2, PART 2 ENDS AFTER HOW MANY CHARACTERS WERE PROVIDED, ex. 2 characters, end after Character 2, 4 characters, end after Character 4]
[Provide a short escription of builds, stats, artifacts, weapons, and recommended stats/substats.]

#### **Weapons:** [All weapons provided here should be a part of the specified (WEAPON TYPE) for this character, ensure that they match the correct type.]
* **5 Star:** 
* **4 Star:**
* **3 Star:**

#### **Artifacts:**
**SET_NAME**: [Set description. Explain why this set is good for the character and provide recommended mainstats for each artifact piece.]

**Substats:** [Recommended substats in a single line, normal weight]

### Character 2 Name (Sub DPS/Support)
[Provide a short description of builds, stats, artifacts, weapons, and recommended stats/substats.]

#### **Weapons:** [All provided weapons here should be a part of the specified (WEAPON TYPE) for this character]
* **5 Star:**
* **4 Star:**
* **3 Star:**

#### **Artifacts:**
**SET_NAME**: [Set description. Explain why this set is good for the character and provide recommended mainstats/substats for each artifact piece.]

**Substats:** [Recommended substats in a single line, normal weight]

### Character 3 Name (Sub DPS/Support)
[Provide a short description of builds, stats, artifacts, weapons, and recommended stats/substats. Recommended substats should be in a single line.]

#### **Weapons:** [All provided weapons here should be a part of the specified (WEAPON TYPE) for this character]
* **5 Star:**
* **4 Star:**
* **3 Star:**

#### **Artifacts:**
**SET_NAME**: [Set description. Explain why this set is good for the character and provide recommended mainstats for each artifact piece.]

**Substats:** [Recommended substats in a single line, normal weight]

### Character 4 Name (Healer)
[Provide a short description of builds, stats, artifacts, weapons, and recommended stats/substats.]

#### **Weapons:** [All provided weapons here should be a part of the specified (WEAPON TYPE) for this character]
* **5 Star:**
* **4 Star:**
* **3 Star:**

#### **Artifacts:**
**SET_NAME**: [Set description. Explain why this set is good for the character and provide recommended mainstats for each artifact piece.]

**Substats:** [Recommended substats in a single line, normal weight] [PART 2 END]

### Team Rotation: [PART 3 START]
1. [Step-by-step guide for the team rotation, including which character to start with, how to apply elemental effects, and when to switch characters.]

#### Tips:
* [Example tips for playing the team and each character.]

#### Team Strengths:
* [List the strengths of the team.]

#### Potential Weaknesses:
* [List the potential weaknesses of the team.] [PART 3 END]


[Additional Notes:
Ensure the first character is always the Main DPS.
The second and third characters are Sub DPS/Support, choose only the best one.
Try to make the fourth character a Healer/Shielder, if they do not provide those utilities, instea make them a support or Sub DPS.
Describe artifacts, weapons, and substats for each character.
Conclude with team rotation and tips for effective play.
Do not display any information with square brackets [].

`;

export default prompt;