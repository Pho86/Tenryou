import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
export default function BentoGrid({
    data,
    type
}: {
    data: any
    type?: string
}) {
    return (
        <>
            <section className="w-full max-w-screen-2xl " >
                <div className='grid md:grid-cols-2 lg:grid-cols-4 auto-rows-[300px] w-full gap-4'>
                    {data.map((item: any, i: number) => (
                        <BentoItem item={item} index={i} key={i} type={type} />
                    ))}
                </div>
            </section>
        </>
    )
}

function BentoItem({ item, index, type }: { item: {
    link:string,
    target: "_blank" | undefined;
    title:string
    image?:string
    bg?:string
    children:ReactNode;
    alt?:string
    description?: string
}, index: number, type?:string }) {
    return (
        <>
            <div className={`overflow-hidden group rounded-xl transition-all bg-bg-dark border-bg-light border-2 flex flex-col ${type == "home" ? index === 2 && ' lg:row-span-2 md:row-span-1 row-span-2' : ""} ${type == "home" ? index === 1 ? 'lg:col-span-2 md:row-span-2 lg:row-span-1' : '' : ""} ${type == "home" ? index == 3 ? "row-span-2 md:row-span-3 md:col-span-2 " : "" : ""}  ${type == "home" ? index == 7 ? "lg:col-span-2 " : "" : ""} transition-all`}>
                {item.link ?
                    <Link
                        className={`transition-all hover:bg-bg-light flex flex-col h-full cursor-pointer`}
                        target={item.target ? "_blank" : ""}
                        href={item.link}
                        id={item.title}
                        title={item.description}
                    >
                        <div className={`transition-all w-full z-20 p-3 flex `}>
                            <div className="flex w-full flex-col">
                                <h2 className='text-xl text-primary font-semibold'>{item.title}</h2>
                            </div>
                        </div>
                        {item.image && <div className={`overflow-hidden w-full h-full relative bg-no-repeat `}>
                            {item.bg && <Image className="object-cover group-hover:scale-105 transition-all brightness-50 group-hover:brightness-90 " fill alt={`${item.description}`} src={item.bg} priority />}
                            <Image src={item.image} fill alt={`${item.title} title icon`}  className="absolute top-0 h-full p-4 w-full object-contain group-hover:scale-105 transition-all drop-shadow-icon " />
                        </div>
                        }
                    </Link>
                    :
                    <div className={`flex flex-col h-full`}>
                        <div className={`transition-all w-full z-20 p-3 flex `}>
                            <div className="flex w-full flex-col">
                                {item.children ? <h2 className='text-xl text-primary font-semibold'>{item.title}</h2> : <h1 className='text-xl text-primary font-semibold'>{item.title}</h1>}
                            </div>
                        </div>
                        {item.children ?
                            <>
                                {item.children}
                            </>
                            :
                            <p className="px-3 text-lg md:text-base">
                                {item.alt}
                            </p>}
                    </div>
                }
            </div >
        </>
    )
}