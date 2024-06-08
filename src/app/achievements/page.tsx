import { Achievement } from "genshin-db";
import AchievementsList from "../components/Lists/AchievementsList";
import Loader from "../components/Loader";
import { Suspense } from "react";
export default async function AchievementsPage() {
    
    const response = await fetch('https://genshin-db-api.vercel.app/api/achievements?query=names&dumpResult=true&matchAliases=true&matchCategories=true&verboseCategories=true', {
        cache: 'no-cache'
      });
    if (!response.ok) {
        throw new Error("failed to fetch")
    }
    const res = await response.json();
    const AchievementData = res.result;
    const AchievementGroupsSet = new Set<string>()
    AchievementData.forEach((item: any) => {
        AchievementGroupsSet.add(item.achievementgroup);
    });
    const achievementGroupsArray = Array.from(AchievementGroupsSet);

    return (
        <>
            <h1 className="text-3xl text-primary">Achievement List</h1>
            <Suspense fallback={<Loader />}>
            <AchievementsList AchievementData={AchievementData} AchievementGroups={achievementGroupsArray} />
            </Suspense>
        </>
    );
}
