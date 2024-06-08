import { addFileName } from "../utils/helper";
import { Suspense } from "react"

import CharacterList from "../components/Lists/CharacterSelectorList";
import Loader from "../components/Loader";

export default async function CharacterPage() {
  const response = await fetch('https://genshin-db-api.vercel.app/api/v5/characters?query=names&matchCategories=true&verboseCategories=true', {
    cache: 'no-cache'
  });
  if (!response.ok) {
    throw new Error("failed to fetch")
  }
  const res = await response.json()
  const characterData = res.sort();
  characterData.forEach((name: any) => {
    addFileName([name]);
  });

  return (
    <>
      <h1 className="text-3xl text-primary">Characters List</h1>
      <Suspense fallback={<Loader />}>
        <CharacterList CharacterData={characterData} />
      </Suspense>
    </>
  );
}
