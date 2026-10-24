import { Achievement } from "genshin-db";
import AchievementsList from "../components/Lists/AchievementsList";
import Skeleton from "../components/Skeleton";
import PageHeader from "../components/PageHeader";
import { Suspense } from "react";

function AchievementsListSkeleton() {
  return (
    <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
      {/* group sidebar */}
      <div className="flex flex-col gap-2 rounded-xl border border-bg-light/60 bg-bg-dark/40 p-2">
        {Array.from({ length: 12 }).map((_, i) => (
          <Skeleton key={i} className="h-9 w-full rounded-lg" />
        ))}
      </div>
      {/* achievement rows */}
      <div className="flex flex-col gap-3 rounded-xl border border-bg-light/60 bg-bg-dark/40 p-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-20 w-full rounded-xl" />
        ))}
      </div>
    </div>
  )
}
export default async function AchievementsPage() {
  const response = await fetch(
    "https://genshin-db-api.vercel.app/api/achievements?query=names&dumpResult=true&matchAliases=true&matchCategories=true&verboseCategories=true",
    { next: { revalidate: 86400 } }
  );
  if (!response.ok) {
    throw new Error("failed to fetch");
  }
  const res = await response.json();
  const AchievementData = res.result;
  const AchievementGroupsSet = new Set<string>();
  AchievementData.forEach((item: any) => {
    AchievementGroupsSet.add(item.achievementgroup);
  });
  const achievementGroupsArray = Array.from(AchievementGroupsSet);

  return (
    <main className="relative flex w-full flex-col gap-10 px-4 py-8">
      <PageHeader
        eyebrow="TRACKER"
        title="Achievements"
        description="Search and browse Teyvat achievements by category."
      />
      <Suspense fallback={<AchievementsListSkeleton />}>
        <AchievementsList
          AchievementData={AchievementData}
          AchievementGroups={achievementGroupsArray}
        />
      </Suspense>
    </main>
  );
}
