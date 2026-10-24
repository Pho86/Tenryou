import { Voiceline, Voiceover } from "@/app/types/voiceovers";

function category(type: string | undefined) {
  if (type === "1006") return "Friendship";
  const numeric = Number(type);
  if (!Number.isNaN(numeric) && numeric >= 100000) return "Combat";
  return "Story";
}

export default function VoiceList({
  voiceData,
}: {
  voiceData: Voiceover;
}) {
  if (!voiceData) return null;

  const lines: Voiceline[] = [
    ...(voiceData.friendLines ?? []),
    ...(voiceData.actionLines ?? []),
  ];

  if (lines.length === 0) return null;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {lines.map((line, index) => (
        <figure
          key={`${line.title}-${index}`}
          className="flex flex-col gap-3 rounded-xl border border-bg-light/60 bg-bg-light/20 p-5 transition-colors hover:border-primary/40"
        >
          <div className="flex items-start justify-between gap-3">
            <figcaption className="font-bold text-text">{line.title}</figcaption>
            <span className="shrink-0 rounded-full border border-bg-light/70 px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wider text-text/45">
              {category(line.voicelineType)}
            </span>
          </div>
          <blockquote className="text-sm leading-relaxed text-text/75">
            &ldquo;{line.description}&rdquo;
          </blockquote>
        </figure>
      ))}
    </div>
  );
}
