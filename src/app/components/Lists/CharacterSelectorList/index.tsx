"use client"
import Image from "next/image";
import { useState } from "react"
import Link from "next/link";
import IconButtonSwitch from "../../IconButtonSwitch";
import { Character } from "@/app/types/character";
import CharacterCardSingle from "../../CharacterCard";
export default function CharacterList({
    CharacterData
}: {
    CharacterData: Character[]

}) {
    const [activeElement, setActiveElement] = useState<number>(0);
    const [activeWeapon, setActiveWeapon] = useState<number>(0);
    return (<>
        <div className="flex flex-col gap-6">
            <div className="rounded-xl border border-bg-light/70 bg-bg-light/25 flex flex-col p-4">
                <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-text/45">Element</span>
                    <div className="flex flex-wrap gap-2">
                        <IconButtonSwitch name="Pyro" onClick={() => { setActiveElement(activeElement === 1 ? 0 : 1) }} type="elements" index={1} active={activeElement} />
                        <IconButtonSwitch name="Hydro" onClick={() => { setActiveElement(activeElement === 2 ? 0 : 2) }} type="elements" index={2} active={activeElement} />
                        <IconButtonSwitch name="Anemo" onClick={() => { setActiveElement(activeElement === 3 ? 0 : 3) }} type="elements" index={3} active={activeElement} />
                        <IconButtonSwitch name="Electro" onClick={() => { setActiveElement(activeElement === 4 ? 0 : 4) }} type="elements" index={4} active={activeElement} />
                        <IconButtonSwitch name="Dendro" onClick={() => { setActiveElement(activeElement === 5 ? 0 : 5) }} type="elements" index={5} active={activeElement} />
                        <IconButtonSwitch name="Cryo" onClick={() => { setActiveElement(activeElement === 6 ? 0 : 6) }} type="elements" index={6} active={activeElement} />
                        <IconButtonSwitch name="Geo" onClick={() => { setActiveElement(activeElement === 7 ? 0 : 7) }} type="elements" index={7} active={activeElement} />
                    </div>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-text/45">Weapon</span>
                    <div className="flex flex-wrap gap-2">
                        <IconButtonSwitch name="Bow" onClick={() => { setActiveWeapon(activeWeapon === 1 ? 0 : 1) }} index={1} active={activeWeapon} />
                        <IconButtonSwitch name="Sword" onClick={() => { setActiveWeapon(activeWeapon === 2 ? 0 : 2) }} index={2} active={activeWeapon} />
                        <IconButtonSwitch name="Polearm" onClick={() => { setActiveWeapon(activeWeapon === 3 ? 0 : 3) }} index={3} active={activeWeapon} />
                        <IconButtonSwitch name="Claymore" onClick={() => { setActiveWeapon(activeWeapon === 4 ? 0 : 4) }} index={4} active={activeWeapon} />
                        <IconButtonSwitch name="Catalyst" onClick={() => { setActiveWeapon(activeWeapon === 5 ? 0 : 5) }} index={5} active={activeWeapon} />
                    </div>
                </div>
            </div>
            <section className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                {CharacterData.map((character: Character, index: number) => {
                    const elementConditions = [true, "Pyro", "Hydro", "Anemo", "Electro", "Dendro", "Cryo", "Geo"];
                    const weaponConditions = [true, "Bow", "Sword", "Polearm", "Claymore", "Catalyst"];

                    const validElement = activeElement === 0 || elementConditions[activeElement] === character.elementText;
                    const validWeapon = activeWeapon === 0 || weaponConditions[activeWeapon] === character.weaponText;
                    if (character.name == "Aether" || character.name == "Lumine") return null

                    if (!validElement || !validWeapon) return null;
                    return <CharacterCardSingle key={index} character={character} />
                })}
            </section>
        </div>
    </>
    )
}
