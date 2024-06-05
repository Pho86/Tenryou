import { Suspense } from "react";
import TeamBuilder from "../components/TeamBuilder";
import { addFileName } from "../utils/helper";
import Loader from "../components/Loader";

export default async function TeamBuilderPage() {
    const response = await fetch('https://genshin-db-api.vercel.app/api/v5/characters?query=names&matchCategories=true&verboseCategories=true');
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
            <h1 className="text-3xl text-primary">Team Builder (Beta)</h1>

            {/* <Suspense fallback={<Loader />}> */}
            <TeamBuilder CharacterData={characterData} />
            {/* </Suspense> */}
        </>
    );
}

