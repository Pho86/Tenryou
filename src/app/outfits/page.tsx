
import { Suspense } from "react"
import Loader from "../components/Loader";
import { Outfit } from "../types/outfits";
import OutfitsList from "../components/Lists/OutfitsList";
export default async function OutfitsPage() {

    const response = await fetch('https://genshin-db-api.vercel.app/api/outfits?query=names&dumpResult=true&matchNames=false&matchAltNames=false&matchAliases=true&matchCategories=true&verboseCategories=true', {
        cache: 'no-cache'
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
        <>
            <h1 className="text-3xl text-primary">Skins List</h1>
            <Suspense fallback={<Loader />}>
                <OutfitsList OutfitData={filteredSkins} />
            </Suspense>
        </>
    );
}
