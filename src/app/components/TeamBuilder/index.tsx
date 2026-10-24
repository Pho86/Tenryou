"use client";
import IconButtonSwitch from "../IconButtonSwitch";
import { useState, useEffect, useRef, useCallback } from "react";
import { Character } from "@/app/types/character";
import Skeleton from "../Skeleton";
import { getRandomNumber } from "@/app/utils/helper";
import Markdown from "../MarkdownComponent";
import TeamCharacterCard from "../CharacterCard/team";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { DragProvider, useDrag, type DragSource } from "./drag-context";

// ─── helpers ─────────────────────────────────────────────────────────────────

async function readApiError(response: Response): Promise<string> {
    const body = await response.text();
    try {
        const parsed = JSON.parse(body);
        if (typeof parsed === "string") return parsed;
        if (parsed && typeof parsed === "object") return parsed.error || parsed.text || body;
    } catch { }
    return body || `Request failed (${response.status})`;
}

function stripCharacterLine(text: string) {
    return text.replace(/(?:^|\n)[ \t]*CHARACTERS:[^\n]*/i, "");
}

async function readTextStream(response: Response, onProgress: (t: string) => void) {
    if (!response.body) throw new Error("No response body");
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let text = "";
    let lastUpdate = 0;
    while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        text += decoder.decode(value, { stream: true });
        const now = Date.now();
        if (now - lastUpdate > 60) { lastUpdate = now; onProgress(text); }
    }
    const tail = decoder.decode();
    if (tail) text += tail;
    onProgress(text);
    return text;
}

// ─── motion presets ──────────────────────────────────────────────────────────

const cardVariants = {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -16 },
};

// ─── TeamBuilder (inner — needs DragProvider above) ──────────────────────────

