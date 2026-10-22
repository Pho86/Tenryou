"use client"
import Image from "next/image";
import { Link as Scroll } from "react-scroll"
import PageHeader from "../components/PageHeader";

function ElementCard({ title, element }: { title: string, element: string[] }) {
    return (
        <div className="flex flex-col items-center gap-3 rounded-xl border border-bg-light/60 bg-bg-light/15 p-6 transition-colors hover:border-primary/40">
            <div className="flex flex-wrap justify-center gap-3">
                {element.map((el: string, index: number) => (
                    <Image
                        key={`${el}-${index}`}
                        src={`/elements/${el}.webp`}
                        width={56}
                        height={56}
                        alt={`${el} icon`}
                        title={`${el}`}
                    />
                ))}
            </div>
            <p className="text-sm font-semibold text-text/80">{title}</p>
        </div>
    )
}

function ReactionRow({
    title,
    effect,
    element,
    element2,
    unique,
}: {
    title: string,
    element?: string[],
    element2?: string[],
    effect?: string,
    unique?: string
}) {
    return (
        <div className="grid gap-4 border-t border-bg-light/40 py-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-center" id={title}>
            <div className="flex flex-col gap-2">
                <h3 className="text-lg font-bold text-text">{title}</h3>
                <p className="text-sm leading-relaxed text-text/70">{effect}</p>
            </div>
            <div className="flex flex-wrap items-center gap-3 justify-self-start md:justify-self-end">
                {element && element.map((el: string, index: number) => (
                    <Image
                        src={`/elements/${el}.webp`}
                        width={36}
                        height={36}
                        alt={`${el} icon`}
                        title={`${el}`}
                        key={`${el}-${index}`}
                    />
                ))}
                {unique && <p className="text-sm text-text/60">{unique}</p>}
                {element2 && element?.length ? (
                    <span className="text-text/40">+</span>
                ) : null}
                {element2 && element2.map((el: string, index: number) => (
                    <Image
                        src={`/elements/${el}.webp`}
                        width={36}
                        height={36}
                        alt={`${el} icon`}
                        title={`${el}`}
                        key={`${el}-${index}`}
                    />
                ))}
            </div>
        </div>
    )
}

