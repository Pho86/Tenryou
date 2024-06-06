"use client"
import axios from "axios";
import IconButtonSwitch from "../IconButtonSwitch";
import { useState, useEffect, useRef } from "react";
import { Character } from "@/app/types/character";
import Loader from "../Loader";
import { getRandomNumber } from "@/app/utils/helper";
import Markdown from "../MarkdownComponent";
import TeamCharacterCard from "../CharacterCard/team";
import Image from "next/image";
export default function TeamBuilder({
    CharacterData
}: {
    CharacterData: Character[]

}) {
    const [activeElement, setActiveElement] = useState<number>(0);
    const [activeWeapon, setActiveWeapon] = useState<number>(0);
    const [mounted, setMounted] = useState<boolean>(false);
    const [activeElements, setActiveElements] = useState<string[]>(() => {
        if (typeof window !== "undefined") {
            const storedActiveElements = localStorage.getItem('activeElements');
            return storedActiveElements ? JSON.parse(storedActiveElements) : ["", "", "", "", "", "", "", ""];
        } else {
            return ["", "", "", "", "", "", "", ""];
        }
    });

    const [activeCharacters, setActiveCharacters] = useState<any[]>(() => {
        if (typeof window !== "undefined") {
            const storedActiveCharacters = localStorage.getItem('activeCharacters');
            return storedActiveCharacters ? JSON.parse(storedActiveCharacters) : [{}, {}, {}, {}, {}, {}, {}, {}, {}];
        } else {
            return [{}, {}, {}, {}, {}, {}, {}, {}, {}];
        }
    });
    
    const [selectedSlot, setSelectedSlot] = useState<number>(0);
    const [secondTeam, setSecondTeam] = useState<boolean>(false);
    const [showIcons, setShowIcons] = useState<boolean>(true);
    const [team1AILoading, setTeam1AILoading] = useState(false);
    const [team2AILoading, setTeam2AILoading] = useState(false);
    const [team1FinalizeLoading, setTeam1FinalizeLoading] = useState(false);
    const [team2FinalizeLoading, setTeam2FinalizeLoading] = useState(false);
    const [team1Recommendations, setTeam1Recommendations] = useState<any[]>([]);
    const [team2Recommendations, setTeam2Recommendations] = useState<any[]>([]);
    const [team1ErrorMessage, setTeam1ErrorMessage] = useState<string>("Please put 2 or more characters in the team (Slot 1/2).")
    const [team2ErrorMessage, setTeam2ErrorMessage] = useState<string>("Please put 2 or more characters in the team (Slot 5/6).")
    const [availableCharacters, setAvailableCharacters] = useState<Character[]>([]);
    const [deletedChars, setDeletedChars] = useState<boolean>(false);
    const [selectTeam, setSelectTeam] = useState<boolean>(true);
    
    useEffect(() => {
        setMounted(true);
    }, []);
    
    useEffect(() => {
        localStorage.setItem('activeElements', JSON.stringify(activeElements));
    }, [activeElements]);

    useEffect(() => {
        localStorage.setItem('activeCharacters', JSON.stringify(activeCharacters));
    }, [activeCharacters]);

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
            charactersAvailable = [...CharacterData];
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

    const clearTeam = () => {
        setActiveCharacters([{}, {}, {}, {}, {}, {}, {}, {}]);
        setActiveElements(["", "", "", "", "", "", "", ""]);
        setSelectedSlot(0);
        setTeam1Recommendations([])
        setTeam2Recommendations([])
    }

    const sendDataToAI = async (team: number) => {
        let isInvalid = false;
        switch (team) {
            case 1:
                if (Object.keys(activeCharacters[0]).length === 0 || Object.keys(activeCharacters[1]).length === 0) {
                    isInvalid = true;
                } else {
                    setTeam1AILoading(true);
                }
                break;
            case 2:
                if (Object.keys(activeCharacters[4]).length === 0 || Object.keys(activeCharacters[5]).length === 0) {
                    isInvalid = true;
                } else {
                    setTeam2AILoading(true);
                }
                break;
            default:
                console.error("Invalid team number");
                return;
        }
        if (isInvalid) {
            console.log("Required character slots are empty, aborting API call.");
            if (team === 1) {
                setTeam1FinalizeLoading(false);
                setTeam1AILoading(false);
            } else {
                setTeam2FinalizeLoading(false);
                setTeam2AILoading(false);
            }
            return;
        }

        try {
            let accumulatedData: any = [];
            let response;
            for (let part = 1; part <= 3; part++) {
                response = await axios.post("/api/teambuild/google", {
                    activeCharacters,
                    part,
                    currentInfo: accumulatedData,
                    team
                });
                const recommendedData = response.data;

                accumulatedData = [...accumulatedData, recommendedData];

                if (team === 1) {
                    setTeam1Recommendations([...accumulatedData]);
                    setTeam1AILoading(false);
                    setTeam1FinalizeLoading(true);
                } else {
                    setTeam2Recommendations([...accumulatedData]);
                    setTeam2AILoading(false);
                    setTeam2FinalizeLoading(true);
                }
            }
        } catch (err) {
            console.error(err);
        } finally {
            if (team === 1) {
                setTeam1FinalizeLoading(false);
            } else {
                setTeam2FinalizeLoading(false);
            }
        }
    };

    const dragCharacter = useRef<number>(0)
    const draggedOverCharacter = useRef<number>(0)

    function handleSort() {
        const activeCharactersClone = [...activeCharacters]
        const temp = activeCharactersClone[dragCharacter.current]
        activeCharactersClone[dragCharacter.current] = activeCharactersClone[draggedOverCharacter.current]
        activeCharactersClone[draggedOverCharacter.current] = temp
        setActiveCharacters(activeCharactersClone)
    }

    return (
        <>
            <div className="flex gap-3 justify-around flex-col md:flex-row">
                <div className="flex gap-3 justify-center flex-wrap">
                    <IconButtonSwitch name="Pyro" onClick={() => { setActiveElement(activeElement === 1 ? 0 : 1) }} type="elements" index={1} active={activeElement} />
                    <IconButtonSwitch name="Hydro" onClick={() => { setActiveElement(activeElement === 2 ? 0 : 2) }} type="elements" index={2} active={activeElement} />
                    <IconButtonSwitch name="Anemo" onClick={() => { setActiveElement(activeElement === 3 ? 0 : 3) }} type="elements" index={3} active={activeElement} />
                    <IconButtonSwitch name="Electro" onClick={() => { setActiveElement(activeElement === 4 ? 0 : 4) }} type="elements" index={4} active={activeElement} />
                    <IconButtonSwitch name="Dendro" onClick={() => { setActiveElement(activeElement === 5 ? 0 : 5) }} type="elements" index={5} active={activeElement} />
                    <IconButtonSwitch name="Cryo" onClick={() => { setActiveElement(activeElement === 6 ? 0 : 6) }} type="elements" index={6} active={activeElement} />
                    <IconButtonSwitch name="Geo" onClick={() => { setActiveElement(activeElement === 7 ? 0 : 7) }} type="elements" index={7} active={activeElement} />
                </div>
                <div className="flex gap-3 justify-center flex-wrap">
                    <IconButtonSwitch name="Bow" onClick={() => { setActiveWeapon(activeWeapon === 1 ? 0 : 1) }} index={1} active={activeWeapon} />
                    <IconButtonSwitch name="Sword" onClick={() => { setActiveWeapon(activeWeapon === 2 ? 0 : 2) }} index={2} active={activeWeapon} />
                    <IconButtonSwitch name="Polearm" onClick={() => { setActiveWeapon(activeWeapon === 3 ? 0 : 3) }} index={3} active={activeWeapon} />
                    <IconButtonSwitch name="Claymore" onClick={() => { setActiveWeapon(activeWeapon === 4 ? 0 : 4) }} index={4} active={activeWeapon} />
                    <IconButtonSwitch name="Catalyst" onClick={() => { setActiveWeapon(activeWeapon === 5 ? 0 : 5) }} index={5} active={activeWeapon} />
                </div>
            </div>
            <div className="grid lg:grid-cols-2 w-full max-w-screen-2xl ">
                <section className="grid-auto-fit-100 w-full p-4 max-h-[100dvh] overflow-y-scroll py-2 order-1">
                    {mounted ? CharacterData.map((character: Character, index: number) => {
                        const elementConditions = [true, "Pyro", "Hydro", "Anemo", "Electro", "Dendro", "Cryo", "Geo"];
                        const weaponConditions = [true, "Bow", "Sword", "Polearm", "Claymore", "Catalyst"];
                        const validElement = activeElement === 0 || elementConditions[activeElement] === character.elementText;
                        const validWeapon = activeWeapon === 0 || weaponConditions[activeWeapon] === character.weaponText;
                        if (character.name == "Aether" || character.name == "Lumine") return //temp
                        if (validWeapon && validElement) return <TeamCharacterCard
                            key={index}
                            index={index}
                            character={character}
                            selectCharacter={selectCharacter}
                            removeCharacter={removeCharacter}
                            activeProp={() => {
                                const count = activeCharacters.filter(item => item.name === character.name).length;
                                return count === 1;
                            }}
                        />
                    }) :
                        <div className="col-span-full">
                            <Loader />
                        </div>
                    }
                </section>

                <section className="w-full flex flex-col gap-4 p-4 order-0 lg:order-1">
                    <div className="flex gap-4 items-center">
                        <button onClick={() => { randomizeTeam() }} className="border-2 p-1 px-2 hover:bg-bg-dark transition-all rounded-xl">Randomize Team</button>
                        <button onClick={() => { clearTeam() }} className="border-2 p-1 px-2 hover:bg-bg-dark transition-all rounded-xl">Clear Team</button>
                        {/* <button onClick={() => { setShowIcons(!showIcons) }} className="border-2 p-1 px-2 hover:bg-bg-dark transition-all rounded-xl">{showIcons ? "Expand Imgs" : "Collapse Imgs"}</button> */}
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
                    <div className="">
                        <div className="grid grid-cols-4 gap-2 md:gap-4 h-full w-full">
                            {mounted ? activeCharacters.map((character: any, index: number) => {
                                if (!secondTeam) {
                                    if (index > 3) return
                                }
                                return <div key={index} className={`rounded-xl cursor-move overflow-hidden transition-shadow ${!character.active && "border-2"} ${selectedSlot == index && "scale-105 shadow-light"}`}
                                    onClick={() => setSelectedSlot(index)}
                                    draggable
                                    onDragStart={() => (dragCharacter.current = index)}
                                    onDragEnter={() => (draggedOverCharacter.current = index)}
                                    onDragEnd={handleSort}
                                    onDragOver={(e) => e.preventDefault()}
                                >
                                    {character.active ? <div className={` hover:scale-100 relative`} >
                                        <Image src={`https://enka.network/ui/UI_AvatarIcon_${character.fileName}.png`} width={1000} height={1000} alt="" draggable="false" className={`w-full object-cover bg-gradient-to-br ${character.rarity == 4 ? " from-gradient-SR-start  to-gradient-SR-end" : "from-gradient-SSR-start  to-gradient-SSR-end"}`} />
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

                            }) :
                                <>
                                    {Array.from({ length: 4 }).map((_:any, index:number) => {
                                        return (
                                            <div
                                                key={index}
                                                className={`rounded-xl cursor-move overflow-hidden transition-shadow border-2 ${selectedSlot == index && "scale-105 shadow-light"}`}
                                            >
                                                <div className="w-full h-full flex items-center justify-center font-bold text-7xl relative">
                                                    <Image
                                                        src="/elements/None.png"
                                                        alt="placeholder empty image"
                                                        height={256}
                                                        width={256}
                                                        className=""
                                                    />
                                                    <p className="absolute">+</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </>

                            }
                        </div>
                    </div>
                    {!secondTeam ?
                        <>
                            <button className="border-2 p-2 rounded-xl hover:bg-bg-dark transition-all" onClick={() => { sendDataToAI(1); }} disabled={team1AILoading}>{team1AILoading ? "Loading..." : "Build Recommendations"}</button>
                            <div className="flex flex-col gap-2 max-h-[70dvh] overflow-y-scroll bg-bg-light p-4 rounded-xl text-pretty" >
                                {team1AILoading ? <Loader />
                                    :
                                    <>
                                        {team1Recommendations.length > 0 ?
                                            <>
                                                {team1Recommendations.map((rec, index) => (
                                                    <Markdown content={rec} key={index} />
                                                ))}
                                            </>
                                            :
                                            <>
                                                {team1ErrorMessage}
                                            </>
                                        }
                                    </>
                                }
                                {team1FinalizeLoading && <Loader />}
                            </div>
                        </> :
                        <>
                            <div className="flex gap-2">
                                {selectTeam ?
                                    <button className="border-2 p-2 rounded-xl hover:bg-bg-dark transition-all" onClick={() => { sendDataToAI(1); }} disabled={team1AILoading}>{team1AILoading ? "Loading..." : "Build Team 1"}</button>
                                    :
                                    <button className="border-2 p-2 rounded-xl hover:bg-bg-dark transition-all" onClick={() => { sendDataToAI(2); }} disabled={team2AILoading}>{team2AILoading ? "Loading..." : "Build Team 2"}</button>
                                }
                                <label className="flex gap-2 font-bold items-center">
                                    <input type="checkbox" checked={selectTeam} onChange={() => { setSelectTeam(!selectTeam) }} />
                                    Build Team 1
                                </label>
                            </div>
                            <div className="flex flex-col gap-2 max-h-[70dvh] overflow-y-scroll bg-bg-light p-4 rounded-xl text-pretty" >
                                {selectTeam ?
                                    <>
                                        {team1AILoading ? <Loader />
                                            :
                                            <>
                                                {team1Recommendations.length > 0 ?
                                                    <>
                                                        {team1Recommendations.map((rec, index) => (
                                                            <Markdown content={rec} key={index} />
                                                        ))}
                                                    </>
                                                    :
                                                    <>
                                                        {team1ErrorMessage}
                                                    </>
                                                }
                                            </>
                                        }
                                        {team1FinalizeLoading && <Loader />}
                                    </>
                                    :
                                    <>
                                        {team2AILoading ? <Loader />
                                            :
                                            <>
                                                {team2Recommendations.length > 0 ?
                                                    <>
                                                        {team2Recommendations.map((rec, index) => (
                                                            <Markdown content={rec} key={index} />
                                                        ))}
                                                    </>
                                                    :
                                                    <>
                                                        {team2ErrorMessage}
                                                    </>
                                                }
                                            </>
                                        }
                                        {team2FinalizeLoading && <Loader />}
                                    </>
                                }
                            </div>
                        </>
                    }
                </section >
            </div >
        </>
    )
}


