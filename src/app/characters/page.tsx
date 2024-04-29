"use client"
import Image from "next/image";
import NavBar from "../components/NavBar";
import { capitalizeFirstLetter, lowerCaseEachLetter, addFileName } from "../utils/helper";
import axios from "axios";
import { useEffect, useLayoutEffect, useState } from "react"
import Link from "next/link";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import IconButtonSwitch from "../components/IconButtonSwitch";

export default function CharacterPage() {

  const [fullData, setFullData] = useState<any[]>([]);
  const [activeElement, setActiveElement] = useState<number>(0)
  const [activeWeapon, setActiveWeapon] = useState<number>(0)
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
      <main className="pt-16 px-8 mb-20 w-full min-h-[100dvh] flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl text-primary">Characters List</h1>
          <div className="flex gap-3 justify-around flex-col md:flex-row">
            <div className="flex gap-3 justify-center ">
              <IconButtonSwitch name="Pyro" onClick={() => { setActiveElement(activeElement === 1 ? 0 : 1) }} type="elements" index={1} active={activeElement} />
              <IconButtonSwitch name="Hydro" onClick={() => { setActiveElement(activeElement === 2 ? 0 : 2) }} type="elements" index={2} active={activeElement} />
              <IconButtonSwitch name="Anemo" onClick={() => { setActiveElement(activeElement === 3 ? 0 : 3) }} type="elements" index={3} active={activeElement} />
              <IconButtonSwitch name="Electro" onClick={() => { setActiveElement(activeElement === 4 ? 0 : 4) }} type="elements" index={4} active={activeElement} />
              <IconButtonSwitch name="Dendro" onClick={() => { setActiveElement(activeElement === 5 ? 0 : 5) }} type="elements" index={5} active={activeElement} />
              <IconButtonSwitch name="Cryo" onClick={() => { setActiveElement(activeElement === 6 ? 0 : 6) }} type="elements" index={6} active={activeElement} />
              <IconButtonSwitch name="Geo" onClick={() => { setActiveElement(activeElement === 7 ? 0 : 7) }} type="elements" index={7} active={activeElement} />
            </div>
            <div className="flex gap-3 justify-center">
              <IconButtonSwitch name="Bow" onClick={() => { setActiveWeapon(activeWeapon === 1 ? 0 : 1) }} index={1} active={activeWeapon} />
              <IconButtonSwitch name="Sword" onClick={() => { setActiveWeapon(activeWeapon === 2 ? 0 : 2) }} index={2} active={activeWeapon} />
              <IconButtonSwitch name="Polearm" onClick={() => { setActiveWeapon(activeWeapon === 3 ? 0 : 3) }} index={3} active={activeWeapon} />
              <IconButtonSwitch name="Claymore" onClick={() => { setActiveWeapon(activeWeapon === 4 ? 0 : 4) }} index={4} active={activeWeapon} />
              <IconButtonSwitch name="Catalyst" onClick={() => { setActiveWeapon(activeWeapon === 5 ? 0 : 5) }} index={5} active={activeWeapon} />
            </div>
          </div>
        </div>
        <section className="grid-auto-fit-300 w-full">

          {fullData.length > 0 ? fullData.map((data, index) => {
            const elementConditions = [true, "Pyro", "Hydro", "Anemo", "Electro", "Dendro", "Cryo", "Geo"];
            const weaponConditions = [true, "Bow", "Sword", "Polearm", "Claymore", "Catalyst"];

            const validElement = activeElement === 0 || elementConditions[activeElement] === data.elementText;
            const validWeapon = activeWeapon === 0 || weaponConditions[activeWeapon] === data.weaponText;

            if (validWeapon && validElement) return <div key={index} className="bg-[#e9e9e9] transition-all relative rounded-xl cursor-pointer hover:scale-105 hover:shadow-light">
              <Link href={`/characters/${data.name}`} className={`flex flex-col self-start  `}>
                <div className="absolute top-1 left-1 text-black">
                  <Image src={`/elements/${data.elementText}.webp`} width={25} height={25} className="" alt={`${data.region} icon`} />
                </div>
                {data.region && <div className="absolute top-1 right-1 text-black">
                  <Image src={`/regions/${data.region}.webp`} width={25} height={25} className="" alt={`${data.region} icon`} />
                </div>}
                <Image
                  // src={`https://upload-os-bbs.mihoyo.com/game_record/genshin/character_icon/UI_AvatarIcon_${data.fileName}.png`}
                  // src={data.images.mihoyo_icon}
                  src={`https://api.ambr.top/assets/UI/UI_AvatarIcon_${data.fileName}.png`}
                  // onError={(event:any)=>{event.target.src = `https://enka.network/ui/UI_AvatarIcon_${data.fileName}.png`}}
                  // src={`/db/characters/UI_AvatarIcon_${data.fileName}.png`}
                  width={200}
                  height={200}
                  alt="Image w-full"
                  className={`rounded-t-xl rounded-br-4xl object-cover bg-gradient-to-br ${data.rarity == 4 ? " from-gradient-purple-start  to-gradient-purple-end" : "from-gradient-yellow-start  to-gradient-yellow-end"}`}
                />
                <p className="text-center w-full h-full text-xs text-nowrap p-2 text-black relative font-bold rounded-b-xl after:absolute after:p-2 absolute:top-0 absolute:bg-red ">{data.name}</p>
              </Link>
            </div>
          })
            :
            <div className="w-full col-span-6 md:col-span-full">
              <Loader />
            </div>
          }
        </section>
      </main>
      <Footer />
    </>
  );
}
