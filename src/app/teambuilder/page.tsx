"use client"
import Image from "next/image";
import NavBar from "../components/NavBar";
import { addFileName, getRandomNumber } from "../utils/helper";
import axios from "axios";
import { useEffect, useLayoutEffect, useState } from "react"
import Loader from "../components/Loader";
import IconButtonSwitch from "../components/IconButtonSwitch";
import Footer from "../components/Footer";
import { motion } from "framer-motion"

export default function TeamBuilderPage() {

    const [characterData, setCharacterData] = useState<any[]>([]);
    const [activeElement, setActiveElement] = useState<number>(0);
    const [activeWeapon, setActiveWeapon] = useState<number>(0);
    const [activeCharacters, setActiveCharacters] = useState<any[]>([{}, {}, {}, {}, {}, {}, {}, {}]);
    const [activeElements, setActiveElements] = useState<any[]>(["", "", "", "", "", "", "", ""]);
    const [selectedSlot, setSelectedSlot] = useState<number>(0);
    const [secondTeam, setSecondTeam] = useState<boolean>(false);
    const [showBar, setShowBar] = useState<boolean>(true);
    useLayoutEffect(() => {
        axios
            .get<any[]>("https://genshin-db-api.vercel.app/api/v5/characters?query=names&matchCategories=true&verboseCategories=true")
            .then((res) => {
                let names = res.data.sort();
                names.forEach((name) => {
                    addFileName([name]);
                })
                setCharacterData(names);
            })
            .catch((error) => {
                console.error("Error fetching character names:", error);
            });
    }, []);

    const selectCharacter = (character: any, index?: number) => {
        let slot = selectedSlot;
        let element = "";
        element = character.elementText;
        setActiveCharacters(prevActiveCharacters => {
            const updatedCharacters = [...prevActiveCharacters];
            if (index != undefined) {
                updatedCharacters[index] = { ...character, active: true };
            } else {
                const updatedActiveElements = [...activeElements];
                updatedActiveElements[slot] = character.elementText;
                updatedCharacters[slot] = { ...character, active: true };
                setActiveElements(updatedActiveElements);
            }
            return updatedCharacters;
        });
        if (!secondTeam) setSelectedSlot(prevSlot => (prevSlot + 1) % 4);
        else setSelectedSlot(prevSlot => (prevSlot + 1) % 8);
        return element;
    };
    const [deletedChars, setDeletedChars] = useState<boolean>(false);
    const [availableCharacters, setAvailableCharacters] = useState<any[]>([]);
    const randomizeTeam = () => {
        let charactersAvailable;
        if (!deletedChars) {
            charactersAvailable = [...characterData];
            for (let x = 0; x < charactersAvailable.length - 1; x++) {
                if (charactersAvailable[x].name == "Aether" || charactersAvailable[x].name == "Lumine") {
                    charactersAvailable.splice(x, 1)
                }
            }
            setDeletedChars(true);
            setAvailableCharacters(charactersAvailable)
        } else {
            charactersAvailable = [...availableCharacters]
        }
        let i = 0;
        let count = 4;
        let elements = [];
        if (secondTeam) count = 8;
        for (i = 0; i < count; i++) {
            let number = Math.floor(getRandomNumber(0, charactersAvailable.length));
            let selectedCharacter = charactersAvailable[number];
            elements.push(selectCharacter(selectedCharacter, i));
            charactersAvailable.splice(number, 1);
        }
        setActiveElements(elements);
    }

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
            <NavBar active={3} />
            <main className="pt-8 md:pt-16 mb-20 w-full flex flex-col gap-4 items-center justify-center">
                <div className="flex flex-col gap-2 px-4 md:px-8 justify-center items-center max-w-screen-2xl w-full">
                    <div className="flex w-full justify-between items-center">
                        <h1 className="text-3xl text-primary">Team Builder</h1>
                        <div className="grid grid-cols-4 gap-2 md:fixed right-0 pt-20">
                            {activeElements.map((element, index) => {
                                if (element.length > 0) {
                                    return <div key={index}>
                                        <Image src={`/elements/${element}.webp`} width={50} height={50} className="" alt={`${element} icon`} title={element} />
                                    </div>
                                }
                                else {
                                    return <div key={index}>
                                    </div>
                                }
                            })}
                        </div>
                    </div>
                    <div className="flex gap-4 items-center">
                        <label className="flex gap-2 font-bold">
                            <input type="checkbox" checked={secondTeam} onChange={() => {
                                if (secondTeam) {
                                    setSecondTeam(!secondTeam)
                                    setActiveCharacters(prevCharacters => [...prevCharacters.slice(0, 4), {}, {}, {}, {}]);
                                    setActiveElements(prevElements => [...prevElements.slice(0, 4), "", "", "", ""]);
                                } else {
                                    setSecondTeam(!secondTeam)

                                }
                            }} />
                            Second Team
                        </label>
                        <button onClick={() => { randomizeTeam() }} className="border-2 p-1 hover:bg-bg-dark transition-all">Randomize Team</button>
                    </div>
                    <div className="max-w-7xl flex items-center w-full justify-center">
                        <div className="grid grid-cols-4 gap-4 md:gap-8 pt-8 h-full w-full">
                            {activeCharacters.length > 0 && activeCharacters.map((character: any, index: number) => {
                                if (!secondTeam) {
                                    if (index > 3) return
                                }
                                return <div key={index} className={`transition-all rounded-xl border-2 ${selectedSlot == index ? "border-primary" : "border-white"}`} onClick={() => setSelectedSlot(index)}>
                                    {character.active ? <div className={`${selectedSlot == index && "scale-110"} transition-transform p-2 md:p-4`} >
                                        <Image src={character.images.cover2} width={1000} height={1000} alt={character.name} title={character.name} className="w-full object-cover md:block hidden" draggable="false" />
                                        <Image src={`https://enka.network/ui/UI_AvatarIcon_${character.fileName}.png`} width={1000} height={1000} alt={character.name} title={character.name} className="md:hidden block w-full object-cover" draggable="false" />
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
                </div>

                <motion.div className="fixed bottom-28 md:bottom-0 w-full max-w-[100dvw] bg-bg-dark bg-opacity-70 pt-2 px-2 md:px-4" variants={{
                    visible: { y: "0" },
                    hidden: { y: "70%" },
                }}
                    animate={showBar ? "visible" : "hidden"}>
                    <div className="flex gap-3 justify-around flex-col md:flex-row relative">
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
                        <div className="absolute right-10 top-0 pb-20 p-2 cursor-pointer font-bold text-xl" onClick={() => { setShowBar(!showBar) }}>
                            {showBar ? "v" : "^"}
                        </div>
                    </div>
                    <section className="flex gap-6 overflow-y-hidden overflow-x-scroll p-4 w-full ">

                        {characterData.length > 0 ? characterData.map((character, index) => {

                            const elementConditions = [true, "Pyro", "Hydro", "Anemo", "Electro", "Dendro", "Cryo", "Geo"];
                            const weaponConditions = [true, "Bow", "Sword", "Polearm", "Claymore", "Catalyst"];

                            const validElement = activeElement === 0 || elementConditions[activeElement] === character.elementText;
                            const validWeapon = activeWeapon === 0 || weaponConditions[activeWeapon] === character.weaponText;
                            if (character.name == "Aether" || character.name == "Lumine") return //temp
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
                </motion.div>
                <div className="my-40">

                </div>
                {/* <Footer/> */}
            </main>
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
            removeCharacter(character); setActive(!active);
        } else {
            selectCharacter(character); setActive(!active);

        }
    }} className={`min-w-[5rem] md:min-w-[10rem] bg-[#e9e9e9] transition-all relative rounded-xl cursor-pointer ${active && "scale-105 shadow-light"} hover:scale-105 hover:shadow-light`}>
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
