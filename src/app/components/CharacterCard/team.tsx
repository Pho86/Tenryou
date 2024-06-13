"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Character } from "@/app/types/character";
const isCharacterOwned = (arr: any, targetName: string) => {
    return arr.some((character: Character) => character.name === targetName);
};
export default function TeamCharacterCard({ character, selectCharacter, removeCharacter, activeProp, selectOwned, ownedOption, ownedCharacters, traveller = false }: {
    character: Character,
    index: number,
    selectCharacter: (char: Character) => void,
    removeCharacter: (char: Character) => void,
    activeProp: () => boolean,
    selectOwned: (char: Character) => void,
    ownedOption: boolean;
    ownedCharacters: Character[],
    traveller?: boolean
}) {
    const [active, setActive] = useState<boolean>(activeProp());
    const [owned, setOwned] = useState<boolean>(false);
    useEffect(() => {
        setActive(activeProp());
    }, [activeProp]);

    const handleClick = () => {
        if (ownedOption) {
            selectOwned(character)
        } else {
            if (active) {
                removeCharacter(character);
            } else {
                selectCharacter(character);
            }
            setActive(!active);
        }
    };

    useEffect(() => {
        if (ownedOption) {
            const isOwned = isCharacterOwned(ownedCharacters, character.name);
            setOwned(isOwned);
        }
    }, [ownedCharacters, ownedOption]);

    return (
        <div
            onClick={handleClick}
            className={`min-w-[4rem] md:min-w-[6rem] bg-[#e9e9e9] transition-all relative rounded-xl cursor-pointer ${active ? "scale-[103%] shadow-light" : ""} ${!active ? "hover:scale-[103%] hover:shadow-light" : "hover:scale-100"} ${ownedOption ? (owned ? 'brightness-100' : 'brightness-50') : ''}`}
        >
            <div className="flex flex-col self-start">
                <div className="absolute top-1 left-1 text-black">
                    <Image src={`/elements/${character.elementText}.webp`} width={25} height={25} alt={`${character.element} icon`} />
                </div>
                {character.region && (
                    <div className="absolute top-1 right-1 text-black">
                        <Image src={`/regions/${character.region}.webp`} width={25} height={25} alt={`${character.region} icon`} />
                    </div>
                )}
                {traveller ?
                    <Image
                        src={`/characters/travellers.webp`}
                        width={1000}
                        height={1000}
                        alt={`${character.name}`}
                        title={`${character.name}`}
                        className={`rounded-t-xl rounded-br-4xl max-h-40 object-cover bg-gradient-to-br ${character.rarity == 4 ? "from-gradient-SR-start to-gradient-SR-end" : "from-gradient-SSR-start to-gradient-SSR-end"} `}
                    /> :
                    <Image
                        src={`https://enka.network/ui/UI_AvatarIcon_${character.fileName}.png`}
                        width={200}
                        height={200}
                        alt={`${character.name}`}
                        title={`${character.name}`}
                        className={`rounded-t-xl rounded-br-4xl max-h-40 object-cover bg-gradient-to-br ${character.rarity == 4 ? "from-gradient-SR-start to-gradient-SR-end" : "from-gradient-SSR-start to-gradient-SSR-end"} `}
                    />
                }
                <p className="text-center w-full text-[.65rem] whitespace-nowrap p-1 text-black relative font-bold rounded-b-xl">{character.name}</p>
            </div>
        </div>
    );
}
