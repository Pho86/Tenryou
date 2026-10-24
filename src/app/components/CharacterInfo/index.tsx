import { Character } from "@/app/types/character";
import InfoCharacterBanner from "@/app/components/CharacterInfoBanner";
import ConstellationsTable from "@/app/components/ConstellationTable";
import AttackTable from "@/app/components/AttackTable";
import Quotes from "@/app/components/Quotes";
import Gallery from "@/app/components/Gallery";
import PageSection from "@/app/components/PageSection";
import SectionNav, { Section } from "@/app/components/SectionNav";
import Builds from "@/app/components/Builds";
import { CharacterBuildData } from "@/app/types/builds";

export default function CharacterInfo({
  CharacterData,
  charName,
  buildData,
}: {
  CharacterData: Character;
  charName: string;
  buildData?: CharacterBuildData | null;
}) {
  const cv = CharacterData.cv ?? ({} as Character["cv"]);
  const facts = [
    { label: "Region", value: CharacterData.region },
    { label: "Affiliation", value: CharacterData.affiliation },
    { label: "Constellation", value: CharacterData.constellation },
    { label: "Birthday", value: CharacterData.birthday },
    { label: "Vision", value: CharacterData.elementText },
    { label: "Weapon", value: CharacterData.weaponText },
    { label: "Voice (EN)", value: cv.english },
    { label: "Voice (JP)", value: cv.japanese },
  ].filter((fact) => Boolean(fact.value));

  const sections: Section[] = [
    { id: "profile", label: "Profile" },
    ...(buildData ? [{ id: "builds", label: "Builds" }] : []),
    { id: "talents", label: "Talents" },
    { id: "constellations", label: "Constellations" },
    { id: "gallery", label: "Gallery" },
    { id: "quotes", label: "Quotes" },
  ].map((section, index) => ({
    ...section,
    index: String(index + 1).padStart(2, "0"),
  }));

  const sectionIndex = (id: string) =>
    sections.find((section) => section.id === id)?.index ?? "01";

  return (
    <main className="flex w-full flex-col">
      <InfoCharacterBanner
        characterData={CharacterData}
        charName={charName}
      />

      <div className="w-full py-14 md:py-20">
        <div className="lg:grid lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-12">
          <aside className="hidden lg:block">
            <SectionNav sections={sections} />
          </aside>

          <div className="flex w-full min-w-0 flex-col gap-16 md:gap-20">
            <PageSection
              id="profile"
              index={sectionIndex("profile")}
              title="Profile"
              description={`Who ${CharacterData.name} is, at a glance.`}
            >
              {facts.length > 0 && (
                <dl className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
                  {facts.map((fact) => (
                    <div key={fact.label} className="flex flex-col gap-1 border-t border-bg-light/50 pt-4">
                      <dt className="text-xs font-semibold uppercase tracking-wider text-text/45">
                        {fact.label}
                      </dt>
                      <dd className="font-semibold text-text">{fact.value}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </PageSection>

            {buildData && (
              <PageSection
                id="builds"
                index={sectionIndex("builds")}
                title="Builds"
                description="Recommended weapons, artifact sets, stat priorities, and team compositions."
              >
                <Builds buildData={buildData} characterData={CharacterData} />
              </PageSection>
            )}

            <PageSection
              id="talents"
              index={sectionIndex("talents")}
              title="Talents"
              description="Normal attacks, skills, bursts and passive abilities."
            >
              <AttackTable
                attackData={CharacterData.talents}
                charName={charName}
              />
            </PageSection>

            <PageSection
              id="constellations"
              index={sectionIndex("constellations")}
              title="Constellations"
              description="Bonuses unlocked by additional copies of the character."
            >
              <ConstellationsTable
                constellationData={CharacterData.constellations}
                charName={charName}
              />
            </PageSection>

            <PageSection
              id="gallery"
              index={sectionIndex("gallery")}
              title="Gallery"
              description="Namecard artwork and alternate outfits."
            >
              <Gallery characterData={CharacterData} />
            </PageSection>

            <PageSection
              id="quotes"
              index={sectionIndex("quotes")}
              title="Quotes"
              description="Voice lines heard throughout the journey — playable in multiple languages."
            >
              <Quotes quotes={CharacterData.quotes} avatarId={CharacterData.id} />
            </PageSection>
          </div>
        </div>
      </div>
    </main>
  );
}
