import { Suspense } from "react"
import Skeleton from "../components/Skeleton";
import WeaponsList from "../components/Lists/WeaponsList";

function WeaponsListSkeleton() {
  return (
    <div className="flex flex-col gap-8">
      {/* filter bar */}
      <div className="flex flex-wrap gap-3 rounded-xl border border-bg-light/60 bg-bg-dark/40 p-4">
        <Skeleton className="h-8 w-20 rounded-xl" />
        <Skeleton className="h-8 w-20 rounded-xl" />
        <Skeleton className="h-8 w-20 rounded-xl" />
        <Skeleton className="h-8 w-20 rounded-xl" />
        <Skeleton className="h-8 w-20 rounded-xl" />
      </div>
      <div className="grid gap-8 lg:grid-cols-2">
        {/* weapon grid */}
        <div className="grid grid-cols-2 gap-3 rounded-xl border border-bg-light/60 p-3 sm:grid-cols-3">
          {Array.from({ length: 12 }).map((_, i) => (
            <Skeleton key={i} className="aspect-square w-full rounded-xl" />
          ))}
        </div>
        {/* detail panel */}
        <div className="flex flex-col gap-4 rounded-xl border border-bg-light/60 bg-bg-dark/40 p-6">
          <Skeleton className="h-48 w-full rounded-xl" />
          <Skeleton className="h-8 w-40 rounded" />
          <Skeleton className="h-5 w-full rounded" />
          <Skeleton className="h-5 w-3/4 rounded" />
        </div>
      </div>
    </div>
  )
}
export default async function WeaponsPage() {

    const response = await fetch('https://genshin-db-api.vercel.app/api/v5/weapons?query=names&matchCategories=true&dumpResults=true&verboseCategories=true', {
        next: { revalidate: 86400 }
    });
    if (!response.ok) {
        throw new Error("failed to fetch")
    }
    const res = await response.json()
    const WeaponData = res;

    return (
        <main className="flex w-full flex-col gap-10 py-8">
            <header className="flex flex-col gap-3 border-b border-bg-light/60">
                <span className="font-mono text-sm font-semibold text-primary">DATABASE</span>
                <h1 className="text-4xl font-bold text-text md:text-6xl">Weapons</h1>
                <p className="max-w-2xl text-base text-text/65 md:text-lg">
                    Compare stats, passives, and refinement values across every weapon in Teyvat.
                </p>
            </header>
            <Suspense fallback={<WeaponsListSkeleton />}>
                <WeaponsList WeaponData={WeaponData} />
            </Suspense>
        </main>
    );
}
