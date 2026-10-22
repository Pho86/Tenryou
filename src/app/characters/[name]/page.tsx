import CharacterInfo from "@/app/components/CharacterInfo";
import { addFileName } from "@/app/utils/helper";
import { CharacterBuildData } from "@/app/types/builds";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import Loading from "./loading";

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
  const mergeWithPreference = (firstData: any, secondData: any) => {
    if (!firstData) return secondData;
    for (const key in secondData) {
      if (
        Object.prototype.hasOwnProperty.call(firstData, key) &&
        typeof firstData[key] === "object" &&
        secondData[key] !== null
      ) {
        firstData[key] = mergeWithPreference(firstData[key], secondData[key]);
      } else {
        firstData[key] = secondData[key];
      }
    }
    return firstData;
  };

  let CharacterData: any;

  try {
    const response = await fetch(
      `https://genshin-db-api.vercel.app/api/v5/stats?folder=characters&query=${charName}&dumpResult=true`,
      { cache: "no-store" }
    );
    if (!response.ok) notFound();
    const res = await response.json();
    if (!res?.result) notFound();
    CharacterData = res.result;

    const names = addFileName([CharacterData]);
    const characterName = names[0].fileName;

    const [
      constellationsResponse,
      talentsResponse,
      nameCardResponse,
      voiceResponse,
      outfitResponse,
      quotesResponse,
    ] = await Promise.all([
      fetch(
        `https://genshin-db-api.vercel.app/api/v5/constellations?query=${charName}&matchCategories=true&dumpResults=true&verboseCategories=true`
      ),
      fetch(
        `https://genshin-db-api.vercel.app/api/v5/talents?query=${charName}&matchCategories=true&dumpResults=true&verboseCategories=true`
      ),
      fetch(
        `https://genshin-db-api.vercel.app/api/v5/namecards?query=${
          CharacterData.nameCardName ? CharacterData.nameCardName : characterName
        }&matchCategories=true`
      ),
      fetch(
        `https://genshin-db-api.vercel.app/api/v5/voiceovers?query=${charName}&matchCategories=true`
      ),
      fetch(
        `https://genshin-db-api.vercel.app/api/v5/outfits?query=${charName}&matchCategories=true&dumpResults=true&verboseCategories=true`
      ),
      fetch(`https://gi.yatta.moe/api/v2/EN/avatarFetter/${CharacterData.id}`),
    ]);

    if (
      !constellationsResponse.ok ||
      !talentsResponse.ok ||
      !nameCardResponse.ok ||
      !outfitResponse.ok
    ) {
      notFound();
    }

    const [constellationsData, talentsData, nameCardData, outfitData] =
      await Promise.all([
        constellationsResponse.json(),
        talentsResponse.json(),
        nameCardResponse.json(),
        outfitResponse.json(),
      ]);

    let voiceData: any = null;
    try {
      const voiceText = await voiceResponse.text();
      if (voiceText) voiceData = JSON.parse(voiceText);
    } catch {
      voiceData = null;
    }

    let quotesData: any = null;
    try {
      const quotesJson = await quotesResponse.json();
      quotesData = quotesJson?.data?.quotes ?? null;
    } catch {
      quotesData = null;
    }

    const mergedData = {
      constellations: constellationsData,
      talents: talentsData,
      nameCard: nameCardData,
      voices: voiceData,
      outfits: outfitData,
      quotes: quotesData,
      ...CharacterData,
    };

    CharacterData = mergeWithPreference(CharacterData, mergedData);
  } catch {
    notFound();
  }

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
  const response = await fetch(
    "https://genshin-db-api.vercel.app/api/v5/characters?query=names&matchCategories=true&verboseCategories=true",
    { cache: "no-store" }
  );
  if (!response.ok) return [];
  const characters = await response.json();
  return Array.isArray(characters)
    ? characters.map((char: any) => ({ name: char.name }))
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
