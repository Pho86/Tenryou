import Image from "next/image"
import { useState } from "react"

export default function Gallery({
    data
}: {
    data: any
}) {
    const [active, setActive] = useState<number>(0)
    return (
        <>
            <h2 className="font-bold text-3xl">Gallery</h2>
            <div className="flex flex-col gap-4 bg-bg-dark p-4 rounded-xl">
                <div className="flex gap-2">
                    <h3 className={`font-semibold text-xl my-2 py-2 px-4 rounded-xl cursor-pointer ${active == 0 ? "bg-bg-lighter" : "bg-bg-light"}`} onClick={() => { setActive(0) }}>Namecard</h3>
                    <h3 className={`font-semibold text-xl my-2 py-2 px-4 rounded-xl cursor-pointer ${active == 1 ? "bg-bg-lighter" : "bg-bg-light"}`} onClick={() => { setActive(1) }}>Card</h3>
                    <h3 className={`font-semibold text-xl my-2 py-2 px-4 rounded-xl cursor-pointer ${active == 2 ? "bg-bg-lighter" : "bg-bg-light"}`} onClick={() => { setActive(2) }}>Constellation</h3>

                </div>
                {active == 0 && <div className="relative overflow-hidden flex flex-col ">
                    <div className="relative flex flex-col rounded-xl items-center justify-center ">
                        {/* @ts-ignore */}
                        <Image src={`/db/namecards/${data.nameCard.images.filename_background}.png`} width={2000} height={800} alt={`${data.name} name card.`} className="w-full rounded-t-xl" />
                        {/* @ts-ignore */}
                        <p className="absolute bottom-0 w-full bg-bg bg-opacity-60 p-4 text-lg font-bold">{data.nameCard.name}</p>
                    </div>
                    {/* @ts-ignore */}
                    <p className="font-poppins w-full bg-zinc-100 rounded-b-xl text-black p-4">{data.nameCard.description}</p>
                </div>}
                {active == 1 &&
                    <div className="flex flex-col gap-2 justify-center p-4">
                        <Image src={`${data.images.cover2}`} width={600} height={500} alt={`${data.name} constellation`} className="" />
                    </div>
                }
                {active == 2 &&
                    <div className="flex flex-col gap-2 justify-center p-4">
                        <Image src={`/db/constellations/${data.constellations.images.filename_constellation}.png`} width={600} height={500} alt={`${data.name} constellation`} className="" />
                    </div>
                }
            </div>
        </>
    )
}