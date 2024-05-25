export const prompt = `
I want you to create a team with these characters, generally 4 characters from Genshin Impact. Each character is listed as "CHARACTER_NAME, (WEAPON_TYPE), (ELEMENT_TYPE) | ". This list includes only fully released characters, no beta or speculative characters will be provided. The team should follow a standard composition: a Main DPS, 2 supports/sub DPS, and a healer.

For each character, provide a guide detailing the most commonly used artifacts, weapons, and recommended substats from the community.

At the end, describe the most common rotations for the team and provide tips for playing the team effectively. If there are multiple healers, assign the healer role based on their damage output capabilities (e.g., Kokomi can deal damage, Barbara cannot). If only one healer is present, they remain classified as the healer. If no healer is present, create a team with 3 supports instead. Teams with fewer than 4 characters are valid, but ensure one character is designated as the main DPS. If there are less then 4 characters that team is valid and do not add any other character, but make sure there is a Main DPS then.

The format should be in Markdown. Do not include these instructions in the final output.

# Team Name
## Character Name 1, Character Name 2, Character Name 3, Character Name 4 [Only provide the character name, do not provide any information such as element or weapon, and do not add any characters if less then 4 characters was provided]
[Provide a short description of the team, its elemental reactions, and the primary damage from the team.]

### Character 1 (Main DPS)
[Description of builds, stats, artifacts, weapons, and recommended stats/substats.]

#### **Weapons:** [All provided weapons here should be a part of the specified (WEAPON TYPE) for this character]
* **5 Star:** 
* **4 Star:**
* **3 Star:**

#### **Artifacts:**
**SET_NAME**: [Set description. Explain why this set is good for the character and provide recommended mainstats for each artifact piece.]

**Substats:** [Recommended substats]

### Character 2 (Sub DPS/Support)
[Description of builds, stats, artifacts, weapons, and recommended stats/substats.]

#### **Weapons:** [All provided weapons here should be a part of the specified (WEAPON TYPE) for this character]
* **5 Star:**
* **4 Star:**
* **3 Star:**

#### **Artifacts:**
**SET_NAME**: [Set description. Explain why this set is good for the character and provide recommended mainstats/substats for each artifact piece.]

**Substats:** [Recommended substats]

### Character 3 (Sub DPS/Support)
[Description of builds, stats, artifacts, weapons, and recommended stats/substats.]

#### **Weapons:** [All provided weapons here should be a part of the specified (WEAPON TYPE) for this character]
* **5 Star:**
* **4 Star:**
* **3 Star:**

#### **Artifacts:**
**SET_NAME**: [Set description. Explain why this set is good for the character and provide recommended mainstats for each artifact piece.]

**Substats:** [Recommended substats]

### Character 4 (Healer)
[Description of builds, stats, artifacts, weapons, and recommended stats/substats.]

#### **Weapons:** [All provided weapons here should be a part of the specified (WEAPON TYPE) for this character]
* **5 Star:**
* **4 Star:**
* **3 Star:**

#### **Artifacts:**
**SET_NAME**: [Set description. Explain why this set is good for the character and provide recommended mainstats for each artifact piece.]

**Substats:** [Recommended substats]

### Team Rotation:
1. [Step-by-step guide for the team rotation, including which character to start with, how to apply elemental effects, and when to switch characters.]

#### Tips:
* [Example tips for playing the team and each character.]

#### Team Strengths:
* [List the strengths of the team.]

#### Potential Weaknesses:
* [List the potential weaknesses of the team.]

`;

export default prompt;