function TeamBuilderInner({ CharacterData }: { CharacterData: Character[] }) {
    const { drag, setOnDrop } = useDrag();

    const [activeElement, setActiveElement] = useState(0);
    const [activeWeapon, setActiveWeapon] = useState(0);
    const [mounted, setMounted] = useState(false);

    const [activeCharacters, setActiveCharacters] = useState<(Character | null)[]>(() => {
        if (typeof window !== "undefined") {
            const stored = localStorage.getItem("activeCharacters");
            return stored ? JSON.parse(stored) : Array(9).fill(null);
        }
        return Array(9).fill(null);
    });

    const [ownedCharacters, setOwnedCharacters] = useState<Character[]>(() => {
        if (typeof window !== "undefined") {
            const stored = localStorage.getItem("ownedCharacters");
            return stored ? JSON.parse(stored) : [];
        }
        return [];
    });

    const [selectedOwned, setSelectedOwned] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState(0);
    const [secondTeam, setSecondTeam] = useState(false);
    const [team1AILoading, setTeam1AILoading] = useState(false);
    const [team2AILoading, setTeam2AILoading] = useState(false);
    const [team1FinalizeLoading, setTeam1FinalizeLoading] = useState(false);
    const [team2FinalizeLoading, setTeam2FinalizeLoading] = useState(false);
    const [team1Recommendations, setTeam1Recommendations] = useState<string[]>([]);
    const [team2Recommendations, setTeam2Recommendations] = useState<string[]>([]);
    const [team1ErrorMessage, setTeam1ErrorMessage] = useState("Please put 2 or more characters in the team (Slot 1/2).");
    const [team2ErrorMessage, setTeam2ErrorMessage] = useState("Please put 2 or more characters in the team (Slot 5/6).");
    const [availableCharacters, setAvailableCharacters] = useState<Character[]>([]);
    const [deletedChars, setDeletedChars] = useState(false);
    const [selectTeam, setSelectTeam] = useState(true);

    useEffect(() => { setMounted(true); }, []);
    useEffect(() => {
        localStorage.setItem("activeCharacters", JSON.stringify(activeCharacters));
    }, [activeCharacters]);

    // ── drop handler wired into drag context ──
    const handleDrop = useCallback((source: DragSource, targetSlot: number) => {
        setActiveCharacters(prev => {
            const next = [...prev];
            const visibleSlots = secondTeam ? 8 : 4;
            if (targetSlot >= visibleSlots) return prev;

            if (source.kind === "roster") {
                const incoming = source.character;
                const isIncomingTraveller = incoming.name.startsWith("Traveller");

                // If adding Traveller, clear any other Traveller already in the team
                if (isIncomingTraveller) {
                    for (let i = 0; i < next.length; i++) {
                        if (i !== targetSlot && next[i]?.name.startsWith("Traveller")) {
                            next[i] = null;
                        }
                    }
                } else {
                    // If regular character already in another slot, clear that slot
                    for (let i = 0; i < next.length; i++) {
                        if (i !== targetSlot && next[i]?.name === incoming.name) {
                            next[i] = null;
                        }
                    }
                }

                next[targetSlot] = { ...incoming, active: true };
            } else {
                // Dragged from another slot → swap
                const fromSlot = source.slotIndex;
                if (fromSlot === targetSlot) return prev;
                const tmp = next[fromSlot];
                next[fromSlot] = next[targetSlot];
                next[targetSlot] = tmp;
            }
            return next;
        });
        // Advance selectedSlot only on roster drop
        if (source.kind === "roster") {
            setSelectedSlot(prev => {
                const limit = secondTeam ? 8 : 4;
                return (prev + 1) % limit;
            });
        }
    }, [secondTeam]);

    useEffect(() => { setOnDrop(handleDrop); }, [handleDrop, setOnDrop]);

    const selectCharacter = useCallback((character: Character, index?: number) => {
        setActiveCharacters(prev => {
            const next = [...prev];
            const slot = index !== undefined ? index : selectedSlot;
            const isTraveller = character.name.startsWith("Traveller");

            // If selecting Traveller, remove any existing Traveller from other slots
            if (isTraveller) {
                for (let i = 0; i < next.length; i++) {
                    if (i !== slot && next[i]?.name.startsWith("Traveller")) {
                        next[i] = null;
                    }
                }
            } else {
                // Remove duplicate if same character already in another slot
                for (let i = 0; i < next.length; i++) {
                    if (i !== slot && next[i]?.name === character.name) {
                        next[i] = null;
                    }
                }
            }

            next[slot] = { ...character, active: true };
            return next;
        });
        if (!secondTeam) setSelectedSlot(p => (p + 1) % 4);
        else setSelectedSlot(p => (p + 1) % 8);
    }, [selectedSlot, secondTeam]);

    const removeCharacter = useCallback((character: Character) => {
        setActiveCharacters(prev => prev.map(item =>
            item?.name === character.name || (item && typeof item.name === "string" && item.name.startsWith("Traveller") && character.name.startsWith("Traveller"))
                ? null
                : item
        ));
    }, []);

    const isExcluded = (name?: string) =>
        name === "Aether" || name === "Lumine" || name === "Manekin" || name === "Manekina";

    const randomizeTeam = useCallback(() => {
        let pool: Character[];
        if (!deletedChars) {
            pool = CharacterData.filter(c => !isExcluded(c.name));
            setDeletedChars(true);
            setAvailableCharacters(pool);
        } else {
            pool = selectedOwned ? [...ownedCharacters] : [...availableCharacters];
        }
        const count = Math.min(secondTeam ? 8 : 4, pool.length);
        const picked: Character[] = [];
        for (let i = 0; i < count; i++) {
            const idx = Math.floor(getRandomNumber(0, pool.length));
            picked.push(pool[idx]);
            pool.splice(idx, 1);
        }
        const next = Array(secondTeam ? 8 : 4).fill(null).map((_, i) =>
            picked[i] ? { ...picked[i], active: true } : null
        );
        setActiveCharacters(next);
    }, [deletedChars, selectedOwned, ownedCharacters, availableCharacters, secondTeam, CharacterData]);

    const clearTeam = useCallback(() => {
        setActiveCharacters(Array(8).fill(null));
        setSelectedSlot(0);
        setTeam1Recommendations([]);
        setTeam2Recommendations([]);
    }, []);

    const handleOwnedClick = useCallback((character: Character) => {
        setOwnedCharacters(prev => {
            const isOwned = prev.some(c => c.name === character.name);
            const next = isOwned
                ? prev.filter(c => c.name !== character.name)
                : [...prev, character];
            localStorage.setItem("ownedCharacters", JSON.stringify(next));
            return next;
        });
    }, []);

    const recommendTeam = useCallback(async (team: number) => {
        const setAI = team === 1 ? setTeam1AILoading : setTeam2AILoading;
        const setFinalize = team === 1 ? setTeam1FinalizeLoading : setTeam2FinalizeLoading;
        const setRecs = team === 1 ? setTeam1Recommendations : setTeam2Recommendations;
        const setErr = team === 1 ? setTeam1ErrorMessage : setTeam2ErrorMessage;
        const minOwned = secondTeam ? 8 : 4;
        if (ownedCharacters.length < minOwned) {
            setErr(`Please select at least ${minOwned} owned characters`);
            return;
        }
        setAI(true);
        try {
            if (team === 1) setActiveCharacters(p => [...Array(4).fill(null), ...p.slice(4)]);
            else setActiveCharacters(p => [...p.slice(0, -4), ...Array(4).fill(null)]);

            const filtered = ownedCharacters.filter(c =>
                !activeCharacters.some(a => a?.fileName === c.fileName)
            );
            setRecs([]);
            setErr("");

            const res = await fetch("/api/teamrec/google", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ownedCharacters: filtered, team }),
            });
            if (!res.ok) throw new Error(await readApiError(res));

            let started = false;
            const full = await readTextStream(res, (text) => {
                if (!started) { started = true; setAI(false); setFinalize(true); }
                setRecs([stripCharacterLine(text)]);
            });

            const match = full.match(/(?:^|\n)[ \t]*CHARACTERS:[ \t]*(.+)/i);
            const names = match ? match[1].split(",").map(n => n.trim()).filter(Boolean) : [];
            const slotStart = team === 1 ? 0 : 4;
            names.slice(0, 4).forEach((name, i) => {
                const norm = name.toLowerCase().replace(/^traveler/, "traveller");
                const char = CharacterData.find(c =>
                    norm.startsWith("traveller")
                        ? c.name.toLowerCase().includes(norm)
                        : c.fileName.toLowerCase().includes(norm)
                );
                if (char) selectCharacter(char, slotStart + i);
            });
        } catch (err) {
            const msg = err instanceof Error ? err.message : "Unable to process. Please try again.";
            setRecs([]);
            setErr(msg);
        } finally {
            setAI(false);
            setFinalize(false);
        }
    }, [secondTeam, ownedCharacters, activeCharacters, CharacterData, selectCharacter]);

    const createBuilds = useCallback(async (team: number) => {
        const setAI = team === 1 ? setTeam1AILoading : setTeam2AILoading;
        const setFinalize = team === 1 ? setTeam1FinalizeLoading : setTeam2FinalizeLoading;
        const setRecs = team === 1 ? setTeam1Recommendations : setTeam2Recommendations;
        const setErr = team === 1 ? setTeam1ErrorMessage : setTeam2ErrorMessage;

        const slotA = team === 1 ? 0 : 4;
        const slotB = team === 1 ? 1 : 5;
        if (!activeCharacters[slotA] || !activeCharacters[slotB]) {
            setErr(`Please put 2 or more characters in the team (Slot ${slotA + 1}/${slotB + 1}).`);
            return;
        }
        setAI(true);
        setRecs([]);
        setErr("");
        try {
            const res = await fetch("/api/teambuild/google", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ activeCharacters, team }),
            });
            if (!res.ok) throw new Error(await readApiError(res));
            let started = false;
            await readTextStream(res, (text) => {
                if (!started) { started = true; setAI(false); setFinalize(true); }
                setRecs([text]);
            });
        } catch (err) {
            setRecs([]);
            setErr(err instanceof Error ? err.message : "Unable to process. Please try again.");
        } finally {
            setAI(false);
            setFinalize(false);
        }
    }, [activeCharacters]);

    const visibleSlots = secondTeam ? 8 : 4;
    const activeTeam = activeCharacters.slice(0, visibleSlots);

    return (
        <>
            {/* ── filters ── */}
            <div className="rounded-xl border border-bg-light/70 bg-bg-light/25 p-4 md:p-5 shadow-sm backdrop-blur-sm">
                <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-text/45">Element</span>
                    <div className="flex flex-wrap gap-1.5" role="group" aria-label="Element filters">
                        {(["Pyro","Hydro","Anemo","Electro","Dendro","Cryo","Geo"] as const).map((el, i) => (
                            <IconButtonSwitch key={el} name={el} type="elements" onClick={() => setActiveElement(e => e === i + 1 ? 0 : i + 1)} index={i + 1} active={activeElement} aria-pressed={activeElement === i + 1} />
                        ))}
                    </div>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-text/45">Weapon</span>
                    <div className="flex flex-wrap gap-1.5" role="group" aria-label="Weapon filters">
                        {(["Bow","Sword","Polearm","Claymore","Catalyst"] as const).map((w, i) => (
                            <IconButtonSwitch key={w} name={w} onClick={() => setActiveWeapon(e => e === i + 1 ? 0 : i + 1)} index={i + 1} active={activeWeapon} aria-pressed={activeWeapon === i + 1} />
                        ))}
                    </div>
                </div>
            </div>

            {/* ── main grid ── */}
            <div className="grid lg:grid-cols-2 w-full max-w-screen-2xl gap-6">

                {/* roster */}
                <section
                    className="grid-auto-fit-100 w-full rounded-xl border border-bg-light/70 bg-bg-light/25 p-4 max-h-[85vh] overflow-y-auto order-1 lg:order-1 shadow-sm backdrop-blur-sm relative"
                    aria-label="Character roster"
                >
                    {/* While dragging, cover the roster so the pointer can reach team slots freely */}
                    {drag.source !== null && (
                        <div className="absolute inset-0 z-10 cursor-grabbing" />
                    )}
                    <AnimatePresence mode="popLayout">
                        {mounted
                            ? CharacterData.map((character, index) => {
                                const elementConditions = [true, "Pyro","Hydro","Anemo","Electro","Dendro","Cryo","Geo"];
                                const weaponConditions = [true, "Bow","Sword","Polearm","Claymore","Catalyst"];
                                if (isExcluded(character.name)) return null;
                                const validEl = activeElement === 0 || elementConditions[activeElement] === character.elementText;
                                const validWp = activeWeapon === 0 || weaponConditions[activeWeapon] === character.weaponText;
                                if (!validEl || !validWp) return null;
                                return (
                                    <motion.div
                                        key={character.fileName}
                                        variants={cardVariants}
                                        initial="initial"
                                        animate="animate"
                                        exit="exit"
                                        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                                    >
                                        <TeamCharacterCard
                                            index={index}
                                            character={character}
                                            selectCharacter={selectCharacter}
                                            removeCharacter={removeCharacter}
                                            selectOwned={handleOwnedClick}
                                            traveller={character.name.startsWith("Traveller")}
                                            activeProp={() => {
                                                if (character.name.startsWith("Traveller"))
                                                    return activeCharacters.some(a => a && a.name.startsWith("Traveller"));
                                                return activeCharacters.some(a => a?.name === character.name);
                                            }}
                                            ownedOption={selectedOwned}
                                            ownedCharacters={ownedCharacters}
                                            isSkeleton={false}
                                        />
                                    </motion.div>
                                );
                            })
                            : Array.from({ length: 12 }).map((_, i) => (
                                <motion.div
                                    key={i}
                                    variants={cardVariants}
                                    initial="initial"
                                    animate="animate"
                                    exit="exit"
                                    transition={{ duration: 0.2, delay: i * 0.02, ease: [0.16, 1, 0.3, 1] }}
                                >
                                    <SkeletonCard />
                                </motion.div>
                            ))}
                    </AnimatePresence>
                </section>

                {/* team panel */}
                <section className="w-full flex flex-col gap-4 rounded-xl border border-bg-light/70 bg-bg-light/25 p-4 md:p-5 order-0 lg:order-2 shadow-sm backdrop-blur-sm">
                    {/* controls */}
                    <div className="flex flex-wrap items-center gap-2">
                        <button
                            onClick={() => {
                                if (!selectedOwned) {
                                    setTeam1ErrorMessage("Please put 2 or more characters in the team (Slot 1/2).");
                                    setTeam2ErrorMessage("Please put 2 or more characters in the team (Slot 5/6).");
                                } else {
                                    setTeam1ErrorMessage("Please select more than 4 owned characters");
                                    setTeam2ErrorMessage("Please select more than 8 owned characters");
                                }
                                setSelectedOwned(p => !p);
                            }}
                            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-all ${selectedOwned ? "bg-primary text-bg-darkest shadow-md hover:brightness-110" : "border border-bg-light/70 hover:bg-bg-dark/70"}`}
                            aria-pressed={selectedOwned}
                        >
                            {selectedOwned ? "Owned Characters" : "All Characters"}
                        </button>
                        <button onClick={randomizeTeam} className="rounded-lg border border-bg-light/70 px-3 py-1.5 text-sm font-medium transition-all hover:bg-bg-dark/70">Randomize</button>
                        <button onClick={clearTeam} className="rounded-lg border border-bg-light/70 px-3 py-1.5 text-sm font-medium transition-all hover:bg-bg-dark/70">Clear</button>
                        <label className="flex gap-2 items-center text-sm font-medium cursor-pointer">
                            <input
                                type="checkbox"
                                checked={secondTeam}
                                onChange={() => {
                                    if (secondTeam) {
                                        setSecondTeam(false);
                                        setActiveCharacters(p => [...p.slice(0, 4), null, null, null, null]);
                                    } else {
                                        setSecondTeam(true);
                                    }
                                }}
                                className="accent-primary"
                                aria-label="Enable second team"
                            />
                            <span>Second Team</span>
                        </label>
                    </div>

                    {/* slot grid */}
                    <div
                        className="grid grid-cols-4 gap-2 md:gap-3"
                        role="list"
                        aria-label={secondTeam ? "Team slots (8 characters)" : "Team slots (4 characters)"}
                    >
                        <AnimatePresence mode="popLayout">
                            {mounted
                                ? activeTeam.map((character, index) => (
                                    <motion.div
                                        key={index}
                                        layout
                                        initial={{ opacity: 0, scale: 0.88 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.88 }}
                                        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                                        className="h-full"
                                    >
                                        <TeamSlot
                                            index={index}
                                            character={character}
                                            isSelected={selectedSlot === index}
                                            onSelect={() => setSelectedSlot(index)}
                                            dragState={drag}
                                        />
                                    </motion.div>
                                ))
                                : Array.from({ length: visibleSlots }).map((_, i) => (
                                    <motion.div
                                        key={i}
                                        layout
                                        initial={{ opacity: 0, scale: 0.88 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.88 }}
                                        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1], delay: i * 0.04 }}
                                        className="h-full"
                                    >
                                        <TeamSlot
                                            index={i}
                                            character={null}
                                            isSelected={false}
                                            onSelect={() => {}}
                                            dragState={drag}
                                        />
                                    </motion.div>
                                ))}
                        </AnimatePresence>
                    </div>

                    {/* AI panel */}
                    <AnimatePresence mode="wait">
                        {!secondTeam ? (
                            <TeamActionPanel
                                key="single"
                                selectedOwned={selectedOwned}
                                teamNumber={1}
                                aiLoading={team1AILoading}
                                finalizeLoading={team1FinalizeLoading}
                                recommendations={team1Recommendations}
                                errorMessage={team1ErrorMessage}
                                onRecommend={recommendTeam}
                                onCreateBuilds={createBuilds}
                            />
                        ) : (
                            <TeamActionPanel
                                key="double"
                                selectedOwned={selectedOwned}
                                teamNumber={selectTeam ? 1 : 2}
                                aiLoading={selectTeam ? team1AILoading : team2AILoading}
                                finalizeLoading={selectTeam ? team1FinalizeLoading : team2FinalizeLoading}
                                recommendations={selectTeam ? team1Recommendations : team2Recommendations}
                                errorMessage={selectTeam ? team1ErrorMessage : team2ErrorMessage}
                                onRecommend={recommendTeam}
                                onCreateBuilds={createBuilds}
                                showTeamSwap
                                selectTeam={selectTeam}
                                setSelectTeam={setSelectTeam}
                            />
                        )}
                    </AnimatePresence>
                </section>
            </div>
        </>
    );
}

// ─── TeamSlot ────────────────────────────────────────────────────────────────

function TeamSlot({
    index,
    character,
    isSelected,
    onSelect,
    dragState,
}: {
    index: number;
    character: Character | null;
    isSelected: boolean;
    onSelect: () => void;
    dragState: { source: DragSource | null; overSlot: number | null };
}) {
    const { enterSlot, leaveSlot, endDrag, startDrag } = useDrag();
    const slotPointerStart = useRef<{ x: number; y: number } | null>(null);
    const slotDragging = useRef(false);

    const isActive = !!character?.active;
    const isDragOver = dragState.overSlot === index;
    const isDragging = dragState.source !== null;

    const previewChar =
        isDragOver && dragState.source ? dragState.source.character : null;
    const isBeingDragged =
        dragState.source?.kind === "slot" &&
        dragState.source.slotIndex === index;

    const isTraveller = character?.name?.startsWith("Traveller");
    const gradient =
        character?.rarity === 4
            ? "from-gradient-SR-start to-gradient-SR-end"
            : "from-gradient-SSR-start to-gradient-SSR-end";

    return (
        <motion.div
            role="listitem"
            aria-label={isActive ? `${character?.name}, slot ${index + 1}` : `Empty slot ${index + 1}`}
            onClick={() => { if (!slotDragging.current) onSelect(); }}
            onPointerDown={(e) => {
                if (!isActive || !character) return;
                slotPointerStart.current = { x: e.clientX, y: e.clientY };
                slotDragging.current = false;
                // No setPointerCapture — keep pointerenter routing intact
            }}
            onPointerMove={(e) => {
                if (!isActive || !character || !slotPointerStart.current) return;
                const dx = e.clientX - slotPointerStart.current.x;
                const dy = e.clientY - slotPointerStart.current.y;
                if (!slotDragging.current && Math.hypot(dx, dy) > 6) {
                    slotDragging.current = true;
                    startDrag({ kind: "slot", character, slotIndex: index }, e.clientX, e.clientY);
                }
            }}
            // Drop target
            onPointerEnter={() => {
                if (isDragging) enterSlot(index);
            }}
            onPointerLeave={() => {
                if (isDragging) leaveSlot();
            }}
            onPointerUp={(e) => {
                slotPointerStart.current = null;
                slotDragging.current = false;
                if (isDragging) { e.stopPropagation(); endDrag(); }
            }}
            animate={{
                scale: isDragOver && isDragging ? 1.05 : isSelected && !isDragging ? 1.02 : isBeingDragged ? 0.95 : 1,
                boxShadow: isDragOver && isDragging
                    ? "0 0 0 2px rgba(255,115,115,0.8), 0 0 16px rgba(255,115,115,0.3)"
                    : isSelected && !isDragging
                    ? "0 0 0 2px rgba(255,115,115,0.8), 0 0 12px rgba(255,115,115,0.25)"
                    : "none",
                opacity: isBeingDragged ? 0.45 : 1,
            }}
            transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className={`relative overflow-hidden rounded-xl cursor-pointer select-none touch-none transition-all h-full flex flex-col ${
                !isActive
                    ? isSelected && !isDragging
                        ? "border-2 border-primary/80 bg-primary/5"
                        : "border border-bg-light/70 hover:border-primary/50 bg-bg-light/20"
                    : "border border-bg-light/80 shadow-md"
            }`}
        >
            {isActive && character ? (
                <>
                    {/* Character image */}
                    <div
                        className={`w-full bg-gradient-to-br ${gradient} relative overflow-hidden`}
                        style={{ aspectRatio: "1/1" }}
                    >
                        <Image
                            src={
                                isTraveller
                                    ? "/characters/travellers.webp"
                                    : `https://enka.network/ui/UI_AvatarIcon_${character.fileName}.png`
                            }
                            width={400}
                            height={400}
                            alt={character.name}
                            draggable={false}
                            className="w-full h-full object-cover pointer-events-none"
                        />
                        {/* Drop-swap overlay */}
                        <AnimatePresence>
                            {isDragOver && isDragging && dragState.source?.kind !== "slot" || (isDragOver && isDragging) ? (
                                <motion.div
                                    className="absolute inset-0 bg-primary/20 flex items-center justify-center"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.12 }}
                                >
                                    <span className="text-2xl font-bold text-white drop-shadow-text">↔</span>
                                </motion.div>
                            ) : null}
                        </AnimatePresence>
                        {/* Element badge */}
                        <div className="absolute top-1 left-1 pointer-events-none drop-shadow-icon">
                            <Image
                                src={`/elements/${character.elementText}.webp`}
                                width={20}
                                height={20}
                                alt={character.element ?? ""}
                                draggable={false}
                            />
                        </div>
                    </div>
                    {/* Name */}
                    <div className="flex flex-col items-center justify-center px-1 py-1 bg-bg-dark/85 text-center">
                        <p className="text-[0.65rem] font-bold truncate text-text/90 w-full">
                            {isTraveller ? "Traveller" : character.name}
                        </p>
                        {isTraveller && character.elementText && (
                            <span className="text-[9px] font-semibold text-primary uppercase tracking-wide leading-none">
                                {character.elementText}
                            </span>
                        )}
                    </div>
                </>
            ) : (
                /* Empty slot */
                <div
                    className={`w-full h-full flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl transition-colors duration-150 ${
                        isDragOver && isDragging
                            ? "bg-primary/20"
                            : isSelected && !isDragging
                            ? "bg-primary/10"
                            : "hover:bg-bg-light/35"
                    }`}
                >
                    <AnimatePresence mode="wait">
                        {isDragOver && isDragging && previewChar ? (
                            <motion.div
                                key="preview"
                                initial={{ opacity: 0, scale: 0.7 }}
                                animate={{ opacity: 0.7, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.7 }}
                                transition={{ duration: 0.15 }}
                                className="w-full"
                            >
                                <Image
                                    src={
                                        previewChar.name.startsWith("Traveller")
                                            ? "/characters/travellers.webp"
                                            : `https://enka.network/ui/UI_AvatarIcon_${previewChar.fileName}.png`
                                    }
                                    width={200}
                                    height={200}
                                    alt=""
                                    draggable={false}
                                    className="w-full aspect-square object-cover rounded-t-xl rounded-br-4xl pointer-events-none"
                                />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="empty"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex flex-col items-center justify-center gap-1 w-full h-full text-center"
                            >
                                <div className="w-7 h-7 rounded-full border border-dashed border-text/25 flex items-center justify-center text-text/40 text-xs font-mono font-semibold">
                                    +
                                </div>
                                <span className="text-[11px] font-medium text-text/40">
                                    Slot {index + 1}
                                </span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            )}
        </motion.div>
    );
}

