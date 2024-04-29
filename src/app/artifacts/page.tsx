"use client"
import Image from "next/image";
import NavBar from "../components/NavBar";
import { capitalizeFirstLetter, lowerCaseEachLetter, addFileName } from "../utils/helper";
import axios from "axios";
import { useEffect, useLayoutEffect, useState } from "react"
import Link from "next/link";
import Footer from "../components/Footer";
import Loader from "../components/Loader";

function Artifact({ type, rarity, image, onMouseEnter }: { type: string, rarity: number, image: string, onMouseEnter: () => void }) {
  return <Image
    src={image}
    width={100}
    height={100}
    alt={`${type} image`}
    className={`rounded-4xl w-full h-full object-cover bg-gradient-to-br ${rarity == 5 ? "from-gradient-yellow-start to-gradient-yellow-end" : rarity == 4 ? "from-gradient-purple-start  to-gradient-purple-end" : "from-gradient-blue-start to-gradient-blue-end"} hover:scale-110 transition-all hover:shadow-light`}
    onMouseEnter={onMouseEnter}
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
              return <div className="grid md:grid-cols-2 gap-4">
                <div key={index} className="relative flex flex-col gap-2">
                  <div className="grid-auto-fit-200">
                    <Artifact type="flower" rarity={data.rarityList[1]} image={data.images.flower} onMouseEnter={() => { setActiveArtifact(1) }} />
                    <Artifact type="plume" rarity={data.rarityList[1]} image={data.images.plume} onMouseEnter={() => { setActiveArtifact(2) }} />
                    <Artifact type="sands" rarity={data.rarityList[1]} image={data.images.sands} onMouseEnter={() => { setActiveArtifact(3) }} />
                    <Artifact type="goblet" rarity={data.rarityList[1]} image={data.images.goblet} onMouseEnter={() => { setActiveArtifact(4) }} />
                    <Artifact type="circlet" rarity={data.rarityList[1]} image={data.images.circlet} onMouseEnter={() => { setActiveArtifact(5) }} />
                  </div>
                  <h3 className="font-bold text-xl">{data.name}</h3>
                  <p><span className="font-semibold">2 Piece:</span> {data.effect2Pc}</p>
                  <p><span className="font-semibold">4 Piece:</span> {data.effect4Pc}</p>
                </div>
                {activeArtifact == 1 && data.flower && <Description piece={data.flower} />}
                {activeArtifact == 2 && data.plume && <Description piece={data.plume} />}
                {activeArtifact == 3 && data.circlet && <Description piece={data.circlet} />}
                {activeArtifact == 4 && data.goblet && <Description piece={data.goblet} />}
                {activeArtifact == 5 && data.sands && <Description piece={data.sands} />}
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
    <p className="font-bold text-lg">{piece.name}</p>
    <blockquote className="">{piece.description}</blockquote>
    <blockquote className="italic">{piece.story}</blockquote>
  </div>
}