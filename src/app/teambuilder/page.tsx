"use client"
import Image from "next/image";
import { addFileName, getRandomNumber } from "../utils/helper";
import axios from "axios";
import { useEffect, useLayoutEffect, useState } from "react"
import Loader from "../components/Loader";
import IconButtonSwitch from "../components/IconButtonSwitch";
import { Character } from "@/app/types/character";
export default function TeamBuilderPage() {
    const [characterData, setCharacterData] = useState<Character[]>([]);
    const [activeElement, setActiveElement] = useState<number>(0);
    const [activeWeapon, setActiveWeapon] = useState<number>(0);
    const [activeCharacters, setActiveCharacters] = useState<any[]>([{}, {}, {}, {}, {}, {}, {}, {}]);
    const [activeElements, setActiveElements] = useState<any[]>(["", "", "", "", "", "", "", ""]);
    const [selectedSlot, setSelectedSlot] = useState<number>(0);
    const [secondTeam, setSecondTeam] = useState<boolean>(true);
    const [showIcons, setShowIcons] = useState<boolean>(true);
    const [owned, setOwned] = useState<any[]>([]);
    useLayoutEffect(() => {
        const storedData = sessionStorage.getItem('characterData');
        if (storedData) {
            setCharacterData(JSON.parse(storedData));
        } else {
            axios
                .get<Character[]>('https://genshin-db-api.vercel.app/api/v5/characters?query=names&matchCategories=true&verboseCategories=true')
                .then((res) => {
                    const names = res.data.sort();
                    names.forEach((name) => {
                        addFileName([name]);
                    });
                    setCharacterData(names);
                    sessionStorage.setItem('characterData', JSON.stringify(names));
                })
                .catch((error) => {
                    console.error('Error fetching character names:', error);
                });
        }
    }, []);

    const selectCharacter = (character: Character, index?: number) => {
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
    const [availableCharacters, setAvailableCharacters] = useState<Character[]>([]);
    const [deletedChars, setDeletedChars] = useState<boolean>(false);
    const removeCharacter = (character: Character) => {
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


    return (
        <>
            <div className="flex flex-col gap-2 max-w-screen-2xl w-full">
                <h1 className="text-3xl text-primary">Team Builder (WIP)</h1>
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
            <div className="grid lg:grid-cols-2 w-full max-w-screen-2xl ">
                <section className="grid-auto-fit-200 w-full p-4 max-h-[100dvh] overflow-y-scroll py-2 order-1">
                    {characterData.length > 0 ? characterData.map((character: Character, index: number) => {
                        const elementConditions = [true, "Pyro", "Hydro", "Anemo", "Electro", "Dendro", "Cryo", "Geo"];
                        const weaponConditions = [true, "Bow", "Sword", "Polearm", "Claymore", "Catalyst"];
                        const validElement = activeElement === 0 || elementConditions[activeElement] === character.elementText;
                        const validWeapon = activeWeapon === 0 || weaponConditions[activeWeapon] === character.weaponText;
                        if (character.name == "Aether" || character.name == "Lumine") return //temp
                        if (validWeapon && validElement) return <CharacterCard activeProp={() => {
                            const count = activeCharacters.filter(item => item.name === character.name).length;
                            return count === 1;
                        }} character={character} key={index} index={index} removeCharacter={() => { removeCharacter(character) }} selectCharacter={() => { selectCharacter(character) }} />
                    })
                        :
                        <div className="w-full col-span-6 md:col-span-full">
                            <Loader />
                        </div>
                    }
                </section>
                {characterData.length > 0 ?
                    <section className="w-full flex flex-col gap-4 p-4 order-0 lg:order-1">
                        <div className="flex gap-4 items-center">
                            <button onClick={() => { randomizeTeam() }} className="border-2 p-1 px-2 hover:bg-bg-dark transition-all rounded-xl">Randomize Team</button>
                            <button onClick={() => { setShowIcons(!showIcons) }} className="border-2 p-1 px-2 hover:bg-bg-dark transition-all rounded-xl">{showIcons ? "Expand Imgs" : "Collapse Imgs"}</button>
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

                        </div>
                        <div className="max-w-7xl flex items-center w-full justify-center">

                            <div className="grid grid-cols-4 gap-4 md:gap-8 h-full w-full">
                                {activeCharacters.length > 0 && activeCharacters.map((character: any, index: number) => {
                                    if (!secondTeam) {
                                        if (index > 3) return
                                    }
                                    return <div key={index} className={`transition-all overflow-hidden h-max rounded-xl ${!character.active && "border-2"} ${selectedSlot == index && "scale-105 shadow-light "} hover:shadow-light`} onClick={() => setSelectedSlot(index)}>
                                        {character.active ? <div className={` transition-transform `} >
                                            <> {showIcons ?
                                                <Image src={`https://enka.network/ui/UI_AvatarIcon_${character.fileName}.png`} width={1000} height={1000} alt={character.name} title={character.name} className={`w-full object-cover bg-gradient-to-br ${character.rarity == 4 ? " from-gradient-SR-start  to-gradient-SR-end" : "from-gradient-SSR-start  to-gradient-SSR-end"}`} draggable="false" />
                                                :
                                                <Image src={character.images.cover2} width={1000} height={1000} alt={character.name} title={character.name} className={`w-full object-cover bg-gradient-to-br ${character.rarity == 4 ? " from-gradient-SR-start  to-gradient-SR-end" : "from-gradient-SSR-start  to-gradient-SSR-end"}`} draggable="false" />
                                            }
                                            </>
                                        </div>
                                            :
                                            <div className={`w-full h-full flex items-center justify-center font-bold text-7xl relative`}>
                                                <Image src={"/elements/None.png"} alt="placeholder empty image" height={256} width={256} className="" />
                                                <p className="absolute">
                                                    +
                                                </p>
                                            </div>
                                        }
                                    </div>
                                })}

                            </div>
                        </div>
                        <div className="grid grid-cols-4 gap-2 max-w-64">
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
                    </section>
                    :
                    <Loader />
                }
            </div>
        </>
    );
}

function CharacterCard({ character, selectCharacter, removeCharacter, activeProp }: { character: Character, index: number, selectCharacter: (char: any) => void, removeCharacter: (char: any) => void, activeProp: () => boolean; }) {
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
    }} className={`min-w-[6rem] md:min-w-[8rem] bg-[#e9e9e9] transition-all relative rounded-xl cursor-pointer ${active && "scale-105 shadow-light"} hover:scale-105 hover:shadow-light`}>
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
