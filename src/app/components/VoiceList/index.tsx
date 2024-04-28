export default function VoiceList({
    voiceData,
}: {
    voiceData: any
}) {
    return <div className="flex flex-col gap-4 max-h-[100dvh] overflow-scroll p-4 overflow-x-hidden bg-bg-dark rounded-xl">
        {voiceData.friendLines.map((line:any, index:number) => {
            return (
                <div key={index} className="flex gap-2 flex-col">
                    <h4 className="text-xl font-semibold">{line.title}</h4>
                    <p className="p-1">{line.description}</p>
                </div>
            );
        })}
        {voiceData.actionLines.map((line:any, index:number) => {
            return (
                <div key={index} className="flex gap-2 flex-col">
                    <h4 className="font-bold te">{line.title}</h4>
                    <p className="p-1">{line.description}</p>
                </div>
            );
        })}
    </div>
}