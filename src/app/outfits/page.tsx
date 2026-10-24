import { Suspense } from "react"
import Skeleton from "../components/Skeleton";
import { Outfit } from "../types/outfits";
import OutfitsList from "../components/Lists/OutfitsList";
import PageHeader from "../components/PageHeader";

function OutfitsListSkeleton() {
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="grid grid-cols-2 gap-3 rounded-xl border border-bg-light/60 p-3 sm:grid-cols-3">
        {Array.from({ length: 9 }).map((_, i) => (
          <Skeleton key={i} className="aspect-[2/1] w-full rounded-xl" />
        ))}
      </div>
      <div className="flex flex-col gap-4 rounded-xl border border-bg-light/60 bg-bg-dark/40 p-6">
        <Skeleton className="h-64 w-full rounded-xl sm:h-80" />
        <Skeleton className="h-8 w-48 rounded" />
        <Skeleton className="h-4 w-full rounded" />
        <Skeleton className="h-4 w-5/6 rounded" />
        <Skeleton className="h-4 w-2/3 rounded" />
      </div>
    </div>
  )
}
export default async function OutfitsPage() {

    const response = await fetch('https://genshin-db-api.vercel.app/api/outfits?query=names&dumpResult=true&matchNames=false&matchAltNames=false&matchAliases=true&matchCategories=true&verboseCategories=true', {
        next: { revalidate: 86400 }
    });
    if (!response.ok) {
        throw new Error("failed to fetch")
    }
    const res = await response.json()
    const OutfitData = res.result;

    let filteredSkins: Outfit[] = [];
    OutfitData.forEach((outfit: Outfit) => {
        if (outfit.images.nameicon) filteredSkins.push(outfit);
    })

    return (
        <main className="flex w-full flex-col gap-10 py-8">
            <PageHeader
                eyebrow="COLLECTION"
                title="Outfits"
                description="Alternate costumes and character skins with their artwork and 3D previews."
            />
            <Suspense fallback={<OutfitsListSkeleton />}>
                <OutfitsList OutfitData={filteredSkins} />
            </Suspense>
        </main>
    );
}
