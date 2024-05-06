"use client"
import Image from "next/image";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import { Link as Scroll } from "react-scroll"
export default function ElementsPage() {
    return <>
        <NavBar />
        <main className="pt-8 md:pt-16 px-8 md:px-16 mb-20 w-full min-h-[100dvh] flex flex-col gap-4 items-center">
            <div className="flex flex-col gap-5 max-w-screen-2xl w-full">
                <h1 className="text-3xl text-primary">Elements</h1>
                <section className="flex flex-col gap-1">
                    <h2 className="text-xl font-bold">Elemental Debuffs</h2>
                    <p>Mastering the art of combining various elements is essential for success in Genshin Impact combat.</p>
                    <div className="flex gap-2 flex-col p-2 rounded-xl bg-bg-dark">
                        <GridItem title="Engulfing Storm" effect="Continuously drains Energy Recharge." element={["electro"]} />
                        <GridItem title="Slowing Water" effect="Increases skill CD durations." element={["hydro"]} />
                        <GridItem title="Smoldering Flames" effect="Continuously drains Energy Recharge." element={["pyro"]} />
                        <GridItem title="Condensed Ice" effect="Increases stamina consumption." element={["cryo"]} />
                    </div>
                </section>
                <section className="w-full flex flex-col">
                    <h2 className="text-xl font-bold">Elemental Chart</h2>
                    <p>Proficiency in integrating different elements is pivotal for strategic success on the battlefield.</p>
                    <table className="table-cell border-collapse w-full rounded-xl text-center ">
                        <thead>
                            <tr >
                                <td style={{ minWidth: '100px' }}></td>
                                <td align="center"><Image src={`/elements/electro.webp`} width={35} height={35} alt={`electro icon`} title={`electro`} /></td>
                                <td align="center"><Image src={`/elements/hydro.webp`} width={35} height={35} alt={`hydro icon`} title={`hydro`} /></td>
                                <td align="center"><Image src={`/elements/pyro.webp`} width={35} height={35} alt={`pyro icon`} title={`pyro`} /></td>
                                <td align="center"><Image src={`/elements/cryo.webp`} width={35} height={35} alt={`cryo icon`} title={`cryo`} /></td>
                                <td align="center"><Image src={`/elements/dendro.webp`} width={35} height={35} alt={`dendro icon`} title={`dendro`} /></td>
                                <td align="center"><Image src={`/elements/anemo.webp`} width={35} height={35} alt={`anemo icon`} title={`anemo`} /></td>
                                <td align="center"><Image src={`/elements/geo.webp`} width={35} height={35} alt={`geo icon`} title={`geo`} /></td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td align="center"><Image src={`/elements/electro.webp`} width={35} height={35} alt={`electro icon`} title={`electro`} className=""/></td>
                                <td><Scroll to="" smooth={true} className="">-</Scroll></td>
                                <td><Scroll to="Electro-Charged" smooth={true} className="">Electro-Charged</Scroll></td>
                                <td><Scroll to="Overloaded" smooth={true} className="">Overloaded</Scroll></td>
                                <td><Scroll to="Superconduct" smooth={true} className="">Superconduct</Scroll></td>
                                <td><Scroll to="Quicken" smooth={true} className="">Quicken, Spread, Aggravate</Scroll></td>
                                <td rowSpan={4}><Scroll to="Swirl" smooth={true} className="">Swirl</Scroll></td>
                                <td rowSpan={4}><Scroll to="Crystalize" smooth={true} className="">Crystalize</Scroll></td>
                            </tr>
                            <tr>
                                <td align="center"><Image src={`/elements/hydro.webp`} width={35} height={35} alt={`hydro icon`} title={`hydro`} /></td>
                                <td><Scroll to="Electro-Charged" smooth={true} className="">Electro-Charged</Scroll></td>
                                <td><Scroll to="" smooth={true} className="">-</Scroll></td>
                                <td><Scroll to="Vaporize" smooth={true} className="">Vaporize</Scroll></td>
                                <td><Scroll to="Frozen" smooth={true} className="">Frozen</Scroll></td>
                                <td><Scroll to="Bloom" smooth={true} className="">Bloom</Scroll></td>
                            </tr>
                            <tr>
                                <td align="center"><Image src={`/elements/pyro.webp`} width={35} height={35} alt={`pyro icon`} title={`pyro`} /></td>
                                <td><Scroll to="Electro-Charged" smooth={true} className="">Electro-Charged</Scroll></td>
                                <td><Scroll to="Vaporize" smooth={true} className="">Vaporize</Scroll></td>
                                <td><Scroll to="" smooth={true} className="">-</Scroll></td>
                                <td><Scroll to="Melt" smooth={true} className="">Melt</Scroll></td>
                                <td><Scroll to="Burning" smooth={true} className="">Burning</Scroll></td>
                            </tr>
                            <tr>
                                <td align="center"><Image src={`/elements/cryo.webp`} width={35} height={35} alt={`cryo icon`} title={`cryo`} /></td>
                                <td><Scroll to="Superconduct" smooth={true} className="">Superconduct</Scroll></td>
                                <td><Scroll to="Frozen" smooth={true} className="">Frozen</Scroll></td>
                                <td><Scroll to="Melt" smooth={true} className="">Melt</Scroll></td>
                                <td><Scroll to="" smooth={true} className="">-</Scroll></td>
                                <td><Scroll to="" smooth={true} className="">-</Scroll></td>
                            </tr>
                            <tr>
                                <td align="center"><Image src={`/elements/dendro.webp`} width={35} height={35} alt={`dendro icon`} title={`dendro`} /></td>
                                <td><Scroll to="Quicken" smooth={true} className="">Quicken, Spread, Aggravate</Scroll></td>
                                <td><Scroll to="Bloom" smooth={true} className="">Bloom</Scroll></td>
                                <td><Scroll to="Burning" smooth={true} className="">Burning</Scroll></td>
                                <td><Scroll to="" smooth={true} className="">-</Scroll></td>
                                <td><Scroll to="" smooth={true} className="">-</Scroll></td>
                                <td><Scroll to="Crystalize" smooth={true} className="">-</Scroll></td>
                                <td><Scroll to="Swirl" smooth={true} className="">-</Scroll></td>
                            </tr>
                            <tr>
                                <td align="center"><Image src={`/elements/anemo.webp`} width={35} height={35} alt={`anemo icon`} title={`anemo`} /></td>
                                <td colSpan={4}><Scroll to="Swirl" smooth={true} className="">Swirl</Scroll></td>
                                <td><Scroll to="" smooth={true} className="">-</Scroll></td>
                                <td><Scroll to="" smooth={true} className="">-</Scroll></td>
                                <td><Scroll to="" smooth={true} className="">-</Scroll></td>
                            </tr>
                            <tr>
                                <td align="center"><Image src={`/elements/geo.webp`} width={35} height={35} alt={`geo icon`} title={`geo`} /></td>
                                <td colSpan={4}><Scroll to="Crystalize" smooth={true} className="">Crystalize</Scroll></td>
                                <td><Scroll to="" smooth={true} className="">-</Scroll></td>
                                <td><Scroll to="" smooth={true} className="">-</Scroll></td>
                                <td><Scroll to="" smooth={true} className="">-</Scroll></td>
                            </tr>
                        </tbody>
                    </table>
                </section>

                <section className="flex flex-col gap-1">
                    <h2 className="text-xl font-bold">Elemental Reactions</h2>
                    <p>Mastering the art of combining various elements is essential for success in Genshin Impact combat.</p>
                    <div className="flex gap-2 flex-col p-2 rounded-xl bg-bg-dark">
                        <GridItem title="Swirl" effect="Deals extra elemental damage and spreads the effect." element={["anemo"]} element2={["electro", "hydro", "pyro", "cryo"]} />
                        <GridItem title="Crystalize" effect="Creates a crystal that will provide a shield when picked up." element={["geo"]} element2={["electro", "hydro", "pyro", "cryo"]} />
                        <GridItem title="Electro-Charged" effect="Deals Electro DMG over time." element={["electro"]} element2={["hydro"]} />
                        <GridItem title="Overloaded" effect="Increases stamina consumption." element={["electro"]} element2={["pyro"]} />
                        <GridItem title="Superconduct" effect="Deals AoE Cryo DMG and reduces the target's Physical RES by 50%." element={["electro"]} element2={["cryo"]} />
                        <GridItem title="Melt" effect="Deals extra damage." element={["cryo"]} element2={["pyro"]} />
                        <GridItem title="Frozen" effect="Freezes the target." element={["cryo"]} element2={["hydro"]} />
                        <GridItem title="Vaporize" effect="Deals extra damage." element={["hydro"]} element2={["pyro"]} />
                        <GridItem title="Burning" effect="Deals AoE Pyro DoT and applies Pyro." element={["dendro"]} element2={["pyro"]} />
                        <GridItem title="Bloom" effect="Creates a Dendro Core that explodes after 6 seconds, dealing AoE Dendro DMG." element={["dendro"]} element2={["hydro"]} />
                        <GridItem title="Hyperbloom" effect="Triggered when applying Electro to a Dendro Core. Transforms the Dendro Core into a homing Sprawling Shot that deals increased AoE Dendro DMG in a much smaller AoE." element={["dendro"]} element2={["hydro", "electro"]} />
                        <GridItem title="Burgeon" effect="Triggered when applying Pyro to a Dendro Core. Detonates the Dendro Core immediately, dealing increased AoE Dendro DMG." element={["dendro"]} element2={["hydro", "pyro"]} />
                        <GridItem title="Quicken" effect="Applies a Quicken aura." element={["dendro"]} element2={["electro"]} />
                        <GridItem title="Aggravate" effect="Triggered when applying Electro to an entity with the Quicken aura. Adds Flat DMG Bonus to the attack that triggers this reaction." element={["dendro"]} element2={["electro", "electro"]} />
                        <GridItem title="Spread" effect="Triggered when applying Dendro to an entity with the Quicken aura. Adds Flat DMG Bonus to the attack that triggers this reaction." element={["dendro"]} element2={["electro", "dendro"]} />
                    </div>
                </section>
                <section className="flex flex-col gap-1">
                    <h2 className="text-xl font-bold">Elemental Resonance</h2>
                    <p>When you have a full party, you will receive effects that correspond to the Elemental Types present in the party.</p>
                    <div className="flex gap-2 flex-col p-2 rounded-xl bg-bg-dark">
                        <GridItem title="Enduring Rock" effect="Increases shield strength by 15%. Additionally, characters protected by a shield will have the following special characteristics: DMG dealt increased by 15%, dealing DMG to enemies will decrease their Geo RES by 20% for 15s." element={["geo", "geo"]} />
                        <GridItem title="Fervent Flames" effect="Affected by Cryo for 40% less time. Increases ATK by 25%." element={["pyro", "pyro"]} />
                        <GridItem title="Soothing Waters" effect="Affected by Pyro for 40% less time. Increases incoming healing by 30%." element={["hydro", "hydro"]} />
                        <GridItem title="Impetuous Winds" effect="Decreases Stamina Consumption by 15%. Increases Movement SPD by 10%. Shortens Skill CD by 5%." element={["anemo", "anemo"]} />
                        <GridItem title="High Voltage" effect="Affected by Hydro for 40% less time. Superconduct, Overloaded, and Electro-Charged have a 100% chance to generate an Electro Elemental Particle (CD: 5s)." element={["electro", "electro"]} />
                        <GridItem title="Shattering Ice" effect="Affected by Electro for 40% less time. Increases CRIT Rate against enemies that are Frozen or affected by Cryo by 15%." element={["cryo", "cryo"]} />
                        <GridItem title="Sprawling Greenery" effect="After triggering Burning, Quicken, or Bloom reactions, all nearby party members gain 30 Elemental Mastery for 6s. After triggering Aggravate, Spread, Hyperbloom, or Burgeon reactions, all nearby party members gain 20 Elemental Mastery for 6s. The durations of the aforementioned effects will be counted independently." element={["dendro", "dendro"]} />
                        <GridItem title="Protective Canopy" effect="All Elemental RES +15%, Physical RES +15%." unique="Any 4 Unique Elements" />
                    </div>
                </section>
            </div>
        </main>
        <Footer />
    </>
}
function GridItem({
    title,
    element,
    element2,
    effect,
    unique,
}: {
    title: string,
    element?: string[],
    element2?: string[],
    effect: string,
    unique?: string
}) {
    return <div className="grid grid-cols-2 p-2 gap-2" id={title}>
        <div className="">
            <h3 className="font-bold text-lg">
                {title}
            </h3>
            <div className="">
                {effect}
            </div>
        </div>
        <div className="flex gap-2 w-full items-center font-bold text-xl">
            {element && element.map((el: string, index: number) => (
                <Image src={`/elements/${el}.webp`} width={35} height={35} alt={`${el} icon`} title={`${el}`} key={`${el}-${index}`} />
            ))}
            {unique && <p className="font-normal text-base">{unique}</p>}
            {element2 && " x "}
            <span className="flex flex-wrap">
                {element2 && element2.map((el: string, index: number) => (
                    <Image src={`/elements/${el}.webp`} width={35} height={35} alt={`${el} icon`} title={`${el}`} key={`${el}-${index}`} />
                ))}
            </span>
        </div>
    </div>
}