import Image from "next/image";
import Link from "next/link";
import { parseColorTags } from "@/app/utils/helper";
import parse from "html-react-parser"

export default function ConstellationsTable({ constellationData, params }: { constellationData: any, params: any }) {
    return <>
        {constellationData && <>
            <h2 className="font-bold text-3xl text-pretty">Constellations</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                <ConstellationCard constellation={constellationData.c1} name={params.name} constellationImage={constellationData.images.filename_c1} index={1} />
                <ConstellationCard constellation={constellationData.c2} name={params.name} constellationImage={constellationData.images.filename_c2} index={2} />
                <ConstellationCard constellation={constellationData.c3} name={params.name} constellationImage={constellationData.images.filename_c3} index={3} />
                <ConstellationCard constellation={constellationData.c4} name={params.name} constellationImage={constellationData.images.filename_c4} index={4} />
                <ConstellationCard constellation={constellationData.c5} name={params.name} constellationImage={constellationData.images.filename_c5} index={5} />
                <ConstellationCard constellation={constellationData.c6} name={params.name} constellationImage={constellationData.images.filename_c6} index={6} />
            </div>
        </>
        }
    </>
}

function ConstellationCard({ constellation, name, constellationImage, index }: { constellation: any, name: string, constellationImage: string, index: number }) {
    const parsedHTML = parseColorTags(constellation.descriptionRaw);
    constellation.parsedText = `${parsedHTML}`

    return (<div className="flex flex-col bg-bg-dark p-4 rounded-lg gap-2">
        <div className="flex items-center gap-2">
            <Image src={`https://enka.network/ui/${constellationImage}.png`} width={55} height={55} alt={`${name} constellation skill #${index}`} className="rounded-full bg-bg-light p-1 border-bg border" />
            <h3 className="font-bold text-lg">{index}. {constellation.name} </h3>
        </div>
        <pre className="text-wrap font-signika">{parse(constellation.parsedText)}</pre>
    </div>
    )
}