import ArtifactsList from "../components/Lists/ArtifactsList";
import { Suspense } from "react";
import Skeleton from "../components/Skeleton";
import PageHeader from "../components/PageHeader";

function ArtifactsListSkeleton() {
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="grid grid-cols-2 gap-3 rounded-xl border border-bg-light/60 p-3 sm:grid-cols-3">
        {Array.from({ length: 12 }).map((_, i) => (
          <Skeleton key={i} className="h-24 w-full rounded-xl" />
        ))}
      </div>
      <div className="flex flex-col gap-4 rounded-xl border border-bg-light/60 bg-bg-dark/40 p-6">
        <Skeleton className="h-10 w-48 rounded" />
        <div className="grid grid-cols-5 gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="aspect-square w-full rounded-xl" />
          ))}
        </div>
        <Skeleton className="h-4 w-full rounded" />
        <Skeleton className="h-4 w-4/5 rounded" />
        <Skeleton className="h-4 w-3/5 rounded" />
      </div>
    </div>
  )
}
export default async function ArtifactsPage() {

  const response = await fetch('https://genshin-db-api.vercel.app/api/v5/artifacts?query=names&matchCategories=true&dumpResults=true&verboseCategories=true', {
    next: { revalidate: 86400 }
  });
  if (!response.ok) {
    throw new Error("failed to fetch")
  }
  const res = await response.json()
  const artifactData = res;

  return (
    <main className="flex w-full flex-col gap-10 px-4 py-8">
      <PageHeader
        eyebrow="DATABASE"
        title="Artifacts"
        description="Explore every artifact set, read each piece's story, and compare set bonuses at a glance."
      />
      <Suspense fallback={<ArtifactsListSkeleton />}>
        <ArtifactsList artifactData={artifactData} />
      </Suspense>
    </main>
  );
}

