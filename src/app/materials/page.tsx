import { Suspense } from "react"
import Skeleton from "../components/Skeleton";
import MaterialsList from "../components/Lists/MaterialsList";

function MaterialsListSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-8 w-24 rounded-xl" />
        ))}
      </div>
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
        {Array.from({ length: 32 }).map((_, i) => (
          <Skeleton key={i} className="aspect-square w-full rounded-xl" />
        ))}
      </div>
    </div>
  )
}

export default async function MaterialsPage() {
    const response = await fetch('https://genshin-db-api.vercel.app/api/v5/materials?query=names&matchCategories=true&dumpResults=true&verboseCategories=true', {
        next: { revalidate: 86400 }
    });
    if (!response.ok) {
        throw new Error("failed to fetch")
    }
    const res = await response.json()

    return (
        <main className="flex w-full flex-col gap-10 px-4 py-8">
            <header className="flex flex-col gap-3 border-b border-bg-light/60">
                <span className="font-mono text-sm font-semibold text-primary">DATABASE</span>
                <h1 className="text-4xl font-bold text-text md:text-6xl">Materials</h1>
                <p className="max-w-3xl text-base text-text/65 md:text-lg">
                    Browse ascension and talent materials, compare rarities, and find where each one comes from.
                </p>
            </header>
            <Suspense fallback={<MaterialsListSkeleton />}>
                <MaterialsList materialData={res} />
            </Suspense>
        </main>
    );
}
