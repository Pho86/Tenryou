"use client"
import Image from "next/image";
import NavBar from "../components/NavBar";
import { capitalizeFirstLetter, lowerCaseEachLetter, addFileName } from "../utils/helper";
import axios from "axios";
import { useEffect, useLayoutEffect, useState } from "react"
import Link from "next/link";
import Footer from "../components/Footer";

export default function CharacterPage() {

  const [fullData, setFullData] = useState<any[]>([]);
  useLayoutEffect(() => {
    axios
      .get<any[]>("https://genshin-db-api.vercel.app/api/v5/characters?query=names&matchCategories=true&verboseCategories=true")
      .then((res) => {
        let names = res.data.sort();
        names.forEach((name) => {
          addFileName([name]);
        })
        setFullData(names);
      })
      .catch((error) => {
        console.error("Error fetching character names:", error);
      });
  }, []);
  return (
    <>
      <NavBar />
      <main className="pt-16 px-8 mb-20 w-full min-h-[100dvh]">
        <section className=" grid-auto-fit-300">
          {fullData.length > 0 && fullData.map((data, index) => (
            <div key={index} className="bg-[#ffffff] transition-all relative rounded-xl cursor-pointer hover:animate-hoverAnimation">
              <Link href={`/characters/${data.name}`} className={`flex flex-col self-start  `}>
                <div className="absolute top-1 left-1 text-black">
                  <Image src={`/elements/${data.elementText}.webp`} width={25} height={25} className="" alt={`${data.region} icon`} />
                </div>
                {data.region && <div className="absolute top-1 right-1 text-black">
                  <Image src={`/regions/${data.region}.webp`} width={25} height={25} className="" alt={`${data.region} icon`} />
                </div> }
                <Image
                  src={`/db/characters/UI_AvatarIcon_${data.fileName}.png`}
                  // src={data.images.mihoyo_icon}
                  width={200}
                  height={200}
                  alt="Image w-full"
                  className={`rounded-t-xl rounded-br-4xl object-cover bg-gradient-to-br ${data.rarity == 4 ? " from-gradient-purple-start  to-gradient-purple-end" : "from-gradient-yellow-start  to-gradient-yellow-end"}`}
                />
                <p className="text-center w-full h-full text-xs text-nowrap p-2 text-black relative font-bold rounded-b-xl after:absolute after:p-2 absolute:top-0 absolute:bg-red ">{data.name}</p>
              </Link>
            </div>
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
}
