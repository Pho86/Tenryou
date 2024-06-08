import { Suspense } from "react"
import Loader from "../components/Loader";
import WeaponsList from "../components/Lists/WeaponsList";
export default async function WeaponsPage() {

    const response = await fetch('https://genshin-db-api.vercel.app/api/v5/weapons?query=names&matchCategories=true&dumpResults=true&verboseCategories=true', {
        cache: 'no-cache'
    });
    if (!response.ok) {
        throw new Error("failed to fetch")
    }
    const res = await response.json()
    const WeaponData = res;

    return (
        <>
            <h1 className="text-3xl text-primary">Weapons List</h1>
            <Suspense fallback={<Loader />}>
                <WeaponsList WeaponData={WeaponData} />
            </Suspense>
        </>
    );
}
