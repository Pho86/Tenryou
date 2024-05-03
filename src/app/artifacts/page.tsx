"use client"
import Image from "next/image";
import NavBar from "../components/NavBar";
import axios from "axios";
import { useEffect, useLayoutEffect, useState } from "react"
import Footer from "../components/Footer";
import Loader from "../components/Loader";

function Artifact({ type, rarity, image, onMouseEnter, name }: { type: string, rarity: number, image: string, onMouseEnter: () => void, name: string }) {
  return <Image
    src={image}
    width={100}
    height={100}
    alt={`${type} image`}
    className={`rounded-4xl max-w-32 w-full h-full object-cover bg-gradient-to-br ${rarity == 5 ? "from-gradient-SSR-start to-gradient-SSR-end" : rarity == 4 ? "from-gradient-SR-start  to-gradient-SR-end" : "from-gradient-R-start to-gradient-R-end"} hover:scale-110 transition-all hover:shadow-light`}
    onMouseEnter={onMouseEnter}
    title={name ? name : ""}
  />
}
export default function ArtifactsPage() {
  const [fullData, setFullData] = useState<any[]>([]);
  const [activeArtifact, setActiveArtifact] = useState<number>(1);
  useLayoutEffect(() => {
    axios
      .get<any[]>("https://genshin-db-api.vercel.app/api/v5/artifacts?query=names&matchCategories=true&dumpResults=true&verboseCategories=true")
      .then((res) => {
        setFullData(res.data);
      })
      .catch((error) => {
        console.error("Error fetching character names:", error);
      });
  }, []);
  return (
    <>
      <NavBar />
      <main className="pt-16 px-8 mb-20 w-full min-h-[100dvh] flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl text-primary">Artifacts List</h1>
          <section className="flex flex-col gap-8">
            {fullData.length > 0 ? fullData.map((data, index) => {
              return <div className="grid md:grid-cols-2 gap-8 w-full" key={index}>
                <div className="relative flex flex-col gap-2">
                  <div className="grid-auto-fit-100">
                    {data.flower &&
                      <Artifact type="flower" rarity={data.rarityList[1]} image={`https://enka.network/ui/${data.images.filename_flower}.png`} onMouseEnter={() => { setActiveArtifact(1) }} name={data.flower.name} />}
                    {/* <Artifact type="flower" rarity={data.rarityList[1]} image={data.images.flower} onMouseEnter={() => { setActiveArtifact(1) }} name={data.flower.name} /> */}
                    {data.plume && <Artifact type="plume" rarity={data.rarityList[1]} image={`https://enka.network/ui/${data.images.filename_plume}.png`} onMouseEnter={() => { setActiveArtifact(2) }} name={data.plume.name} />}
                    {data.sands && <Artifact type="sands" rarity={data.rarityList[1]} image={`https://enka.network/ui/${data.images.filename_sands}.png`} onMouseEnter={() => { setActiveArtifact(3) }} name={data.sands.name} />}
                    {data.goblet && <Artifact type="goblet" rarity={data.rarityList[1]} image={`https://enka.network/ui/${data.images.filename_goblet}.png`} onMouseEnter={() => { setActiveArtifact(4) }} name={data.goblet.name} />}
                    {data.circlet && <Artifact type="circlet" rarity={data.rarityList[1]} image={`https://enka.network/ui/${data.images.filename_circlet}.png`} onMouseEnter={() => { setActiveArtifact(5) }} name={data.circlet.name} />}

                  </div>
                  <h3 className="font-bold text-xl">{data.name}</h3>
                  {data.effect1Pc && <p><span className="font-semibold">1 Piece:</span> {data.effect1Pc}</p>}
                  {data.effect2Pc && <p><span className="font-semibold">2 Piece:</span> {data.effect2Pc}</p>}
                  {data.effect4Pc && <p><span className="font-semibold">4 Piece:</span> {data.effect4Pc}</p>}
                </div>
                {activeArtifact == 1 && data.flower && <Description piece={data.flower} />}
                {activeArtifact == 2 && data.plume && <Description piece={data.plume} />}
                {activeArtifact == 3 && data.sands && <Description piece={data.sands} />}
                {activeArtifact == 4 && data.goblet && <Description piece={data.goblet} />}
                {activeArtifact == 5 && data.circlet && <Description piece={data.circlet} />}
              </div>
            }) :
              <Loader />
            }
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

function Description({ piece }: { piece: any }) {
  return <div className="flex gap-2 flex-col">
    <p className="font-bold text-xl">{piece.name}</p>
    <blockquote className="">{piece.description}</blockquote>
    <blockquote className="italic text-sm">{piece.story}</blockquote>
  </div>
}