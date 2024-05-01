import Image from "next/image"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { constellations } from "genshin-db";
export default function Profile({ user }: { user: any }) {

    const [newUser, setNewUser] = useState<any>({
        uid: ''
    });
    const router = useRouter();
    const handleChange = (event: any) => {
        setNewUser({ ...newUser, [event.target.name]: event.target.value });
    };

    const [activeCharacter, setActiveCharacter] = useState<any>(user.characters[0]);
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            router.push(`/user/${user.uid}`)
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="">
            <div className="flex flex-col md:flex-row w-full justify-between items-center">
                <div className="flex p-2 gap-2">
                    <Image src={`https://enka.network/ui/${user.player.profilePicture.assets.icon}.png`} width={150} height={50} alt={`${user.player}`} title={`${user.player}`} className="bg-bg-darker p-2" />
                    <div className="flex flex-col justify-center">
                        <h1 className="text-4xl text-primary font-bold">
                            {user.player.username}
                        </h1>
                        <div className="flex gap-2">
                            <p className="">AR {user.player.levels.rank}</p>
                            <p className="">WL {user.player.levels.world}</p>
                        </div>
                        <p className="">{user.player.signature}</p>
                    </div>
                </div>
                <div className="flex flex-col">
                    <div className="flex flex-col">
                        <p className="">Achievements: {user.player.achievements}</p>
                        <p className="">Abyss: {user.player.abyss.chamber}-{user.player.abyss.floor}</p>
                    </div>
                </div>
                <div className="flex flex-col">
                    <form className="flex justify-center items-center h-full w-full gap-2" onSubmit={handleSubmit} onChange={handleChange}>
                        <input type="number" name="uid" required onChange={() => { }} value={newUser.uid} placeholder="Enter UID..." className="p-2 rounded-xl" />
                        <button className="" type="submit">Search</button>
                    </form>
                </div>
            </div>
            <button onClick={() => { console.log(activeCharacter) }}>Console</button>
            <div className="relative rounded-xl overflow-hidden">
                <Image src={`https://enka.network/ui/${user.player.namecard.assets.picPath[0]}.png`} width={2500} height={2500} alt={`${user.player}`} title={`${user.player}`} className="w-full absolute -z-10" />
                <div className="absolute w-full h-[25rem]">
                    <Image src={`https://enka.network/ui/${activeCharacter.assets.gachaIcon}.png`} width={1000} height={1000} alt={`${activeCharacter.name}`} title={`${activeCharacter.name}`} className="w-full left-0 absolute h-full object-cover" />
                </div>
                <div className="p-4 relative flex justify-between">
                    <div className="">
                        <div className="flex gap-2 items-center">
                            <h2 className="text-3xl font-semibold">
                                {activeCharacter.name}
                            </h2>
                            <h3 className="text-2xl">
                                {user.player.username}
                            </h3>
                        </div>
                        <div className="flex gap-2">
                            <p>
                                Fri.{activeCharacter.friendship.level}
                            </p>
                            <p>
                                Lv.{activeCharacter.properties.level.val}/{activeCharacter.maxLevel}
                            </p>
                        </div>
                        <div className="">
                            {activeCharacter.constellationsList.map((constellation: any, index: number) => {
                                return <div key={index} className="">
                                    <Image src={`https://enka.network/ui/${constellation.assets.icon}.png`} width={250} height={250} alt={`${constellation.name}`} className="w-12" />
                                </div>
                            })}
                        </div>
                    </div>
                    <div className="">
                        <div className="flex gap-2 items-center font-semibold">
                            <span>HP</span>
                            {activeCharacter.stats.maxHp.value.toFixed(1)}
                        </div>
                        <div className="flex gap-2 items-center font-semibold">
                            <span>ATK</span>
                            {activeCharacter.stats.atk.value.toFixed(1)}
                        </div>
                        <div className="flex gap-2 items-center font-semibold">
                            <span>DEF</span>
                            {activeCharacter.stats.def.value.toFixed()}
                        </div>
                        <div className="flex gap-2 items-center font-semibold">
                            <span>Elemental Mastery</span>
                            {activeCharacter.stats.elementalMastery.value.toFixed()}
                        </div>
                        <div className="flex gap-2 items-center font-semibold">
                            <span>CRIT Rate</span>
                            {(activeCharacter.stats.critRate.value * 100).toFixed(1)}%
                        </div>
                        <div className="flex gap-2 items-center font-semibold">
                            <span>CRIT DMG</span>
                            {(activeCharacter.stats.critDamage.value * 100).toFixed(1)}%
                        </div>
                        <div className="flex gap-2 items-center font-semibold">
                            <span>Energy Recharge</span>
                            {(activeCharacter.stats.energyRecharge.value * 100).toFixed(1)}%
                        </div>
                    </div>
                </div>

                {/* {user.characters.map((character: any, index: number) => {
                        return <div className="flex gap-2 flex-wrap" key={index}>
                            {character.name}
                            {character.maxLevel}
                            {character.assets.gachaIcon}
                            <Image src={`https://enka.network/ui/${character.assets.gachaIcon}.png`} width={250} height={250} alt={`${character.name}`} title={`${character.name}`} />
                            <Image src={`https://enka.network/ui/${character.assets.icon}.png`} width={250} height={250} alt={`${character.name}`} title={`${character.name}`} />

                            {character.stats.atk.value.toFixed(1)}
                            {character.stats.critDamage.value.toFixed(1)}
                            {character.stats.critRate.value.toFixed(1)}
                            {character.stats.def.value.toFixed(1)}
                            {character.stats.maxHp.value.toFixed(1)}
                            {character.stats.energyRecharge.value.toFixed(1)}
                            {character.stats.elementalMastery.value.toFixed(1)}
                        </div>
                    })} */}
            </div>
        </div>
    )
}