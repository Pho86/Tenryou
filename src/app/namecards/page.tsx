import { Suspense } from "react"
import Loader from "../components/Loader";
import NamecardsList from "../components/Lists/NamecardsList";
export default async function NamecardsPage() {
    const response = await fetch('https://genshin-db-api.vercel.app/api/v5/namecards?query=names&matchCategories=true&dumpResults=true&verboseCategories=true', {
        cache: 'no-cache'
    });
    if (!response.ok) {
        throw new Error("failed to fetch")
    }
    const res = await response.json()
    const NamecardData = res;

    return (
        <>
            <h1 className="text-3xl text-primary">Namecards List</h1>
            <Suspense fallback={<Loader />}>
                <NamecardsList NamecardData={NamecardData} />
            </Suspense>
        </>
    );
}
