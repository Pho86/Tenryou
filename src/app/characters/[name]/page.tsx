
import CharacterInfo from "@/app/components/CharacterInfo";
import Loader from "@/app/components/Loader";
import { addFileName } from "@/app/utils/helper";
import { Suspense } from "react";
export default async function CharacterPage({ params }: { params: { name: string } }) {

  const mergeWithPreference = (firstData: any, secondData: any) => {
    if (!firstData) {
      return secondData;
    }
    for (const key in secondData) {
      if (firstData.hasOwnProperty(key) && typeof firstData[key] === 'object' && secondData[key] !== null) {
        firstData[key] = mergeWithPreference(firstData[key], secondData[key]);
      } else {
        firstData[key] = secondData[key];
      }
    }
    return firstData;
  };
  let CharacterData;

  const response = await fetch(`https://genshin-db-api.vercel.app/api/v5/stats?folder=characters&query=${params.name}&dumpResult=true`);
  
  const res = await response.json();
  CharacterData = res.result;
  const names = addFileName([CharacterData]);
  const characterName = names[0].fileName;
  const [constellationsResponse, talentsResponse, nameCardResponse, voiceResponse, outfitResponse] = await Promise.all([
    fetch(`https://genshin-db-api.vercel.app/api/v5/constellations?query=${params.name}&matchCategories=true&dumpResults=true&verboseCategories=true`),
    fetch(`https://genshin-db-api.vercel.app/api/v5/talents?query=${params.name}&matchCategories=true&dumpResults=true&verboseCategories=true`),
    fetch(`https://genshin-db-api.vercel.app/api/v5/namecards?query=${CharacterData.nameCardName ? CharacterData.nameCardName : characterName}&matchCategories=true`),
    fetch(`https://genshin-db-api.vercel.app/api/v5/voiceovers?query=${params.name}&matchCategories=true`),
    fetch(`https://genshin-db-api.vercel.app/api/v5/outfits?query=${params.name}&matchCategories=true&dumpResults=true&verboseCategories=true`)
  ]);

  if (!constellationsResponse.ok || !talentsResponse.ok || !nameCardResponse.ok || !voiceResponse.ok || !outfitResponse.ok) {
    throw new Error("Failed to fetch additional data");
  }
  const [constellationsData, talentsData, nameCardData, voiceData, outfitData] = await Promise.all([
    constellationsResponse.json(),
    talentsResponse.json(),
    nameCardResponse.json(),
    voiceResponse.json(),
    outfitResponse.json()
  ]);

  const mergedData = {
    stats: CharacterData.stats,
    constellations: constellationsData,
    talents: talentsData,
    nameCard: nameCardData,
    voices: voiceData,
    outfits: outfitData,
    ...CharacterData,
  };

  CharacterData = mergeWithPreference(CharacterData, mergedData);

  return (
    <>
      <Suspense fallback={<Loader />}>
        {CharacterData != undefined && <CharacterInfo CharacterData={CharacterData} params={params} />}
      </Suspense>
    </>
  );
}