
import CharacterInfo from "@/app/components/CharacterInfo";
import Loader from "@/app/components/Loader";
import { addFileName } from "@/app/utils/helper";
import { Suspense } from "react";
export default async function CharacterPage({ params }: { params: { name: string } }) {

  const mergeWithPreference = (firstData: any, secondData: any) => {
    for (const key in secondData) {
      if (firstData.hasOwnProperty(key) && typeof firstData[key] === 'object' && secondData[key] !== null) {
        firstData[key] = mergeWithPreference(firstData[key], secondData[key]);
      } else {
        firstData[key] = secondData[key];
      }
    }
    return firstData;
  };
  const response = await fetch(`https://genshin-db-api.vercel.app/api/v5/stats?folder=characters&query=${params.name}&dumpResult=true`)
  if (!response.ok) {
    throw new Error("Failed to fetch");
  }
  const res = await response.json();
  let characterData = res.result;
  const stats = res.stats
  const names = addFileName([characterData]);
  const characterName = names[0].fileName;
  Promise.all([
    fetch(`https://genshin-db-api.vercel.app/api/v5/constellations?query=${params.name}&matchCategories=true&dumpResults=true&verboseCategories=true`).then(res => res.json()),
    fetch(`https://genshin-db-api.vercel.app/api/v5/talents?query=${params.name}&matchCategories=true&dumpResults=true&verboseCategories=true`).then(res => res.json()),
    fetch(`https://genshin-db-api.vercel.app/api/v5/namecards?query=${characterName}&matchCategories=true`).then(res => res.json()),
    fetch(`https://genshin-db-api.vercel.app/api/v5/voiceovers?query=${params.name}&matchCategories=true`).then(res => res.json()),
    fetch(`https://genshin-db-api.vercel.app/api/v5/outfits?query=${params.name}&matchCategories=true&dumpResults=true&verboseCategories=true`).then(res => res.json())
  ]).then(([constellationsData, talentsData, nameCardData, voiceData, outfitData]) => {
    const mergedData = {
      stats: stats,
      constellations: constellationsData,
      talents: talentsData,
      nameCard: nameCardData,
      voices: voiceData,
      outfits: outfitData,
      ...characterData,
    };
    characterData = mergeWithPreference(characterData, mergedData);
  })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });

  return (
    <>
      <Suspense fallback={<Loader />}>
        <CharacterInfo CharacterData={characterData} params={params} />
      </Suspense>
    </>
  );
}
