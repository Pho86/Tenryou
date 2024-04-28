"use client"
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
export default function BentoGrid() {
    const [active, setActive] = useState<number>(-1);
    const data = [
        {
            title: 'Welcome!',
            content: "",
            link: "/",
            alt: "Welcome, traveler! Here you can find information from the game visualized with various useful information, including information about the game, such as characters, weapons and other things.",
            id: "/"
        },
        {
            title: 'Characters',
            content: "",
            image: "/icons/characters_out.webp",
            link: "/characters",
            alt: "",
            id: ""
        },
        {
            title: 'Events',
            content: "",
            image: "/icons/events_out.webp",
            link: "/events",
            alt: "",
            id: ""
        },
        {
            title: 'Wish Counter',
            content: "",
            image: "/icons/wish.webp",
            link: "/wish",
            alt: "",
            id: "",
        },
        {
            title: 'Locations',
            content: "",
            image: "/icons/map.webp",
            link: "/locations",
            alt: "",
            id: ""
        },
        {
            title: 'Artifacts',
            content: "",
            image: "/icons/artifacts.webp",
            link: "/artifacts",
            alt: "",
            id: ""
        },
        {
            title: 'Weapons',
            content: "",
            image: "/icons/weapons.webp",
            link: "/weapons",
            alt: "",
            id: ""
        },
        {
            title: 'Team Builder (WIP)',
            content: "",
            image: "/icons/characters_out.webp",
            link: "/team",
            alt: "",
            id: ""
        },
    ]
    return (
        <>
            <section className="w-full " >
                <div className='grid md:grid-cols-2 lg:grid-cols-3 auto-rows-[300px] w-full gap-4'>
                    {data.map((item, i) => (
                        <Link
                            className={`overflow-hidden cursor-pointer group rounded-xl transition-all hover:bg-bg-light bg-bg-dark border-bg-light border-2 flex flex-col ${i === 1 ? 'lg:col-span-2' : ''} transition-all`}
                            onClick={() => { setActive(i) }}
                            href={item.link}
                            
                        >
                            <div className=" transition-all w-full z-[2] p-3 flex">
                                <div className="flex w-full flex-col">
                                    <h2 className='text-xl text-primary font-semibold'>{item.title}</h2>
                                    <p className='font-bold text-2xl'>{item.content}</p>
                                </div>
                                <div className="text-6xl group-hover:font-bold text-primary">
                                    {/* <IoArrowForwardCircleOutline className="group-hover:hidden block" /> */}
                                    {/* <IoArrowForwardCircle className="hidden group-hover:block" /> */}
                                </div>
                            </div>
                            {item.image ? <div className="overflow-hidden w-full h-full transition-all">
                                <Image src={item.image} width={1500} height={1500} alt={item.alt} className="h-full p-4 w-full group-hover:scale-[110%] transition-all object-contain" />
                            </div> :
                                <p className="px-3">
                                    {item.alt}
                                </p>
                            }
                        </Link>

                    ))}
                </div>
            </section>
        </>
    )
}