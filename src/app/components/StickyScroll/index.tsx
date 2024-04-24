import React, { useState, useLayoutEffect, useRef } from 'react'
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useScroll, useTransform } from "framer-motion";

import { Character } from "@/app/utils/types";

export default function StickyScroll({ image, data, link, params }: { image: any, data: Character, link: string, params: any }) {

    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const y = useTransform(scrollYProgress, [0, 1], ["-5%", "140%"]);

    return (
        <div className='relative md:my-[10dvh] min-h-[200dvh] p-4'>
            <div ref={targetRef} className={"flex justify-start h-full gap-5"}>
                <motion.div className={'relative hidden lg:block h-[100dvh] w-[30%]'} style={{ y }}>
                    <Image
                        src={image}
                        fill={true}
                        alt="project image"
                        priority={true}
                        className='h-full w-full object-contain'

                    />
                </motion.div>
                <div className='flex flex-col gap-3 justify-end w-full '>
                    <div className="flex flex-col gap-4">
                        <section className="flex flex-col gap-4">
                            <h2 className="text-7xl font-bold">{data.name}</h2>
                            <div className='flex flex-col-reverse md:flex-row gap-2 justify-between border-primary border-2 rounded-xl p-4 w-full'>
                                <div className="flex flex-col gap-3 ">
                                    <p><span className="font-bold">Title:</span> {data.title}</p>
                                    <p><span className="font-bold">Affiliation:</span> {data.affiliation}</p>
                                    <p><span className="font-bold">Rarity:</span> {data.rarity} Stars</p>
                                    <p><span className="font-bold">Weapon:</span> {data.weapon}</p>
                                    <p><span className="font-bold">Element:</span> {data.vision}</p>
                                    <p><span className="font-bold">Constellation:</span> {data.constellation}</p>
                                    <p><span className="font-bold">Birthday:</span> {data.birthday}</p>
                                    <p><span className="font-bold">Release:</span> {data.release}</p>
                                    <p>{data.description}</p>
                                </div>
                                {/* <Image src={`${link}/icon-side`} alt={`${params.name} Image Card`} className='w-32 h-44' width={500} height={500} /> */}
                            </div>
                        </section>
                        <section className="flex flex-col gap-4">
                            <h2 className="text-3xl font-bold">Active Skills: </h2>
                            <div className="grid grid-cols-1 gap-3">
                                {data.skillTalents.length > 1 && data.skillTalents.map((skills: any, index: number) => (
                                    <ul key={index} className="flex flex-col gap-3 border-primary border-2 rounded-xl p-4">
                                        <div className="flex gap-2 items-center ">
                                            {index == 0 && <Image src={`${link}/talent-na`} alt={`${params.name} Image Card`} width={50} height={50} />}
                                            {index == 1 && <Image src={`${link}/talent-skill`} alt={`${params.name} Image Card`} width={50} height={50} />}
                                            {index == 2 && <Image src={`${link}/talent-burst`} alt={`${params.name} Image Card`} width={50} height={50} />}
                                            <h3 className="font-bold text-2xl text-pretty">{skills.name}</h3>
                                        </div>
                                        <pre className="text-pretty text-sm leading-relaxed">{skills.description}</pre>
                                    </ul>
                                ))}
                            </div>
                        </section>
                        <section className="flex flex-col gap-4">
                            <h2 className="text-3xl font-bold">Passive Talents: </h2>
                            <div className="grid grid-cols-1 gap-3">
                                {data.passiveTalents.length > 1 && data.passiveTalents.map((passive: any, index: number) => (
                                    <ul key={index} className="flex flex-col gap-3 border-primary border-2 rounded-xl p-4">
                                        <div className="flex gap-2 items-center ">
                                            <Image src={`${link}/talent-passive-${index}`} alt={`${params.name} Image Card`} width={50} height={50} />
                                            <h3 className="font-bold text-2xl text-pretty">{passive.name}</h3>
                                        </div>
                                        <p className="text-pretty text-sm leading-relaxed">{passive.description}</p>
                                    </ul>
                                ))}
                            </div>
                        </section>
                        <section className="flex flex-col gap-4">
                            <h2 className="text-3xl font-bold">Constellations: </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {data.constellations.length > 1 && data.constellations.map((constell: any, index: number) => (
                                    <ul key={index} className="flex flex-col gap-3 border-primary border-2 rounded-xl p-4">
                                        <div className="flex gap-2 items-center ">
                                            <Image src={`${link}/constellation-${constell.level}`} alt={`${params.name} Image Card`} width={50} height={50} />
                                            <h3 className="font-bold text-2xl text-pretty">{constell.level}. {constell.name}</h3>
                                        </div>
                                        <p className="text-pretty text-sm leading-relaxed">{constell.description}</p>

                                    </ul>
                                ))}
                            </div>
                        </section>
                    </div>
                </div>
            </div>


        </div>
    )
}
