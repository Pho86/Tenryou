import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { FaDownload } from "react-icons/fa6";
import { toPng } from 'html-to-image';
import React from "react";
import { User, Characters } from "@/app/types/user";
import { ProfileCardSmall } from "./small";
import { Reorder } from "framer-motion";
export function ProfileCardGrid({
    user
}: {
    user: User
}) {
    const [selectedSlot, setSelectedSlot] = useState<number>(0);
    const [activeCharacters, setActiveCharacters] = useState<any[]>([{}, {}, {}, {}]);
    const [username, setUsername] = useState<boolean>(true);
    const [teamName, setTeamName] = useState<string>("");
    const [UID, setUID] = useState<boolean>(true);
    const cardRef = useRef<any>(null);
    const prepareURL = async () => {
        toPng(cardRef.current, { cacheBust: true, })
            .then((dataUrl) => {
                const link = document.createElement('a');
                link.download = `${user.player.username}_${teamName.length >= 1 ? teamName : "team"}.png`;
                link.href = dataUrl;
                link.click();
            })
            .catch((err) => {
                console.log(err)
            })
    };

    const selectCharacter = (character: Characters, index?: number) => {
        let slot = selectedSlot;
        let element = "";
        setActiveCharacters(prevActiveCharacters => {
            const updatedCharacters = [...prevActiveCharacters];
            if (index != undefined) {
                updatedCharacters[index] = { ...character, active: true };
            } else {
                updatedCharacters[slot] = { ...character, active: true };
            }
            return updatedCharacters;
        });
        setSelectedSlot(prevSlot => (prevSlot + 1) % 4);
        return element;
    };
    const removeCharacter = (character: Characters) => {
        const updatedCharacters = activeCharacters.map((item, i) => {
            if (item.name === character.name) {
                return {};
            }
            return item;
        });
        setActiveCharacters(updatedCharacters);
    };

    return <>
        <div className="grid-auto-fit-150 mt-10">
            {
                user.characters.length > 0 ? user.characters.map((character: any, index: number) => {
                    return <CharacterCard activeProp={() => {
                        const count = activeCharacters.filter(item => item.name === character.name).length;
                        return count === 1;
                    }} character={character} key={index} index={index} removeCharacter={() => { removeCharacter(character) }} selectCharacter={() => { selectCharacter(character) }} />
                })
                    :
                    <div className="w-full col-span-6 md:col-span-full">
                    </div>
            }
        </div>
        <div className="overflow-x-scroll grid place-items-center mt-2">
            <div className="gap-2 w-[1536px] rounded-xl self-center bg-gradient-to-br relative bg-bg-dark p-2" ref={cardRef}>
                <Image src={`/namecards/stars_background.png`} width={2500} height={2500} alt={`background stars image`} className="pointer-events-none absolute top-0 left-0 mix-blend-overlay opacity-60 rounded-xl object-cover h-full  " />
                <Reorder.Group values={activeCharacters} onReorder={setActiveCharacters} className="grid grid-cols-4 w-full gap-2 " axis="x" >
                    {activeCharacters.map((item, index) => {
                        return <Reorder.Item value={item} key={item.name ? item.name : index} className={`rounded-xl cursor-move overflow-hidden ${!item.active && "border-2"} `} onClick={() => setSelectedSlot(index)}>
                            {item.active ?
                                <ProfileCardSmall character={item} />
                                :
                                <div className={`w-full h-full flex items-center justify-center font-bold text-7xl relative`}>
                                    <Image src={"/elements/None.png"} alt="placeholder empty image" height={256} width={256} className="" />
                                    <p className={`absolute ${selectedSlot == index && "text-primary"} `}>
                                        +
                                    </p>
                                </div>
                            }
                        </Reorder.Item>
                    })}
                </Reorder.Group>
                <div className="grid grid-cols-2 w-full col-span-4 drop-shadow-text ">
                    <div className="flex gap-1 text-5xl font-bold items-center">
                        <Image src={'/icon.svg'} width={55} height={55} alt="Tenryou Logo" className={`z-10 pointer-events-none ${teamName.length >= 1 ? "brightness-50" : "brightness-100"}`} />
                        {teamName.length >= 1 ? <span className="z-20 absolute">{teamName}</span> : <div></div>}
                    </div>
                    <div className="flex flex-col px-2 w-full text-end">
                        {username && <span className="font-bold text-xl">
                            {user.player.username}
                        </span>}
                        {UID && <span className="font-medium text-lg">
                            <>UID: {user.uid}</>
                        </span>}
                    </div>
                </div>
            </div>
        </div>
        <div className="w-full flex flex-row-reverse items-center justify-center">
            <div className="flex-end flex justify-end w-[1536px] gap-4">
                <FaDownload className="hover:text-primary text-xl transition-all cursor-pointer" title="Download Card" onClick={() => { prepareURL() }} />
            </div>
        </div>
        <div className="w-full flex flex-row-reverse items-center justify-center ">
            <div className="flex-col flex justify-start w-[1536px] gap-4">
                <h2 className="font-bold text-2xl">Team Options</h2>
                <div className="flex gap-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <span>Username:</span>
                        <input type="checkbox" checked={username} onChange={() => { setUsername(!username) }} />
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                        <span>UID:</span>
                        <input type="checkbox" checked={UID} onChange={() => { setUID(!UID) }} />
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer" >
                        <span>Team Name:</span>
                        <input type="input" value={teamName} className="px-2 py-1 rounded-xl" maxLength={35} onChange={(e) => { setTeamName(e.target.value) }} />
                    </label>

                </div>
            </div>
        </div>
    </>
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
    }} className={`min-w-[4rem] md:min-w-[5rem] bg-[#e9e9e9] transition-all relative rounded-xl cursor-pointer ${active && "shadow-light"} hover:scale-105 hover:shadow-light`}>
        <div className={`flex flex-col self-start `}>
            <Image
                src={`https://enka.network/ui/${character.assets.icon}.png`}
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
