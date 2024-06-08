import { Suspense } from "react"
import Loader from "../components/Loader";
import MaterialsList from "../components/Lists/MaterialsList";

export default async function MaterialsPage() {
    const response = await fetch('https://genshin-db-api.vercel.app/api/v5/materials?query=names&matchCategories=true&dumpResults=true&verboseCategories=true', {
        cache: 'no-cache'
    });
    if (!response.ok) {
        throw new Error("failed to fetch")
    }
    const res = await response.json()

    return (
        <>
            <h1 className="text-3xl text-primary">Materials List</h1>
            <Suspense fallback={<Loader />}>
                <MaterialsList materialData={res} />
            </Suspense>
        </>
    );
}
