import { Suspense } from "react"
import Skeleton from "../components/Skeleton";
import NamecardsList from "../components/Lists/NamecardsList";

function NamecardsListSkeleton() {
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="grid grid-cols-2 gap-3 rounded-xl border border-bg-light/60 p-3 sm:grid-cols-3">
        {Array.from({ length: 12 }).map((_, i) => (
          <Skeleton key={i} className="h-28 w-full rounded-xl" />
        ))}
      </div>
      <div className="flex flex-col gap-4 rounded-xl border border-bg-light/60 bg-bg-dark/40 p-6">
        <Skeleton className="h-60 w-full rounded-xl sm:h-72" />
        <Skeleton className="h-8 w-52 rounded" />
        <Skeleton className="h-4 w-full rounded" />
        <Skeleton className="h-4 w-4/5 rounded" />
      </div>
    </div>
  )
}
export default async function NamecardsPage() {
    const response = await fetch('https://genshin-db-api.vercel.app/api/v5/namecards?query=names&matchCategories=true&dumpResults=true&verboseCategories=true', {
        next: { revalidate: 86400 }
    });
    if (!response.ok) {
        throw new Error("failed to fetch")
    }
    const res = await response.json()
    const NamecardData = res;

    return (
        <main className="flex w-full flex-col gap-10 py-8">
            <header className="flex flex-col gap-3 border-b border-bg-light/60">
                <span className="font-mono text-sm font-semibold text-primary">COLLECTION</span>
                <h1 className="text-4xl font-bold text-text md:text-6xl">Namecards</h1>
                <p className="max-w-2xl text-base text-text/65 md:text-lg">
                    Browse namecard art and see where each one comes from.
                </p>
            </header>
            <Suspense fallback={<NamecardsListSkeleton />}>
                <NamecardsList NamecardData={NamecardData} />
            </Suspense>
        </main>
    );
}
