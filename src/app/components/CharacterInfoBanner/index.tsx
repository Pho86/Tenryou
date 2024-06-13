"use client"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useState, } from "react"
import { Character } from "@/app/types/character"

export default function InfoCharacterBanner({
    characterData, params
}: {
    characterData: Character,
    params: {
        name: string
    },
}) {
    const [minimizeName, setMinimizedName] = useState<boolean>(false);
    const sectionRef = useRef(null);
    const motionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
        layoutEffect: false
    });
    const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
    return <section className={`bg-bg-dark w-screen -mt-16 overflow-hidden`} ref={motionRef}>
        <div className="p-0 pt-0 flex flex-col h-[105dvh] relative" ref={sectionRef}>
            <motion.div className="absolute w-full max-h-[100dvh] object-contain opacity-60 "
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: .5 }}
                viewport={{ once: true }}
            >
                <Image src={`/regions/${characterData.region}.webp`} width={1500} height={1500} className="w-full max-h-[110dvh] object-contain opacity-60 z-[-15]" alt={`${characterData.region} icon`} priority />
            </motion.div>
            <motion.div className="absolute h-[110dvh] w-full "
                initial={{ opacity: 0, scale: 1.1, y: 100, }}
                animate={{ opacity: 1, scale: 1, y: [100, -15, 0] }}
                transition={{ delay: 1, duration: 1.2, ease: "easeInOut" }}
                viewport={{ once: true }}
                style={{ y: y, }}
            >
                <Image src={`https://enka.network/ui/UI_Gacha_AvatarImg_${characterData.fileName}.png`} alt={`${params.name} Image Card`} width={3000} height={3000} draggable={false} className="pointer-events-none object-cover w-full h-full transition-all hover:scale-[101%] -z-[10]" priority />
            </motion.div>
            <div className="w-full flex items-center justify-center pl-8" >
                <motion.div className="max-w-screen-2xl w-full md:pt-16 z-10 "
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.8, duration: .8 }}
                    viewport={{ once: true }}
                    drag={true}
                    dragConstraints={sectionRef}
                >
                    <div className="md:max-w-2xl flex flex-col gap-3 justify-start">
                        <div className="flex flex-col gap-2 mt-10 bg-bg p-4 border-primary border-2 rounded-lg ">
                            <div className="w-full flex justify-between">
                                <div className="flex gap-4 items-center">
                                    <h1 className="font-bold text-4xl md:text-5xl text-primary text-pretty rounded-xl ">{characterData.name}</h1>
                                    <Image src={`/elements/${characterData.elementText}.webp`} width={150} height={150} className="w-16 h-16" alt={`${characterData.elementText} icon`} />
                                </div>
                                <div >
                                    <p className="text-xl cursor-pointer rounded-xl p-1" onClick={() => { setMinimizedName(!minimizeName) }}>{minimizeName ? "🗕" : "🔲"}</p>
                                </div>
                            </div>
                            {minimizeName &&
                                <>
                                    <div className="flex gap-4 items-start md:text-center text-pretty flex-col md:flex-row ">
                                        <blockquote className="italic font-semibold text-2xl ">{characterData.title}</blockquote>
                                        <p className="font-bold md:text-nowrap text-xl text-primary">{Array(characterData.rarity).fill('★ ').join('')}</p>
                                    </div>
                                    <blockquote className="text-pretty italic">{characterData.description}</blockquote>
                                </>
                            }
                        </div>
                        {minimizeName && <section className="flex flex-col bg-bg gap-2 justify-between border-primary border-2 rounded-xl p-4">
                            {characterData.affiliation && <p><span className="font-bold">Affiliation:</span> {characterData.affiliation}</p>}
                            <p className="flex gap-1"><span className="font-bold">Weapon:</span> <Image src={`/weapons/${characterData.weaponText}.png`} width={30} height={20} alt={`${characterData.weaponText} image weapon`} />{characterData.weaponText}</p>
                            {characterData.region && <p><span className="font-bold">Region:</span> {characterData.region}</p>}
                            {characterData.constellation && <p><span className="font-bold">Constellation:</span> {characterData.constellation}</p>}
                            {characterData.birthday && <p><span className="font-bold">Birthday:</span> {characterData.birthday}</p>}
                            <div className="flex gap-2 "><span className="font-bold text-nowrap">Voice Actor:</span>
                                <div className="flex gap-4 flex-wrap">
                                    {characterData.cv.english && <p><span className="font-semibold">EN:</span> {characterData.cv.english}</p>}
                                    {characterData.cv.japanese && <p><span className="font-semibold">JP:</span> {characterData.cv.japanese}</p>}
                                    {characterData.cv.chinese && <p><span className="font-semibold">CN:</span> {characterData.cv.chinese}</p>}
                                    {characterData.cv.korean && <p><span className="font-semibold">KR:</span> {characterData.cv.korean}</p>}
                                </div>
                            </div>
                        </section>}
                    </div>
                </motion.div>
            </div>
        </div>
    </section>
}