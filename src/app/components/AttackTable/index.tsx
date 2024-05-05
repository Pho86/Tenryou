"use client"
import Image from "next/image";
import parse from "html-react-parser"
import { parseColorTags } from "@/app/utils/helper";

export default function AttackTable({ attackData, params }: { attackData: any, params: any }) {
    return <>
        {attackData && <div className="flex flex-col gap-2">
            <h3 className="font-bold text-3xl text-pretty">Combat Talents</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                <AttackCard attack={attackData.combat1} name={params.name} attackImage={attackData.images.filename_combat1} index={1} stats />
                <AttackCard attack={attackData.combat2} name={params.name} attackImage={attackData.images.filename_combat2} index={2} stats />
                <AttackCard attack={attackData.combat3} name={params.name} attackImage={attackData.images.filename_combat3} index={3} stats />
            </div>
        </div>
        }
        {attackData && <div className="flex flex-col gap-2">
            <h3 className="font-bold text-3xl text-pretty">Passive Talents</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                <AttackCard attack={attackData.passive1} name={params.name} attackImage={attackData.images.filename_passive1} index={1} />
                <AttackCard attack={attackData.passive2} name={params.name} attackImage={attackData.images.filename_passive2} index={2} />
                <AttackCard attack={attackData.passive3} name={params.name} attackImage={attackData.images.filename_passive3} index={3} />
            </div>
        </div>
        }
    </>
}
function AttackCard({ attack, name, attackImage, index, stats = false }: { attack: any, name: string, attackImage: string, index: number, stats?: boolean }) {

    const parsedHTML = parseColorTags(attack.descriptionRaw);
    attack.parsedText = `${parsedHTML}`
    return (<div className="flex flex-col bg-bg-dark p-4 rounded-lg gap-2 overflow-hidden">
        <div className="flex items-center gap-2">
            <Image src={`https://enka.network/ui/${attackImage}.png`} width={55} height={55} alt={`${name} attack skill #${index}`} className="rounded-full bg-bg-light p-1 border-bg border" />
            <h3 className="font-bold text-lg text-pretty">{attack.name} </h3>
        </div>
        <pre className="text-pretty font-poppins">{parse(attack.parsedText)}</pre>
        
    </div>
    )
}