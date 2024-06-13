import { Suspense } from "react";
import TeamBuilder from "../components/TeamBuilder";
import { addFileName } from "../utils/helper";
import Loader from "../components/Loader";
import { Character } from "../types/character";
export default async function TeamBuilderPage() {
    const response = await fetch('https://genshin-db-api.vercel.app/api/v5/characters?query=names&matchCategories=true&verboseCategories=true', {
        cache: 'no-cache'
    });
    if (!response.ok) {
        throw new Error("failed to fetch")
    }
    const res = await response.json()
    let characterData = res.sort();
    characterData.forEach((name: any) => {
        addFileName([name]);
    });

    const addCharacterToCharacterData = (characters: Character[], character: Character, element: string) => {
        const newCharacter = { ...character, name: `Traveller (${element})`, elementText: element };
        return [newCharacter, ...characters];
    };
    let modifiedCharacterData = characterData;
    modifiedCharacterData = addCharacterToCharacterData(modifiedCharacterData, characterData[0], "Hydro");
    modifiedCharacterData = addCharacterToCharacterData(modifiedCharacterData, characterData[0], "Dendro");
    modifiedCharacterData = addCharacterToCharacterData(modifiedCharacterData, characterData[0], "Electro");
    modifiedCharacterData = addCharacterToCharacterData(modifiedCharacterData, characterData[0], "Geo");
    modifiedCharacterData = addCharacterToCharacterData(modifiedCharacterData, characterData[0], "Anemo");

    let sortedCharacterData = modifiedCharacterData
    return (
        <>
            <h1 className="text-3xl text-primary">Team Builder (Beta)</h1>

            <Suspense fallback={<Loader />}>
                <TeamBuilder CharacterData={sortedCharacterData} />
            </Suspense>
        </>
    );
}

