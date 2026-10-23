import { useState, useRef } from "react";
import Image from "next/image";
import { FaDownload } from "react-icons/fa6";
import { toPng } from 'html-to-image';
import { User, Characters } from "@/app/types/user";
import { Character as CharacterType } from "@/app/types/character";
import { ProfileCardSmall } from "./small";
import { Reorder } from "framer-motion";

export function ProfileCardGrid({
    user
}: {
    user: User
}) {
    const [selectedSlot, setSelectedSlot] = useState<number>(0);
    const [activeCharacters, setActiveCharacters] = useState<(Characters | null)[]>([null, null, null, null]);
    const [username, setUsername] = useState<boolean>(true);
    const [teamName, setTeamName] = useState<string>("");
    const [UID, setUID] = useState<boolean>(true);
    const [downloading, setDownloading] = useState<boolean>(false);
    const [downloadError, setDownloadError] = useState<string | null>(null);
    const cardRef = useRef<HTMLDivElement>(null);

    const prepareURL = async () => {
        setDownloading(true);
        setDownloadError(null);
        try {
            const dataUrl = await toPng(cardRef.current!, { cacheBust: true });
            const link = document.createElement('a');
            link.download = `${user.player.username}_${teamName.length >= 1 ? teamName : "team"}.png`;
            link.href = dataUrl;
            link.click();
        } catch {
            setDownloadError("Couldn't generate the card. Please try again.");
        } finally {
            setDownloading(false);
        }
    };

    const selectCharacter = (character: Characters) => {
        setActiveCharacters(prevActiveCharacters => {
            const updatedCharacters = [...prevActiveCharacters];
            updatedCharacters[selectedSlot] = { ...character, active: true };
            return updatedCharacters;
        });
        setSelectedSlot(prevSlot => (prevSlot + 1) % 4);
    };

    const removeCharacter = (character: Characters) => {
        setActiveCharacters(activeCharacters.map((item) => {
            if (item?.name === character.name) {
                return null;
            }
            return item;
        }));
    };

    return (
        <section aria-labelledby="team-card-heading" className="flex flex-col gap-4">
            <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                    <h2 id="team-card-heading" className="text-2xl font-bold">Team card</h2>
                    <p className="text-sm text-text/55">Pick up to four characters, arrange them, then download the card.</p>
                </div>
                <button
                    type="button"
                    onClick={() => { prepareURL() }}
                    disabled={downloading}
                    className="inline-flex h-10 items-center gap-2 rounded-xl bg-primary px-4 text-sm font-bold text-bg-darkest transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:cursor-wait disabled:opacity-60"
                >
                    <FaDownload aria-hidden="true" />
                    {downloading ? "Preparing..." : "Download PNG"}
                </button>
            </div>
            <fieldset className="flex flex-wrap items-center gap-2">
                <legend className="sr-only">Team card options</legend>
                <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-bg-lighter bg-bg-light/40 px-3 py-2 text-sm font-semibold transition-colors hover:border-primary/40">
                    <input type="checkbox" checked={username} onChange={() => { setUsername(!username) }} className="h-4 w-4 accent-primary" />
                    <span>Username</span>
                </label>
                <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-bg-lighter bg-bg-light/40 px-3 py-2 text-sm font-semibold transition-colors hover:border-primary/40">
                    <input type="checkbox" checked={UID} onChange={() => { setUID(!UID) }} className="h-4 w-4 accent-primary" />
                    <span>UID</span>
                </label>
                <label className="inline-flex items-center gap-2 rounded-lg border border-bg-lighter bg-bg-light/40 px-3 py-2 text-sm font-semibold">
                    <span>Team name</span>
                    <input
                        type="text"
                        value={teamName}
                        placeholder="Optional"
                        maxLength={35}
                        onChange={(event) => { setTeamName(event.target.value) }}
                        className="h-8 w-36 rounded-lg border border-bg-lighter bg-bg-light px-2 text-sm font-normal text-text outline-none transition-colors placeholder:text-text/60 focus:border-primary"
                    />
                </label>
            </fieldset>
            {downloadError && (
                <p role="alert" className="text-sm font-semibold text-primary">{downloadError}</p>
            )}
            <div className="grid-auto-fit-200" role="group" aria-label="Choose characters for your team">
                {user.characters.length > 0 ? user.characters.map((character: Characters, index: number) => {
                    const isActive = activeCharacters.some(item => item?.name === character.name);
                    return (
                        <CharacterCard
                            key={`${character.name}-${index}`}
                            character={character}
                            active={isActive}
                            onToggle={() => { isActive ? removeCharacter(character) : selectCharacter(character) }}
                        />
                    );
                }) : (
                    <div className="w-full col-span-6 md:col-span-full"></div>
                )}
            </div>
            <div
                tabIndex={0}
                role="region"
                aria-label="Team card preview. Scroll horizontally on smaller screens."
                className="grid place-items-center overflow-x-auto overscroll-x-contain rounded-2xl py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
            >
                <div className="gap-2 w-[1536px] rounded-xl self-center bg-gradient-to-br relative bg-bg-dark p-2" ref={cardRef}>
                    <Image src={`/namecards/stars_background.png`} width={2500} height={2500} alt="" aria-hidden="true" className="pointer-events-none absolute top-0 left-0 mix-blend-overlay opacity-60 rounded-xl object-cover h-full" />
                    <Reorder.Group values={activeCharacters} onReorder={setActiveCharacters} className="grid grid-cols-4 w-full gap-2" axis="x">
                        {activeCharacters.map((item, index) => {
                            return (
                                <Reorder.Item value={item ?? {}} key={item?.name ?? index} className={`rounded-xl cursor-move overflow-hidden ${!item?.active && "border-2"}`} onClick={() => setSelectedSlot(index)}>
                                    {item?.active ?
                                        <ProfileCardSmall character={item} />
                                        :
                                        <div className="w-full h-full flex items-center justify-center font-bold text-7xl relative">
                                            <Image src={"/elements/None.png"} alt="" aria-hidden="true" height={256} width={256} />
                                            <p className={`absolute ${selectedSlot == index && "text-primary"}`}>
                                                +
                                            </p>
                                        </div>
                                    }
                                </Reorder.Item>
                            );
                        })}
                    </Reorder.Group>
                    <div className="grid grid-cols-2 w-full col-span-4 drop-shadow-text mt-1">
                        <div className="flex gap-1 text-5xl font-bold items-center">
                            <Image src={'/icon.svg'} width={55} height={55} alt="Tenryou Logo" className={`z-10 pointer-events-none ${teamName.length >= 1 ? "brightness-50" : "brightness-100"}`} />
                            {teamName.length >= 1 ? <span className="z-20 absolute">{teamName}</span> : <div></div>}
                        </div>
                        <div className="flex flex-col px-2 w-full text-end">
                            {username && <span className="font-bold text-xl">
                                {user.player.username}
                            </span>}
                            {UID && <span className="font-medium text-lg">
                                UID: {user.uid}
                            </span>}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function CharacterCard({ character, active, onToggle }: { character: Characters, active: boolean, onToggle: () => void }) {
    return (
        <button
            type="button"
            onClick={onToggle}
            aria-pressed={active}
            className={`min-w-[4rem] md:min-w-[5rem] bg-[#e9e9e9] transition-all relative rounded-xl cursor-pointer hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-bg ${active ? "outline outline-2 outline-primary outline-offset-2" : ""}`}
        >
            <div className="flex flex-col self-start">
                <Image
                    src={`https://enka.network/ui/${character.assets.icon}.png`}
                    width={200}
                    height={200}
                    sizes="96px"
                    alt={`${character.name}`}
                    title={`${character.name}`}
                    className={`rounded-t-xl w-full rounded-br-4xl object-cover bg-gradient-to-br ${character.rarity == 4 ? " from-gradient-SR-start to-gradient-SR-end" : "from-gradient-SSR-start to-gradient-SSR-end"}`}
                />
                <p className="text-center w-full text-xs p-2 text-black relative font-bold rounded-b-xl">{character.name}</p>
            </div>
        </button>
    );
}
