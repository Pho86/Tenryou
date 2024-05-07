import Image from "next/image"
import { useState } from "react"
import Link from "next/link";

export default function Gallery({
    characterData
}: {
    characterData: any
}) {
    const [active, setActive] = useState<number>(0);
    return (
        <>
            <h2 className="font-bold text-3xl">Gallery</h2>
            <div className="flex flex-col gap-4 bg-bg-dark p-4 rounded-xl">
                <div className="flex gap-2">
                    <h3 className={`font-semibold text-xl my-2 py-2 px-4 rounded-xl cursor-pointer ${active == 0 ? "bg-bg-lighter" : "bg-bg-light"}`} onClick={() => { setActive(0) }}>Namecard</h3>
                    {characterData.outfits && characterData.outfits.map((outfit: any, index: number) => {
                        if (outfit.images.filename_splash || outfit.url.modelviewer.length > 0) return <h3 key={index} className={`font-semibold text-xl my-2 py-2 px-4 rounded-xl cursor-pointer ${active == index + 1 ? "bg-bg-lighter" : "bg-bg-light"}`} onClick={() => { setActive(index + 1) }}>{outfit.name}</h3>
                    })}
                </div>
                {active == 0 && <div className="relative overflow-hidden flex flex-col ">
                    <div className="relative flex flex-col rounded-xl items-center justify-center ">
                        {characterData.name == "Yae Miko" ?
                            <Image src={`https://enka.network/ui/UI_NameCardPic_${characterData.fileName}1_P.png`} width={2000} height={500} alt={`${characterData.name} constellation`} className="" /> :
                            <Image src={`https://enka.network/ui/UI_NameCardPic_${characterData.fileName}_P.png`} width={2000} height={500} alt={`${characterData.name} constellation`} className="" />
                        }
                        <p className="absolute bottom-0 w-full bg-bg bg-opacity-60 p-4 text-lg font-bold">{characterData.nameCard.name}</p>
                    </div>
                    <p className="font-poppins w-full bg-zinc-100 rounded-b-xl text-black p-4">{characterData.nameCard.description}</p>
                </div>}
                {characterData.outfits && characterData.outfits.map((outfit: any, index: number) => {
                    if (active == index + 1) return <div className="flex flex-col gap-2 justify-center" key={index}>

                        {outfit.images.filename_splash && <Image src={`https://enka.network/ui/${outfit.images.filename_splash}.png`} width={1500} height={500} alt={`${outfit.name} gacha splash`} className="w-full" />}
                    
                        {outfit.url.modelviewer.length > 0 && <div className="w-full ">
                            <iframe src={outfit.url.modelviewer} className="w-full h-[60dvh]">
                            </iframe>
                            <Link href={outfit.url.modelviewer} target="__blank" className="hover:text-primary transition-all">Open in New Tab</Link>
                        </div>}
                    </div>

                })}
            </div>
        </>
    )
}