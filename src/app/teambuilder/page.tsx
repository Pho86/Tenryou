"use client"
import Image from "next/image";
import NavBar from "../components/NavBar";
import { addFileName } from "../utils/helper";
import axios from "axios";
import { useEffect, useLayoutEffect, useState } from "react"
import Loader from "../components/Loader";
import IconButtonSwitch from "../components/IconButtonSwitch";

export default function TeamBuilderPage() {

    const [fullData, setFullData] = useState<any[]>([]);
    const [activeElement, setActiveElement] = useState<number>(0);
    const [activeWeapon, setActiveWeapon] = useState<number>(0);
    const [activeCharacters, setActiveCharacters] = useState<any[]>([{}, {}, {}, {}]);
    const [activeElements, setActiveElements] = useState<any[]>(["", "", "", ""]);
    const [selectedSlot, setSelectedSlot] = useState<number>(0);
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

    const selectCharacter = (character: any) => {
        setActiveCharacters(prevActiveCharacters => {
            const updatedCharacters = [...prevActiveCharacters];
            const updatedActiveElements = [...activeElements];
            updatedCharacters[selectedSlot] = { ...character, active: true };

            updatedActiveElements[selectedSlot] = character.elementText;

            setActiveElements(updatedActiveElements);

            return updatedCharacters;
        });
        setSelectedSlot(prevSlot => (prevSlot + 1) % 4);
    };

    const removeCharacter = (character: any) => {
        const updatedCharacters = activeCharacters.map((item, i) => {
            if (item.name === character.name) {
                setActiveElements(prevActiveElements => {
                    const updatedActiveElements = [...prevActiveElements];
                    updatedActiveElements[i] = "";
                    return updatedActiveElements;
                });
                return {};
            }
            return item;
        });
        setActiveCharacters(updatedCharacters);
    };

    return (
        <>
            <NavBar />
            <main className="pt-16 px-4 md:px-8 mb-20 w-full flex flex-col gap-4">
                <div className="flex flex-col gap-2 ">
                    <div className="flex w-full justify-between items-center">
                        <h1 className="text-3xl text-primary">Team Builder</h1>
                        <div className="grid grid-cols-4 gap-2">
                            {activeElements.map((element, index) => {
                                if (element.length > 0) return <div key={index}>
                                    <Image src={`/elements/${element}.webp`} width={50} height={50} className="" alt={`${element} icon`} title={element} />
                                </div>
                            })}
                        </div>
                    </div>
                    <div className=" md:h-[60dvh]">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 h-full">
                            {activeCharacters.length > 0 && activeCharacters.map((character: any, index: number) => {
                                return <div key={index} className={`h-full transition-all rounded-xl border-2 ${selectedSlot == index ? "border-primary" : "border-white"}`} onClick={() => setSelectedSlot(index)}>
                                    {character.active ? <div className={`${selectedSlot == index && "scale-110 "} transition-all p-8`} >
                                        <Image src={character.images.cover2} width={1000} height={1000} alt={character.name} title={character.name} className="w-full object-cover" draggable="false" />
                                    </div>
                                        :
                                        <div className={`w-full h-full flex items-center justify-center font-bold text-7xl`}>
                                            +
                                        </div>
                                    }
                                </div>
                            })}

                        </div>
                    </div>
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

                <section className="flex gap-6 overflow-y-hidden overflow-x-scroll p-4 w-full">
                    {fullData.length > 0 ? fullData.map((character, index) => {

                        const elementConditions = [true, "Pyro", "Hydro", "Anemo", "Electro", "Dendro", "Cryo", "Geo"];
                        const weaponConditions = [true, "Bow", "Sword", "Polearm", "Claymore", "Catalyst"];

                        const validElement = activeElement === 0 || elementConditions[activeElement] === character.elementText;
                        const validWeapon = activeWeapon === 0 || weaponConditions[activeWeapon] === character.weaponText;
                        if (validWeapon && validElement) return <CharacterCard activeProp={() => {
                            const count = activeCharacters.filter(item => item.name === character.name).length;
                            return count === 1;
                        }}
                            character={character} key={index} index={index} removeCharacter={() => { removeCharacter(character) }} selectCharacter={() => { selectCharacter(character) }} />
                    })
                        :
                        <div className="w-full col-span-6 md:col-span-full">
                            <Loader />
                        </div>
                    }
                </section>
            </main>
            {/* <Footer /> */}
        </>
    );
}

function CharacterCard({ character, selectCharacter, removeCharacter, activeProp }: { character: any, index: number, selectCharacter: (char: any) => void, removeCharacter: (char: any) => void, activeProp: () => boolean; }) {
    const [active, setActive] = useState<boolean>(activeProp);
    useEffect(() => {
        setActive(activeProp());
    }, [activeProp])

    return <div onClick={() => {
        if (active) {
            setActive(!active); removeCharacter(character);
        } else {
            setActive(!active); selectCharacter(character);

        }
    }} className={`min-w-[6rem] md:min-w-[10rem] bg-[#e9e9e9] transition-all relative rounded-xl cursor-pointer ${active && "scale-105 shadow-light"} hover:scale-105 hover:shadow-light`}>
        <div className={`flex flex-col self-start `}>
            <div className="absolute top-1 left-1 text-black">
                <Image src={`/elements/${character.elementText}.webp`} width={25} height={25} className="" alt={`${character.element} icon`} />
            </div>
            {character.region && <div className="absolute top-1 right-1 text-black">
                <Image src={`/regions/${character.region}.webp`} width={25} height={25} className="" alt={`${character.region} icon`} />
            </div>}
            <Image
                src={`https://enka.network/ui/UI_AvatarIcon_${character.fileName}.png`}
                width={200}
                height={200}
                alt={`${character.name}`}
                title={`${character.name}`}
                className={`rounded-t-xl rounded-br-4xl object-cover bg-gradient-to-br ${character.rarity == 4 ? " from-gradient-SR-start  to-gradient-SR-end" : "from-gradient-SSR-start  to-gradient-SSR-end"}`}
            />
            <p className="text-center w-full text-xs p-2 text-black relative font-bold rounded-b-xl ">{character.name}</p>
        </div>
    </div>
}