// ─── SkeletonCard ────────────────────────────────────────────────────────────

function SkeletonCard() {
    return (
        <motion.div
            className="w-full rounded-xl bg-bg-dark/50 border border-bg-light/30 overflow-hidden"
            animate={{ opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
            <div
                className="w-full bg-gradient-to-br from-bg-lighter to-bg-light rounded-t-xl"
                style={{ aspectRatio: "1/1" }}
            />
            <div className="h-4 w-3/4 mx-auto my-2 rounded bg-bg-lighter" />
        </motion.div>
    );
}

// ─── TeamActionPanel ──────────────────────────────────────────────────────────

function TeamActionPanel({
    selectedOwned,
    teamNumber,
    aiLoading,
    finalizeLoading,
    recommendations,
    errorMessage,
    onRecommend,
    onCreateBuilds,
    showTeamSwap = false,
    selectTeam = true,
    setSelectTeam = () => {},
}: {
    selectedOwned: boolean;
    teamNumber: number;
    aiLoading: boolean;
    finalizeLoading: boolean;
    recommendations: string[];
    errorMessage: string;
    onRecommend: (team: number) => void;
    onCreateBuilds: (team: number) => void;
    showTeamSwap?: boolean;
    selectTeam?: boolean;
    setSelectTeam?: (v: boolean) => void;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-3"
        >
            <div className="flex flex-wrap items-center gap-2.5">
                {selectedOwned ? (
                    <button
                        className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-primary text-bg-darkest font-bold text-sm hover:brightness-110 active:scale-[0.98] transition-all shadow-md shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-bg-dark"
                        onClick={() => onRecommend(teamNumber)}
                        disabled={aiLoading || finalizeLoading}
                        aria-busy={aiLoading || finalizeLoading}
                    >
                        {aiLoading ? (
                            <span className="flex items-center gap-2">
                                <span className="h-3 w-3 rounded-full bg-bg-darkest animate-pulse shrink-0" aria-hidden="true" />
                                Building Team {teamNumber}...
                            </span>
                        ) : `Build AI Team${showTeamSwap ? ` ${teamNumber}` : ""}`}
                    </button>
                ) : (
                    <button
                        className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-primary text-bg-darkest font-bold text-sm hover:brightness-110 active:scale-[0.98] transition-all shadow-md shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-bg-dark"
                        onClick={() => onCreateBuilds(teamNumber)}
                        disabled={aiLoading || finalizeLoading}
                        aria-busy={aiLoading || finalizeLoading}
                    >
                        {aiLoading ? (
                            <span className="flex items-center gap-2">
                                <span className="h-3 w-3 rounded-full bg-bg-darkest animate-pulse shrink-0" aria-hidden="true" />
                                Creating Builds...
                            </span>
                        ) : `Create Builds${showTeamSwap ? ` For Team ${teamNumber}` : ""}`}
                    </button>
                )}
                {showTeamSwap && (
                    <label className="flex gap-2 font-medium items-center cursor-pointer text-sm bg-bg-light/40 border border-bg-light/70 px-3 py-2 rounded-xl">
                        <input
                            type="checkbox"
                            checked={selectTeam}
                            onChange={() => setSelectTeam(!selectTeam)}
                            className="accent-primary"
                            aria-label={`Switch to Team ${selectTeam ? 2 : 1}`}
                        />
                        <span>Team {selectTeam ? 1 : 2}</span>
                    </label>
                )}
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={recommendations.length > 0 ? "content" : "empty"}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col gap-2 max-h-[70vh] overflow-y-auto rounded-xl border border-bg-light/70 bg-bg-light/25 p-5 text-pretty shadow-sm"
                >
                    {aiLoading ? (
                        <div className="flex flex-col gap-3 py-4">
                            <Skeleton className="h-4 w-full rounded" />
                            <Skeleton className="h-4 w-5/6 rounded" />
                            <Skeleton className="h-4 w-4/5 rounded" />
                            <Skeleton className="h-4 w-full rounded" />
                            <Skeleton className="h-4 w-3/4 rounded" />
                        </div>
                    ) : recommendations.length > 0 ? (
                        recommendations.map((rec, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.08 }}
                            >
                                <Markdown content={rec} />
                            </motion.div>
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center gap-2 py-8 text-center">
                            <p className="text-text/70 text-sm font-medium">{errorMessage}</p>
                            <span className="text-text/40 text-xs">
                                Click or drag characters from the list below into the team slots above to generate team builds.
                            </span>
                        </div>
                    )}
                    {finalizeLoading && (
                        <div className="flex flex-col gap-2 pt-4 border-t border-bg-light/30">
                            <Skeleton className="h-4 w-full rounded" />
                            <Skeleton className="h-4 w-4/5 rounded" />
                            <Skeleton className="h-4 w-2/3 rounded" />
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>
        </motion.div>
    );
}

// ─── public export (wraps with DragProvider) ─────────────────────────────────

export default function TeamBuilder({ CharacterData }: { CharacterData: Character[] }) {
    return (
        <DragProvider>
            <TeamBuilderInner CharacterData={CharacterData} />
        </DragProvider>
    );
}