export default function ElementsPage() {
    return (
        <main className="flex w-full flex-col gap-16 px-4 py-8">
            <PageHeader
                eyebrow="MECHANICS"
                title="Elements"
                description="Master elemental synergies, reactions, and resonance to build stronger teams."
            />

            <section className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                    <h2 className="text-2xl font-bold text-text md:text-3xl">The Seven Elements</h2>
                    <p className="text-text/65">Teyvat&apos;s core elemental forces.</p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <ElementCard title="Pyro" element={["Pyro"]} />
                    <ElementCard title="Hydro" element={["Hydro"]} />
                    <ElementCard title="Anemo" element={["Anemo"]} />
                    <ElementCard title="Electro" element={["Electro"]} />
                    <ElementCard title="Dendro" element={["Dendro"]} />
                    <ElementCard title="Cryo" element={["Cryo"]} />
                    <ElementCard title="Geo" element={["Geo"]} />
                </div>
            </section>

            <section className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                    <h2 className="text-2xl font-bold text-text md:text-3xl">Elemental Debuffs</h2>
                    <p className="text-text/65">Environmental effects that challenge even seasoned Travelers.</p>
                </div>
                <div className="flex flex-col divide-y divide-bg-light/40 border-y border-bg-light/40">
                    <ReactionRow title="Engulfing Storm" effect="Continuously drains Energy Recharge." element={["Electro"]} />
                    <ReactionRow title="Slowing Water" effect="Increases skill CD durations." element={["Hydro"]} />
                    <ReactionRow title="Smoldering Flames" effect="Continuously drains Energy Recharge." element={["Pyro"]} />
                    <ReactionRow title="Condensed Ice" effect="Increases stamina consumption." element={["Cryo"]} />
                </div>
            </section>

            <section className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                    <h2 className="text-2xl font-bold text-text md:text-3xl">Elemental Chart</h2>
                    <p className="text-text/65">Quick reference for which elements interact.</p>
                </div>
                <div className="overflow-x-auto rounded-xl border border-bg-light/60">
                    <table className="w-full min-w-[900px] border-collapse text-center">
                        <thead>
                            <tr className="border-b border-bg-light/60 bg-bg-dark">
                                <th className="p-3"></th>
                                <th className="p-3"><Image src={`/elements/Electro.webp`} width={32} height={32} alt={`electro icon`} title={`electro`} className="mx-auto" /></th>
                                <th className="p-3"><Image src={`/elements/Hydro.webp`} width={32} height={32} alt={`hydro icon`} title={`hydro`} className="mx-auto" /></th>
                                <th className="p-3"><Image src={`/elements/Pyro.webp`} width={32} height={32} alt={`pyro icon`} title={`pyro`} className="mx-auto" /></th>
                                <th className="p-3"><Image src={`/elements/Cryo.webp`} width={32} height={32} alt={`cryo icon`} title={`cryo`} className="mx-auto" /></th>
                                <th className="p-3"><Image src={`/elements/Dendro.webp`} width={32} height={32} alt={`dendro icon`} title={`dendro`} className="mx-auto" /></th>
                                <th className="p-3"><Image src={`/elements/Anemo.webp`} width={32} height={32} alt={`anemo icon`} title={`anemo`} className="mx-auto" /></th>
                                <th className="p-3"><Image src={`/elements/Geo.webp`} width={32} height={32} alt={`geo icon`} title={`geo`} className="mx-auto" /></th>
                            </tr>
                        </thead>
                        <tbody className="text-sm text-text/80">
                            <tr className="border-b border-bg-light/40">
                                <td className="p-3"><Image src={`/elements/Electro.webp`} width={32} height={32} alt={`electro icon`} title={`electro`} className="mx-auto" /></td>
                                <td className="p-3">—</td>
                                <td className="p-3"><Scroll to="Electro-Charged" smooth={true} className="cursor-pointer text-primary">Electro-Charged</Scroll></td>
                                <td className="p-3"><Scroll to="Overloaded" smooth={true} className="cursor-pointer text-primary">Overloaded</Scroll></td>
                                <td className="p-3"><Scroll to="Superconduct" smooth={true} className="cursor-pointer text-primary">Superconduct</Scroll></td>
                                <td className="p-3"><Scroll to="Quicken" smooth={true} className="cursor-pointer text-primary">Quicken Â· Spread Â· Aggravate</Scroll></td>
                                <td className="p-3"><Scroll to="Swirl" smooth={true} className="cursor-pointer text-primary">Swirl</Scroll></td>
                                <td className="p-3"><Scroll to="Crystalize" smooth={true} className="cursor-pointer text-primary">Crystalize</Scroll></td>
                            </tr>
                            <tr className="border-b border-bg-light/40">
                                <td className="p-3"><Image src={`/elements/Hydro.webp`} width={32} height={32} alt={`hydro icon`} title={`hydro`} className="mx-auto" /></td>
                                <td className="p-3"><Scroll to="Electro-Charged" smooth={true} className="cursor-pointer text-primary">Electro-Charged</Scroll></td>
                                <td className="p-3">—</td>
                                <td className="p-3"><Scroll to="Vaporize" smooth={true} className="cursor-pointer text-primary">Vaporize</Scroll></td>
                                <td className="p-3"><Scroll to="Frozen" smooth={true} className="cursor-pointer text-primary">Frozen</Scroll></td>
                                <td className="p-3"><Scroll to="Bloom" smooth={true} className="cursor-pointer text-primary">Bloom</Scroll></td>
                                <td className="p-3"><Scroll to="Swirl" smooth={true} className="cursor-pointer text-primary">Swirl</Scroll></td>
                                <td className="p-3"><Scroll to="Crystalize" smooth={true} className="cursor-pointer text-primary">Crystalize</Scroll></td>
                            </tr>
                            <tr className="border-b border-bg-light/40">
                                <td className="p-3"><Image src={`/elements/Pyro.webp`} width={32} height={32} alt={`pyro icon`} title={`pyro`} className="mx-auto" /></td>
                                <td className="p-3"><Scroll to="Overloaded" smooth={true} className="cursor-pointer text-primary">Overloaded</Scroll></td>
                                <td className="p-3"><Scroll to="Vaporize" smooth={true} className="cursor-pointer text-primary">Vaporize</Scroll></td>
                                <td className="p-3">—</td>
                                <td className="p-3"><Scroll to="Melt" smooth={true} className="cursor-pointer text-primary">Melt</Scroll></td>
                                <td className="p-3"><Scroll to="Burning" smooth={true} className="cursor-pointer text-primary">Burning</Scroll></td>
                                <td className="p-3"><Scroll to="Swirl" smooth={true} className="cursor-pointer text-primary">Swirl</Scroll></td>
                                <td className="p-3"><Scroll to="Crystalize" smooth={true} className="cursor-pointer text-primary">Crystalize</Scroll></td>
                            </tr>
                            <tr className="border-b border-bg-light/40">
                                <td className="p-3"><Image src={`/elements/Cryo.webp`} width={32} height={32} alt={`cryo icon`} title={`cryo`} className="mx-auto" /></td>
                                <td className="p-3"><Scroll to="Superconduct" smooth={true} className="cursor-pointer text-primary">Superconduct</Scroll></td>
                                <td className="p-3"><Scroll to="Frozen" smooth={true} className="cursor-pointer text-primary">Frozen</Scroll></td>
                                <td className="p-3"><Scroll to="Melt" smooth={true} className="cursor-pointer text-primary">Melt</Scroll></td>
                                <td className="p-3">—</td>
                                <td className="p-3">—</td>
                                <td className="p-3"><Scroll to="Swirl" smooth={true} className="cursor-pointer text-primary">Swirl</Scroll></td>
                                <td className="p-3"><Scroll to="Crystalize" smooth={true} className="cursor-pointer text-primary">Crystalize</Scroll></td>
                            </tr>
                            <tr className="border-b border-bg-light/40">
                                <td className="p-3"><Image src={`/elements/Dendro.webp`} width={32} height={32} alt={`dendro icon`} title={`dendro`} className="mx-auto" /></td>
                                <td className="p-3"><Scroll to="Quicken" smooth={true} className="cursor-pointer text-primary">Quicken Â· Spread Â· Aggravate</Scroll></td>
                                <td className="p-3"><Scroll to="Bloom" smooth={true} className="cursor-pointer text-primary">Bloom</Scroll></td>
                                <td className="p-3"><Scroll to="Burning" smooth={true} className="cursor-pointer text-primary">Burning</Scroll></td>
                                <td className="p-3">—</td>
                                <td className="p-3">—</td>
                                <td className="p-3"><Scroll to="Swirl" smooth={true} className="cursor-pointer text-primary">Swirl</Scroll></td>
                                <td className="p-3"><Scroll to="Crystalize" smooth={true} className="cursor-pointer text-primary">Crystalize</Scroll></td>
                            </tr>
                            <tr className="border-b border-bg-light/40">
                                <td className="p-3"><Image src={`/elements/Anemo.webp`} width={32} height={32} alt={`anemo icon`} title={`anemo`} className="mx-auto" /></td>
                                <td colSpan={4} className="p-3"><Scroll to="Swirl" smooth={true} className="cursor-pointer text-primary">Swirl</Scroll></td>
                                <td className="p-3">—</td>
                                <td className="p-3">—</td>
                                <td className="p-3">—</td>
                            </tr>
                            <tr>
                                <td className="p-3"><Image src={`/elements/Geo.webp`} width={32} height={32} alt={`geo icon`} title={`geo`} className="mx-auto" /></td>
                                <td colSpan={4} className="p-3"><Scroll to="Crystalize" smooth={true} className="cursor-pointer text-primary">Crystalize</Scroll></td>
                                <td className="p-3">—</td>
                                <td className="p-3">—</td>
                                <td className="p-3">—</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            <section className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                    <h2 className="text-2xl font-bold text-text md:text-3xl">Elemental Reactions</h2>
                    <p className="text-text/65">Advanced reactions for optimized teamplay.</p>
                </div>
                <div className="flex flex-col divide-y divide-bg-light/40 border-y border-bg-light/40">
                    <ReactionRow title="Swirl" effect="Deals extra elemental damage and spreads the effect." element={["Anemo"]} element2={["Electro", "Hydro", "Pyro", "Cryo"]} />
                    <ReactionRow title="Crystalize" effect="Creates a crystal that will provide a shield when picked up." element={["Geo"]} element2={["Electro", "Hydro", "Pyro", "Cryo"]} />
                    <ReactionRow title="Electro-Charged" effect="Deals Electro DMG over time." element={["Electro"]} element2={["Hydro"]} />
                    <ReactionRow title="Overloaded" effect="Triggers an explosion that deals AoE Pyro DMG." element={["Electro"]} element2={["Pyro"]} />
                    <ReactionRow title="Superconduct" effect="Deals AoE Cryo DMG and reduces the target's Physical RES by 50%." element={["Electro"]} element2={["Cryo"]} />
                    <ReactionRow title="Melt" effect="Deals increased damage based on the order of application." element={["Cryo"]} element2={["Pyro"]} />
                    <ReactionRow title="Frozen" effect="Freezes the target, making them unable to move." element={["Cryo"]} element2={["Hydro"]} />
                    <ReactionRow title="Vaporize" effect="Deals increased damage based on the order of application." element={["Hydro"]} element2={["Pyro"]} />
                    <ReactionRow title="Burning" effect="Deals AoE Pyro DoT over time." element={["Dendro"]} element2={["Pyro"]} />
                    <ReactionRow title="Bloom" effect="Creates a Dendro Core that explodes after 6 seconds, dealing AoE Dendro DMG." element={["Dendro"]} element2={["Hydro"]} />
                    <ReactionRow title="Hyperbloom" effect="Transforms a Dendro Core into a homing Sprawling Shot that deals increased AoE Dendro DMG." element={["Dendro"]} element2={["Hydro", "Electro"]} />
                    <ReactionRow title="Burgeon" effect="Detonates a Dendro Core immediately, dealing increased AoE Dendro DMG." element={["Dendro"]} element2={["Hydro", "Pyro"]} />
                    <ReactionRow title="Quicken" effect="Applies a Quicken aura for further Dendro/Electro interactions." element={["Dendro"]} element2={["Electro"]} />
                    <ReactionRow title="Aggravate" effect="Adds Flat DMG Bonus to Electro attacks against Quicken-affected targets." element={["Dendro"]} element2={["Electro"]} />
                    <ReactionRow title="Spread" effect="Adds Flat DMG Bonus to Dendro attacks against Quicken-affected targets." element={["Dendro"]} element2={["Dendro"]} />
                    <ReactionRow title="Nilou Bloom" effect="Creates Bountiful Cores that burst faster and have a larger AoE, dealing increased Dendro DMG." element={["Dendro"]} element2={["Hydro"]} />
                    <ReactionRow title="Catalyze" effect="Applies Quicken to enable Aggravate or Spread reactions." element={["Dendro"]} element2={["Electro"]} />
                    <ReactionRow title="Lunar-Charged" effect="Triggers under specific conditions with Hydro and Electro, dealing additional Electro DMG with different mechanics." element={["Electro"]} element2={["Hydro"]} />
                    <ReactionRow title="Lunar-Bloom" effect="Bloom reactions may be converted to Lunar-Bloom, creating specialized cores with unique properties." element={["Dendro"]} element2={["Hydro"]} />
                    <ReactionRow title="Lunar-Crystallize" effect="Crystallize reactions can produce Lunar-Crystallize effects under specific conditions." element={["Geo"]} element2={["Electro", "Hydro", "Pyro", "Cryo"]} />
                </div>
            </section>

            <section className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                    <h2 className="text-2xl font-bold text-text md:text-3xl">Elemental Resonance</h2>
                    <p className="text-text/65">Party-wide bonuses when running multiple of the same element.</p>
                </div>
                <div className="flex flex-col divide-y divide-bg-light/40 border-y border-bg-light/40">
                    <ReactionRow title="Enduring Rock" effect="Shield strength +15%. DMG dealt +15% while shielded, and dealing Geo DMG decreases enemy Geo RES by 20% for 15s." element={["Geo", "Geo"]} />
                    <ReactionRow title="Fervent Flames" effect="Affected by Cryo for 40% less time. ATK +25%." element={["Pyro", "Pyro"]} />
                    <ReactionRow title="Soothing Waters" effect="Affected by Pyro for 40% less time. Incoming healing +30%." element={["Hydro", "Hydro"]} />
                    <ReactionRow title="Impetuous Winds" effect="Stamina consumption -15%, Movement SPD +10%, Skill CD -5%." element={["Anemo", "Anemo"]} />
                    <ReactionRow title="High Voltage" effect="Affected by Hydro for 40% less time. Electro-related reactions have a 100% chance to generate an Electro Elemental Particle (CD: 5s)." element={["Electro", "Electro"]} />
                    <ReactionRow title="Shattering Ice" effect="Affected by Electro for 40% less time. CRIT Rate +15% against Frozen or Cryo-affected enemies." element={["Cryo", "Cryo"]} />
                    <ReactionRow title="Sprawling Greenery" effect="Grants Elemental Mastery after Bloom/Quicken/Burning reactions. Stronger for Hyperbloom/Burgeon/Aggravate/Spread." element={["Dendro", "Dendro"]} />
                    <ReactionRow title="Lunar-Charged" effect="When Electro-Charged triggers, it can also deal Lunar-Charged DMG in certain conditions depending on the team composition and talents." element={["Electro", "Hydro"]} />
                    <ReactionRow title="Lunar-Bloom" effect="Bloom reactions may be converted into Lunar-Bloom, creating special cores with enhanced effects based on the team's mechanics." element={["Dendro", "Hydro"]} />
                    <ReactionRow title="Lunar-Crystallize" effect="Crystallize reactions can be modified under specific conditions to create Lunar-Crystallize effects." element={["Geo"]} />
                    <ReactionRow title="Protective Canopy" effect="All Elemental RES +15%, Physical RES +15%." unique="Any 4 Unique Elements" />
                </div>
            </section>
        </main>
    );
}
