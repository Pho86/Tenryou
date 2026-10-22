import { addFileName } from "../utils/helper";
import { Suspense } from "react"
import Skeleton from "../components/Skeleton";
import CharacterList from "../components/Lists/CharacterSelectorList";

function CharacterListSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-3">
        <Skeleton className="h-10 w-full max-w-xs rounded-xl" />
        <Skeleton className="h-10 w-28 rounded-xl" />
        <Skeleton className="h-10 w-28 rounded-xl" />
      </div>
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8">
        {Array.from({ length: 32 }).map((_, i) => (
          <Skeleton key={i} className="aspect-[3/4] w-full rounded-2xl" />
        ))}
      </div>
    </div>
  )
}

export default async function CharacterPage() {
  const response = await fetch('https://genshin-db-api.vercel.app/api/v5/characters?query=names&matchCategories=true&verboseCategories=true', {
    next: { revalidate: 86400 }
  });
  if (!response.ok) {
    throw new Error("failed to fetch")
  }
  const res = await response.json()
  const characterData = res.sort((a: any, b: any) => a.name.localeCompare(b.name));
  characterData.forEach((name: any) => {
    addFileName([name]);
  });

  return (
    <main className="flex w-full flex-col gap-10 px-4 py-8">
      <header className="flex flex-col gap-3 border-b border-bg-light/60">
        <span className="font-mono text-sm font-semibold text-primary">DATABASE</span>
        <h1 className="text-4xl font-bold text-text md:text-6xl">Characters</h1>
        <p className="max-w-3xl text-base text-text/65 md:text-lg">
          Browse every playable character, filter by element and weapon, and jump straight to detailed builds.
        </p>
      </header>
      <Suspense fallback={<CharacterListSkeleton />}>
        <CharacterList CharacterData={characterData} />
      </Suspense>
    </main>
  );
}
