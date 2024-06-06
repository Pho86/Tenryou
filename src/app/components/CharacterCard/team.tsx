"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Character } from "@/app/types/character";

export default function TeamCharacterCard({ character, selectCharacter, removeCharacter, activeProp }: { character: Character, index: number, selectCharacter: (char: any) => void, removeCharacter: (char: any) => void, activeProp: () => boolean; }) {
    const [active, setActive] = useState<boolean>(activeProp());

    useEffect(() => {
        setActive(activeProp());
    }, [activeProp]);

    const handleClick = () => {
        if (active) {
            removeCharacter(character);
        } else {
            selectCharacter(character);
        }
        setActive(!active);
    };

    return (
        <div
            onClick={handleClick}
            className={`min-w-[4rem] md:min-w-[6rem] bg-[#e9e9e9] transition-all relative rounded-xl cursor-pointer ${active ? "scale-[103%] shadow-light" : ""} ${!active ? "hover:scale-[103%] hover:shadow-light" : "hover:scale-100"}`}
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
                <Image
                    src={`https://enka.network/ui/UI_AvatarIcon_${character.fileName}.png`}
                    width={200}
                    height={200}
                    alt={`${character.name}`}
                    title={`${character.name}`}
                    className={`rounded-t-xl rounded-br-4xl max-h-40 object-cover bg-gradient-to-br ${
                        character.rarity == 4 ? "from-gradient-SR-start to-gradient-SR-end" : "from-gradient-SSR-start to-gradient-SSR-end"
                    }`}
                />
                <p className="text-center w-full text-[.65rem] whitespace-nowrap p-1 text-black relative font-bold rounded-b-xl">{character.name}</p>
            </div>
        </div>
    );
}
