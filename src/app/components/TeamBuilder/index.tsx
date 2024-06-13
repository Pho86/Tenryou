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

    const [activeCharacters, setActiveCharacters] = useState<any[]>(() => {
        if (typeof window !== "undefined") {
            const storedActiveCharacters = localStorage.getItem('activeCharacters');
            return storedActiveCharacters ? JSON.parse(storedActiveCharacters) : [{}, {}, {}, {}, {}, {}, {}, {}, {}];
        } else {
            return [{}, {}, {}, {}, {}, {}, {}, {}, {}];
        }
    });

    const [ownedCharacters, setOwnedCharacters] = useState<any[]>(() => {
        if (typeof window !== "undefined") {
            const storedActiveCharacters = localStorage.getItem('ownedCharacters');
            return storedActiveCharacters ? JSON.parse(storedActiveCharacters) : [];
        } else {
            return [];
        }
    });

    const [selectedOwned, setSelectedOwned] = useState<boolean>(false);
    const [selectedSlot, setSelectedSlot] = useState<number>(0);
    const [secondTeam, setSecondTeam] = useState<boolean>(false);
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
        localStorage.setItem('activeCharacters', JSON.stringify(activeCharacters));
    }, [activeCharacters]);

    const selectCharacter = (character: Character, index?: number) => {
        let slot = selectedSlot;
        setActiveCharacters(prevActiveCharacters => {
            const updatedCharacters = [...prevActiveCharacters];
            if (index != undefined) {
                updatedCharacters[index] = { ...character, active: true };
            } else {
                updatedCharacters[slot] = { ...character, active: true };
            }
            return updatedCharacters;
        });
        if (!secondTeam) setSelectedSlot(prevSlot => (prevSlot + 1) % 4);
        else setSelectedSlot(prevSlot => (prevSlot + 1) % 8);
        return character
    };

    const removeCharacter = (character: Character) => {
        const updatedCharacters = activeCharacters.map(item => {
            if (typeof item.name === 'string' && item.name.startsWith("Traveller") || item.name === character.name) {
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
            charactersAvailable = charactersAvailable.filter(character => character.name !== "Aether" && character.name !== "Lumine");
            setDeletedChars(true);
            setAvailableCharacters(charactersAvailable);
        } else {
            charactersAvailable = selectedOwned ? [...ownedCharacters] : [...availableCharacters];
        }

        let count = secondTeam ? 8 : 4;
        count = Math.min(count, charactersAvailable.length);

        let selectedCharacters = [];
        for (let i = 0; i < count; i++) {
            let number = Math.floor(getRandomNumber(0, charactersAvailable.length));
            let selectedCharacter = charactersAvailable[number];
            selectedCharacters.push(selectedCharacter);
            charactersAvailable.splice(number, 1);
        }

        let activeCharacters = new Array(secondTeam ? 8 : 4).fill(null);
        for (let i = 0; i < selectedCharacters.length; i++) {
            activeCharacters[i] = { ...selectedCharacters[i], active: true };
        }

        for (let i = selectedCharacters.length; i < activeCharacters.length; i++) {
            activeCharacters[i] = {};
        }

        setActiveCharacters(activeCharacters);
    };


    const clearTeam = () => {
        setActiveCharacters([{}, {}, {}, {}, {}, {}, {}, {}]);
        setSelectedSlot(0);
        setTeam1Recommendations([])
        setTeam2Recommendations([])
    }

    const handleSort = () => {
        const activeCharactersClone = [...activeCharacters]
        const temp = activeCharactersClone[dragCharacter.current]
        activeCharactersClone[dragCharacter.current] = activeCharactersClone[draggedOverCharacter.current]
        activeCharactersClone[draggedOverCharacter.current] = temp
        setActiveCharacters(activeCharactersClone)
    }

    const handleOwnedClick = (character: Character) => {
        const isOwned = ownedCharacters.some(c => c.name === character.name);
        let updatedOwnedCharacters;
        if (isOwned) {
            updatedOwnedCharacters = ownedCharacters.filter(c => c.name !== character.name);
        } else {
            updatedOwnedCharacters = [...ownedCharacters, character];
        }
        setOwnedCharacters(updatedOwnedCharacters);
        localStorage.setItem('ownedCharacters', JSON.stringify(updatedOwnedCharacters));
    };

    const recommendTeam = async (team: number) => {
        let isInvalid = false;
        if (team == 1) {
            setTeam1AILoading(true);
        } else {
            setTeam2AILoading(true);
        }
        if (secondTeam) {
            if (ownedCharacters.length < 8) {
                isInvalid = true;
            }
        }
        else {
            if (ownedCharacters.length < 4) {
                isInvalid = true;
            }
        }
        if (isInvalid) {
            if (team === 1) {
                setTeam1FinalizeLoading(false);
                setTeam1AILoading(false);
            } else {
                setTeam2FinalizeLoading(false);
                setTeam2AILoading(false);
            }
        }
        if (isInvalid) {
            setTeam1ErrorMessage("Please select more than 4 owned characters")
            setTeam2ErrorMessage("Please select more than 8 owned characters")
            return;
        }
        try {
            if (team === 1) {
                setActiveCharacters([...Array(4).fill({}), ...activeCharacters.slice(4)]);
            } else if (team === 2) {
                setActiveCharacters([...activeCharacters.slice(0, -4), ...Array(4).fill({})]);
            }

            let accumulatedData: any = [];
            let response;

            let copiedOwnedCharacters = [...ownedCharacters];
            copiedOwnedCharacters = copiedOwnedCharacters.filter(character =>
                !activeCharacters.some(activeCharacter =>
                    activeCharacter.fileName === character.fileName
                )
            );

            for (let part = 1; part <= 4; part++) {
                response = await axios.post("/api/teamrec/google", {
                    ownedCharacters: copiedOwnedCharacters,
                    part,
                    currentInfo: accumulatedData,
                    team,
                });

                const recommendedData = response.data;
                accumulatedData = [...accumulatedData, recommendedData];

                if (part == 1) {
                    const namesArray = recommendedData.trim().split(", ");
                    console.log(namesArray)
                    let startIndex = 0;
                    let endIndex = 0;
                    if (team === 1) {
                        startIndex = 0;
                        endIndex = Math.min(4, namesArray.length);
                    } else if (team === 2) {
                        startIndex = 4;
                        endIndex = Math.min(8);
                    }

                    for (let i = startIndex; i < endIndex; i++) {
                        const nameToSearch = namesArray[i - startIndex];
                        const character = CharacterData.find(character => {
                            if(nameToSearch.toLowerCase().startsWith("traveller")) {
                                return character.name.toLowerCase().includes(nameToSearch.toLowerCase())
                            } else {
                                return character.fileName.toLowerCase().includes(nameToSearch.toLowerCase())
                            }
                        }
                        );
                        if (character) {
                            selectCharacter(character, i);
                        } else {
                            console.log(`Error for character: ${nameToSearch}`);
                        }
                    }
                } else {
                    if (team === 1) {
                        setTeam1Recommendations([...accumulatedData.slice(1)]);
                        setTeam1AILoading(false);
                        setTeam1FinalizeLoading(true);
                    } else {
                        setTeam2Recommendations([...accumulatedData.slice(1)]);
                        setTeam2AILoading(false);
                        setTeam2FinalizeLoading(true);
                    }
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
    }
    const createBuilds = async (team: number) => {
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
                setTeam1ErrorMessage("Please put 2 or more characters in the team (Slot 1/2).")
                setTeam1FinalizeLoading(false);
                setTeam1AILoading(false);
            } else {
                setTeam2ErrorMessage("Please put 2 or more characters in the team (Slot 5/6).")
                setTeam2FinalizeLoading(false);
                setTeam2AILoading(false);
            }
            return;
        }
        if (isInvalid) return
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
                        if (character.name == "Aether" || character.name == "Lumine") return null
                        if (validWeapon && validElement) return <TeamCharacterCard
                            key={index}
                            index={index}
                            character={character}
                            selectCharacter={selectCharacter}
                            removeCharacter={removeCharacter}
                            selectOwned={handleOwnedClick}
                            traveller={character.name.startsWith("Traveller")}
                            activeProp={() => {
                                let travellerActive = 0
                                if (character.name.startsWith("Traveller")) {
                                    travellerActive = activeCharacters.filter(item => typeof item.name === 'string' && item.name.startsWith("Traveller")).length;
                                }
                                const isCurrentActive = activeCharacters.some(item => item.name === character.name);
                                return travellerActive > 0 || isCurrentActive;
                            }}
                            ownedOption={selectedOwned}
                            ownedCharacters={ownedCharacters}
                        />
                    }) :
                        <div className="col-span-full">
                            <Loader />
                        </div>
                    }
                </section>

                <section className="w-full flex flex-col gap-4 p-4 order-0 lg:order-1">
                    <div className="flex gap-4 items-center flex-wrap">
                        <button onClick={() => {
                            if (selectedOwned) {
                                setTeam1ErrorMessage("Please put 2 or more characters in the team (Slot 1/2).")
                                setTeam2ErrorMessage("Please put 2 or more characters in the team (Slot 5/6).")
                            } else {
                                setTeam1ErrorMessage("Please select more than 4 owned characters")
                                setTeam2ErrorMessage("Please select more than 8 owned characters")
                            }
                            setSelectedOwned(!selectedOwned)
                        }} className={`border-2 p-1 px-2 hover:bg-bg-dark transition-all rounded-xl ${selectedOwned ? "border-primary bg-bg-dark" : "border-2"}`}>{selectedOwned ? "Toggle Owned Characters" : "Select Characters Manually"}</button>
                        <button onClick={() => { randomizeTeam() }} className="border-2 p-1 px-2 hover:bg-bg-dark transition-all rounded-xl">Randomize Team</button>
                        <button onClick={() => { clearTeam() }} className="border-2 p-1 px-2 hover:bg-bg-dark transition-all rounded-xl">Clear Team</button>
                        <label className="flex gap-2 font-bold">
                            <input type="checkbox" checked={secondTeam} onChange={() => {
                                if (secondTeam) {
                                    setSecondTeam(!secondTeam)
                                    setActiveCharacters(prevCharacters => [...prevCharacters.slice(0, 4), {}, {}, {}, {}]);
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
                                    if (index > 3) return null
                                }

                                return <div key={index} className={`rounded-xl cursor-move overflow-hidden transition-shadow ${!character.active && "border-2"} ${selectedSlot == index && "scale-[103%] shadow-light"}`}
                                    onClick={() => setSelectedSlot(index)}
                                    draggable
                                    onDragStart={() => (dragCharacter.current = index)}
                                    onDragEnter={() => (draggedOverCharacter.current = index)}
                                    onDragEnd={handleSort}
                                    onDragOver={(e) => e.preventDefault()}
                                >
                                    {character.active ? <div className={` hover:scale-100 relative`} >
                                        {character.name.startsWith("Traveller") ?
                                            <Image src={`/characters/travellers.webp`} width={1000} height={1000} alt="" draggable="false" className={`w-full object-cover bg-gradient-to-br ${character.rarity == 4 ? " from-gradient-SR-start  to-gradient-SR-end" : "from-gradient-SSR-start  to-gradient-SSR-end"} relative`} />
                                            :
                                            <Image src={`https://enka.network/ui/UI_AvatarIcon_${character.fileName}.png`} width={1000} height={1000} alt="" draggable="false" className={`w-full object-cover bg-gradient-to-br ${character.rarity == 4 ? " from-gradient-SR-start  to-gradient-SR-end" : "from-gradient-SSR-start  to-gradient-SSR-end"} relative`} />
                                        }
                                        <div className="absolute top-1 left-1 text-black">
                                            <Image src={`/elements/${character.elementText}.webp`} width={25} height={25} alt={`${character.element} icon`} />
                                        </div>
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
                                    {Array.from({ length: 4 }).map((_: any, index: number) => {
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
                            <div className="flex gap-2">
                                <>
                                    {selectedOwned ? (
                                        <button className="border-2 p-2 rounded-xl hover:bg-bg-dark transition-all" onClick={() => { recommendTeam(1); }} disabled={team1AILoading}>
                                            {team1AILoading ? "Loading..." : "Build AI Team"}
                                        </button>
                                    ) : (
                                        <button className="border-2 p-2 rounded-xl hover:bg-bg-dark transition-all" onClick={() => { createBuilds(1) }} disabled={team1AILoading}>
                                            {team1AILoading ? "Loading..." : "Create Builds"}
                                        </button>
                                    )}
                                </>
                            </div>
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
                                    <>
                                        {selectedOwned ? (
                                            <button className="border-2 p-2 rounded-xl hover:bg-bg-dark transition-all" onClick={() => { recommendTeam(1); }} disabled={team1AILoading}>
                                                {team1AILoading ? "Loading..." : "Build AI Team 1"}
                                            </button>
                                        ) : (
                                            <button className="border-2 p-2 rounded-xl hover:bg-bg-dark transition-all" onClick={() => { createBuilds(1) }} disabled={team1AILoading}>
                                                {team1AILoading ? "Loading..." : "Create Builds 1"}
                                            </button>
                                        )}
                                    </>
                                    :
                                    <>
                                        {selectedOwned ? (
                                            <button className="border-2 p-2 rounded-xl hover:bg-bg-dark transition-all" onClick={() => { recommendTeam(2); }} disabled={team2AILoading}>
                                                {team2AILoading ? "Loading..." : "Build AI Team 2"}
                                            </button>
                                        ) : (
                                            <button className="border-2 p-2 rounded-xl hover:bg-bg-dark transition-all" onClick={() => { createBuilds(2); }} disabled={team2AILoading}>
                                                {team2AILoading ? "Loading..." : "Create Builds 2"}
                                            </button>
                                        )}
                                    </>
                                }
                                <label className="flex gap-2 font-bold items-center">
                                    <input type="checkbox" checked={selectTeam} onChange={() => { setSelectTeam(!selectTeam) }} />
                                    Swap Team
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


