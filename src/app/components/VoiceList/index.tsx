import { Voiceline, Voiceover } from "@/app/types/voiceovers";
export default function VoiceList({
    voiceData,
}: {
    voiceData: Voiceover
}) {
    return <div className="flex flex-col gap-4 max-h-[100dvh] overflow-scroll w-full p-4 overflow-x-hidden bg-bg-dark rounded-xl">
        {voiceData.friendLines.map((line:Voiceline, index:number) => {
            return (
                <div key={index} className="flex gap-2 flex-col pb-2 border-b-2">
                    <h4 className="font-bold text-2xl">{line.title}</h4>
                    <p className="p-1">{line.description}</p>
                </div>
            );
        })}
        {voiceData.actionLines.map((line:Voiceline, index:number) => {
            return (
                <div key={index} className="flex gap-2 flex-col pb-2 border-b-2">
                    <h4 className="font-bold text-2xl">{line.title}</h4>
                    <p className="p-1">{line.description}</p>
                </div>
            );
        })}
    </div>
}