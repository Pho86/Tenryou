import ArtifactsList from "../components/Lists/ArtifactsList";
import { Suspense } from "react";
import Loader from "../components/Loader";
export default async function ArtifactsPage() {

  const response = await fetch('https://genshin-db-api.vercel.app/api/v5/artifacts?query=names&matchCategories=true&dumpResults=true&verboseCategories=true', {
    cache: 'no-cache'
  });
  if (!response.ok) {
    throw new Error("failed to fetch")
  }
  const res = await response.json()
  const artifactData = res;

  return (
    <>
      <h1 className="text-3xl text-primary">Artifacts List</h1>
      <Suspense fallback={<Loader />}>
        <ArtifactsList artifactData={artifactData} />
      </Suspense>
    </>
  );
}

