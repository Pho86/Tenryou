import Image from "next/image"
import { useState } from "react"

export default function Gallery({
    characterData
}: {
    characterData: any
}) {
    const [active, setActive] = useState<number>(0)
    return (
        <>
            <h2 className="font-bold text-3xl">Gallery</h2>
            <div className="flex flex-col gap-4 bg-bg-dark p-4 rounded-xl">
                <div className="flex gap-2">
                    <h3 className={`font-semibold text-xl my-2 py-2 px-4 rounded-xl cursor-pointer ${active == 0 ? "bg-bg-lighter" : "bg-bg-light"}`} onClick={() => { setActive(0) }}>Namecard</h3>
                    {/* <h3 className={`font-semibold text-xl my-2 py-2 px-4 rounded-xl cursor-pointer ${active == 1 ? "bg-bg-lighter" : "bg-bg-light"}`} onClick={() => { setActive(1) }}>Card</h3> */}
                    {/* <h3 className={`font-semibold text-xl my-2 py-2 px-4 rounded-xl cursor-pointer ${active == 2 ? "bg-bg-lighter" : "bg-bg-light"}`} onClick={() => { setActive(2) }}>Constellation</h3> */}
                </div>
                {active == 0 && <div className="relative overflow-hidden flex flex-col ">
                    <div className="relative flex flex-col rounded-xl items-center justify-center ">
                        {/* @ts-ignore */}
                        {characterData.name == "Yae Miko" ?
                            <Image src={`https://enka.network/ui/UI_NameCardPic_${characterData.fileName}1_P.png`} width={2000} height={500} alt={`${characterData.name} constellation`} className="" /> :
                            <Image src={`https://enka.network/ui/UI_NameCardPic_${characterData.fileName}_P.png`} width={2000} height={500} alt={`${characterData.name} constellation`} className="" />
                        }
                        {/* @ts-ignore */}
                        <p className="absolute bottom-0 w-full bg-bg bg-opacity-60 p-4 text-lg font-bold">{characterData.nameCard.name}</p>
                    </div>
                    {/* @ts-ignore */}
                    <p className="font-poppins w-full bg-zinc-100 rounded-b-xl text-black p-4">{characterData.nameCard.description}</p>
                </div>}
                {/* {active == 1 &&
                    <div className="flex flex-col gap-2 justify-center p-4">
                        <Image src={`https://enka.network/ui/UI_NameCardPic_${data.fileName}_P.png`} width={600} height={500} alt={`${data.name} constellation`} className="" />
                    </div>
                } */}
                {/* {active == 2 &&
                    <div className="flex flex-col gap-2 justify-center p-4">
                        <Image src={`https://enka.network/ui/${data.constellations.images.filename_constellation}.png`} width={600} height={500} alt={`${data.name} constellation`} className="" />
                    </div>
                } */}
            </div>
        </>
    )
}