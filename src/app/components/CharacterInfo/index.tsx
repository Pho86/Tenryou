import { Character } from "@/app/types/character";
import StatsTable from "@/app/components/StatsTable";
import InfoCharacterBanner from "@/app/components/CharacterInfoBanner";
import ConstellationsTable from "@/app/components/ConstellationTable";
import AttackTable from "@/app/components/AttackTable";
import VoiceList from "@/app/components/VoiceList";
import Gallery from "@/app/components/Gallery";

export default function CharacterInfo({
    CharacterData,
    params
}: {
    CharacterData: Character,
    params: { name: string }
}) {
    return (
        <>
            <main className="flex flex-col items-center" >
                <InfoCharacterBanner characterData={CharacterData} params={params} />
                <div className="">
                    <div className="flex flex-col gap-4 w-full items-center justify-center">
                        <div className="flex gap-3 flex-col w-full ">
                            <section className="flex flex-col gap-8 mt-20">
                                <StatsTable characterData={CharacterData} />
                                <AttackTable attackData={CharacterData.talents} params={params} />
                                <ConstellationsTable constellationData={CharacterData.constellations} params={params} />
                            </section>
                        </div>
                        <section className="flex gap-3 flex-col w-full">
                            <Gallery characterData={CharacterData} />
                        </section>
                        <section className="flex gap-3 flex-col w-full">
                            <h2 className="font-bold text-3xl">Quotes</h2>
                            <div className="grid gap-4">
                                <VoiceList voiceData={CharacterData.voices} />
                            </div>
                        </section>
                    </div>
                </div>
            </main>

        </>

    )
}