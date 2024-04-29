"use client"
import Image from "next/image"
import Link from "next/link"
import { motion, useMotionValue, useScroll, useTransform } from "framer-motion"
import { useRef, useState } from "react"
export default function InfoCharacterBanner({
    data, params
}: {
    data: any,
    params: any,
}) {
    const [minimizeName, setMinimizedName] = useState<boolean>(true);
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
        layoutEffect: false
    });
    const y = useTransform(scrollYProgress, [0, 1], ["-0%", "8%"]);

    return <section className={`bg-bg-dark w-full overflow-hidden`} >
        <div className="p-0 pt-0 flex flex-col lg:h-[100dvh] relative w-full " ref={sectionRef}>
            <motion.div className="lg:absolute w-full max-h-[100dvh] object-contain opacity-60 "
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: .5 }}
                viewport={{ once: true }}

            >
                <Image src={`/regions/${data.region}.webp`} width={1500} height={1500} className="w-full max-h-[100dvh] object-contain opacity-60 z-[-15]" alt={`${data.region} icon`} priority />
            </motion.div>
            <motion.div className="md:pl-0 absolute h-[100dvh] w-full "
                initial={{ opacity: 0, scale: 1.1, y: 100, filter: "grayscale:(1)", x: -10 }}
                animate={{ opacity: 1, scale: 1, y: [100, -15, 0], x: [-10, -10, -10, -10, 0], filter: "grayscale:(1)" }}
                transition={{ delay: 1, duration: 1.2, ease: "easeInOut" }}
                viewport={{ once: true }}
                style={{ y: y, }}
            >
                <Image src={`/db/characters/${data.images.filename_gachaSplash}.png`} alt={`${params.name} Image Card`} width={3000} height={3000} draggable={false} className="pointer-events-none object-cover w-full h-full transition-all hover:scale-[101%] -z-[10]" priority />
            </motion.div>
            <motion.div className="md:max-w-2xl flex flex-col gap-3 justify-start pt-32 md:pt-16 z-10 p-4 md:p-8"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.8, duration: .8 }}
                viewport={{ once: true }}
            >
                <div className="flex flex-col gap-2 mt-10 bg-bg p-4 border-primary border-2 rounded-lg">
                    <div className="w-full flex justify-between">
                        <div className="flex gap-4 items-center">
                            <h1 className="font-bold text-4xl md:text-5xl text-pretty rounded-xl ">{data.name}</h1>
                            <Image src={`/elements/${data.elementText}.webp`} width={150} height={150} className="w-16 h-16" alt={`${data.elementText} icon`} />
                        </div>
                        <div >
                            <p className="text-xl cursor-pointer rounded-xl p-1" onClick={() => { setMinimizedName(!minimizeName) }}>{minimizeName ? "🔲" : "🗕"}</p>
                        </div>
                    </div>
                    {minimizeName &&
                        <>
                            <div className="flex gap-4 items-start md:text-center text-pretty flex-col md:flex-row ">
                                <blockquote className="italic font-semibold text-2xl ">{data.title}</blockquote>
                                <p className="font-bold md:text-nowrap text-xl text-primary">{Array(data.rarity).fill('★ ').join('')}</p>
                            </div>
                            <blockquote className="text-pretty">{data.description}</blockquote>
                        </>
                    }
                </div>
                {minimizeName && <section className="flex flex-col bg-bg gap-2 justify-between border-primary border-2 rounded-xl p-4">
                    <p><span className="font-bold">Affiliation:</span> {data.affiliation}</p>
                    <p className="flex gap-1"><span className="font-bold">Weapon:</span> <Image src={`/weapons/${data.weaponText}.png`} width={30} height={20} alt={`${data.weaponText} image weapon`} />{data.weaponText}</p>
                    <p><span className="font-bold">Region:</span> {data.region}</p>
                    <p><span className="font-bold">Constellation:</span> {data.constellation}</p>
                    <p><span className="font-bold">Birthday:</span> {data.birthday}</p>
                </section> }
            </motion.div>
        </div>
    </section>
}