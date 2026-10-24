import { Suspense } from "react";
import TeamBuilder from "../components/TeamBuilder";
import { addFileName } from "../utils/helper";
import Skeleton from "../components/Skeleton";
import { Character } from "../types/character";
import TeamBuilderHeader from "./TeamBuilderHeader";

function TeamBuilderSkeleton() {
  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* roster skeleton */}
      <div className="grid-auto-fit-100 rounded-xl border border-bg-light/60 bg-bg-dark/40 p-4">
        {Array.from({ length: 16 }).map((_, i) => (
          <Skeleton key={i} className="aspect-[3/4] w-full rounded-xl" />
        ))}
      </div>
      {/* team panel skeleton */}
      <div className="flex flex-col gap-4 rounded-xl border border-bg-light/60 bg-bg-dark/40 p-4">
        <div className="flex gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-20 rounded-lg" />
          ))}
        </div>
        <div className="grid grid-cols-4 gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="aspect-square w-full rounded-xl" />
          ))}
        </div>
        <Skeleton className="h-32 w-full rounded-xl" />
      </div>
    </div>
  )
}

export default async function TeamBuilderPage() {
    const response = await fetch('https://genshin-db-api.vercel.app/api/v5/characters?query=names&matchCategories=true&verboseCategories=true', {
        next: { revalidate: 86400 },
    });
    if (!response.ok) {
        throw new Error("failed to fetch")
    }
    const res = await response.json()
    const characterData = res.sort((a: any, b: any) => (a.name || '').localeCompare(b.name || ''));
    characterData.forEach((name: any) => {
        addFileName([name]);
    });

    const baseTraveler = characterData.find((c: Character) => c.name === "Aether" || c.name === "Lumine") || characterData[0];

    const addCharacterToCharacterData = (characters: Character[], character: Character, element: string) => {
        const newCharacter = { 
            ...character, 
            name: `Traveller (${element})`, 
            elementText: element,
            fileName: `Traveller_${element}`
        };
        return [newCharacter, ...characters];
    };

    let modifiedCharacterData = characterData;
    const travelerElements = ["Pyro", "Hydro", "Dendro", "Electro", "Geo", "Anemo"];
    for (const el of travelerElements) {
        modifiedCharacterData = addCharacterToCharacterData(modifiedCharacterData, baseTraveler, el);
    }

    let sortedCharacterData = modifiedCharacterData;
    return (
        <main className="flex w-full flex-col gap-8 px-4 py-8 md:px-8 md:py-12">
            <TeamBuilderHeader />

            <Suspense fallback={<TeamBuilderSkeleton />}>
                <TeamBuilder CharacterData={sortedCharacterData} />
            </Suspense>
        </main>
    );
}