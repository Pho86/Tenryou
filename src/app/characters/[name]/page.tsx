import CharacterInfo from "@/app/components/CharacterInfo";
import { addFileName } from "@/app/utils/helper";
import { CharacterBuildData } from "@/app/types/builds";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import Loading from "./loading";
import genshin from "genshin-db";

const BUILD_API = "https://genshin-builds.com/api/genshin";

function toBuildSlug(name: string) {
  return name
    .toLowerCase()
    .normalize("NFKD")
    .replace(/['']/g, "")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

async function fetchBuildData(name: string, elementText?: string) {
  const isTraveler = /^(aether|lumine|traveler|traveller)/i.test(name);
  let slug =
    isTraveler && elementText
      ? `traveler_${elementText.toLowerCase()}`
      : toBuildSlug(name);

  const fetchOptions = () => ({
    next: { revalidate: 86400 },
    headers: { "User-Agent": "Tenryou/1.0", Accept: "application/json" },
    signal: AbortSignal.timeout(10000),
  });

  try {
    let response = await fetch(
      `${BUILD_API}/character?id=${slug}&lang=english`,
      fetchOptions()
    );

    if (response.status === 404 && !isTraveler) {
      const searchResponse = await fetch(
        `${BUILD_API}/search?q=${encodeURIComponent(name)}&lang=english`,
        fetchOptions()
      );
      if (searchResponse.ok) {
        const search = await searchResponse.json();
        const match = search.characters?.find(
          (character: { name: string }) =>
            character.name.toLowerCase() === name.toLowerCase()
        );
        if (match) {
          slug = match.id;
          response = await fetch(
            `${BUILD_API}/character?id=${slug}&lang=english`,
            fetchOptions()
          );
        }
      }
    }

    if (!response.ok) return null;
    const data = await response.json();
    return data?.build ? (data as CharacterBuildData) : null;
  } catch {
    return null;
  }
}

// ─── All heavy fetching lives here so Suspense can show the skeleton ──────────

async function CharacterPageContent({ charName }: { charName: string }) {
  const decodedName = decodeURIComponent(charName);
  const character = genshin.characters(decodedName);
  if (!character) notFound();

  let CharacterData: any = { ...character };
  const names = addFileName([CharacterData]);
  const characterName = names[0].fileName;

  const constellationsData = genshin.constellations(decodedName) ?? null;
  const talentsData = genshin.talents(decodedName) ?? null;
  const nameCardData = genshin.namecards(CharacterData.nameCardName || characterName) ?? null;
  const voiceData = genshin.voiceovers(decodedName) ?? null;
  const outfitData = genshin.outfits(decodedName, { matchCategories: true, verboseCategories: true }) ?? [];

  let quotesData: any = null;
  try {
    const quotesResponse = await fetch(`https://gi.yatta.moe/api/v2/EN/avatarFetter/${CharacterData.id}`, {
      signal: AbortSignal.timeout(3000),
      next: { revalidate: 86400 },
    });
    if (quotesResponse.ok) {
      const quotesJson = await quotesResponse.json();
      quotesData = quotesJson?.data?.quotes ?? null;
    }
  } catch {
    quotesData = null;
  }

  CharacterData = {
    ...CharacterData,
    constellations: constellationsData,
    talents: talentsData,
    nameCard: nameCardData,
    voices: voiceData,
    outfits: outfitData,
    quotes: quotesData,
  };

  const buildData = await fetchBuildData(
    CharacterData.name,
    CharacterData.elementText
  );

  return (
    <CharacterInfo
      CharacterData={CharacterData}
      charName={charName}
      buildData={buildData}
    />
  );
}

// ─── Static params ────────────────────────────────────────────────────────────

export async function generateStaticParams() {
  const characterNames = genshin.characters("names", { matchCategories: true, verboseCategories: true });
  return Array.isArray(characterNames)
    ? characterNames.map((name: string) => ({ name }))
    : [];
}

export const revalidate = 86400;

// ─── Page — renders immediately, skeleton shows while content loads ───────────

export default async function CharacterPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;

  return (
    <Suspense fallback={<Loading />}>
      <CharacterPageContent charName={name} />
    </Suspense>
  );
}
