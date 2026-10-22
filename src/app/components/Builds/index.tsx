import Image from "next/image"
import Link from "next/link"
import { CharacterBuildData } from "@/app/types/builds"
import { Character, CharacterTalents } from "@/app/types/character"
import { addFileName } from "@/app/utils/helper"

const MAIN_STAT_LABELS = {
  sands: "Sands",
  goblet: "Goblet",
  circlet: "Circlet",
  flower: "Flower",
  plume: "Plume",
} as const

const WEAPON_LIST_URL =
  "https://genshin-db-api.vercel.app/api/v5/weapons?query=names&matchCategories=true&dumpResults=true&verboseCategories=true&resultLanguage=english"
const ARTIFACT_LIST_URL =
  "https://genshin-db-api.vercel.app/api/v5/artifacts?query=names&matchCategories=true&dumpResults=true&verboseCategories=true&resultLanguage=english"

type WeaponAsset = {
  icon?: string
  rarity?: number
  description?: string
  weaponText?: string
}

type ArtifactAsset = {
  icon?: string
  effect2Pc?: string
  effect4Pc?: string
}

const STAT_ICONS: Record<string, string> = {
  ATK: "/stats/FIGHT_PROP_ATTACK.svg",
  "ATK%": "/stats/FIGHT_PROP_ATTACK_PERCENT.svg",
  HP: "/stats/FIGHT_PROP_HP.svg",
  "HP%": "/stats/FIGHT_PROP_HP_PERCENT.svg",
  DEF: "/stats/FIGHT_PROP_DEFENSE.svg",
  "DEF%": "/stats/FIGHT_PROP_DEFENSE_PERCENT.svg",
  "CRIT Rate": "/stats/FIGHT_PROP_CRITICAL.svg",
  "CRIT DMG": "/stats/FIGHT_PROP_CRITICAL_HURT.svg",
  "Elemental Mastery": "/stats/FIGHT_PROP_ELEMENT_MASTERY.svg",
  "Energy Recharge": "/stats/FIGHT_PROP_CHARGE_EFFICIENCY.svg",
  "Healing Bonus": "/stats/FIGHT_PROP_HEAL_ADD.svg",
  "Physical DMG Bonus": "/stats/FIGHT_PROP_PHYSICAL_ADD_HURT.svg",
}

function statIcon(name: string) {
  if (STAT_ICONS[name]) return STAT_ICONS[name]
  const element = name.match(/^(Pyro|Hydro|Cryo|Electro|Geo|Anemo|Dendro) DMG Bonus$/)
  return element ? `/elements/${element[1]}.webp` : undefined
}

function StatIcon({ name, className = "h-4 w-4" }: { name: string; className?: string }) {
  const src = statIcon(name)
  if (!src) return null
  return <Image src={src} alt="" width={16} height={16} className={`${className} shrink-0 object-contain`} />
}

const TALENT_KEY_MAP: Record<string, keyof CharacterTalents> = {
  "normal attack":   "combat1",
  "elemental skill": "combat2",
  "elemental burst": "combat3",
  "normalattack":    "combat1",
  "elementalskill":  "combat2",
  "elementalburst":  "combat3",
  "normal":          "combat1",
  "skill":           "combat2",
  "burst":           "combat3",
}

function talentIcon(talent: string, characterData: Character) {
  const talents = characterData.talents
  if (!talents) return undefined
  const key = TALENT_KEY_MAP[talent.toLowerCase().trim()]
  const raw = key ? talents[key] : undefined
  if (!raw || typeof raw === "string" || !("images" in raw)) return undefined
  return (raw as { images: { filename_icon: string } }).images?.filename_icon
}

function characterIcon(name: string) {
  const [entry] = addFileName([{ name }]) as { fileName: string }[]
  return `https://enka.network/ui/UI_AvatarIcon_${entry.fileName.replace(/\s+/g, "")}.png`
}

import genshin from "genshin-db"

async function fetchCharacterSummary(name: string) {
  try {
    const local = genshin.characters(name)
    if (local) {
      return {
        title: local.title,
        description: local.description,
        weaponText: local.weaponText,
        elementText: local.elementText,
        rarity: local.rarity,
      }
    }

    const response = await fetch(
      `https://genshin-db-api.vercel.app/api/v5/characters?query=${encodeURIComponent(name)}&matchCategories=true&verboseCategories=true`,
      {
        next: { revalidate: 86400 },
        headers: { "User-Agent": "Tenryou/1.0", Accept: "application/json" },
        signal: AbortSignal.timeout(10000),
      }
    )
    if (!response.ok) return null
    const data = await response.json()
    const char = Array.isArray(data) ? (data.find((c: any) => c.name === name) || data[0]) : data
    return {
      title: char?.title,
      description: char?.description,
      weaponText: char?.weaponText,
      elementText: char?.elementText,
      rarity: char?.rarity,
    }
  } catch {
    return null
  }
}

// Returns a CDN icon URL only for real artifact sets — null for anything unrecognised
function artifactIcon(name: string, artifactAssets: Map<string, ArtifactAsset>): string | null {
  const icon = artifactAssets.get(name)?.icon
  if (icon) return `https://enka.network/ui/${icon}.png`
  return null
}

// True for set names that look like raw stat identifiers rather than real set names
function isRawStatName(name: string): boolean {
  return (
    /^\d+_/.test(name) ||                  // starts with a number + underscore: "15_cryo_dmg_set"
    /\+\d+%?\s*set$/i.test(name) ||         // "ATK +18% set", "Energy Recharge +20% set"
    /^[A-Z_]+_[A-Z_]+$/i.test(name)         // snake_case stat identifiers
  )
}

// Humanise a raw stat string for display: "15_cryo_dmg_set" → "Cryo DMG Bonus (any 2pc)"
function humaniseRawStat(name: string): string {
  return name
    .replace(/^\d+_/, "")
    .replace(/_/g, " ")
    .replace(/\s*set$/i, " (any 2pc)")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim()
}

function weaponTile(rarity?: number) {
  switch (rarity) {
    case 5: return "border-[#f5d16e]/30 bg-[#b98a56]/15"
    case 4: return "border-[#b99aff]/30 bg-[#7c4d9f]/15"
    case 3: return "border-[#7fb6ff]/30 bg-[#3a6da8]/15"
    case 2: return "border-[#7dffb1]/30 bg-[#3a7f5d]/15"
    default: return "border-bg-light/60 bg-bg-light/15"
  }
}

async function fetchAssetMaps() {
  const options = {
    next: { revalidate: 86400 },
    headers: { "User-Agent": "Tenryou/1.0", Accept: "application/json" },
    signal: AbortSignal.timeout(10000),
  }
  try {
    const [wr, ar] = await Promise.all([fetch(WEAPON_LIST_URL, options), fetch(ARTIFACT_LIST_URL, options)])
    const [weapons, artifacts] = await Promise.all([wr.ok ? wr.json() : [], ar.ok ? ar.json() : []])
    const weaponAssets = new Map<string, WeaponAsset>()
    const artifactAssets = new Map<string, ArtifactAsset>()
    for (const w of Array.isArray(weapons) ? weapons : []) {
      weaponAssets.set(w.name, { icon: w.images?.filename_icon, rarity: w.rarity, description: w.description, weaponText: w.weaponText })
    }
    for (const a of Array.isArray(artifacts) ? artifacts : []) {
      artifactAssets.set(a.name, { icon: a.images?.filename_flower, effect2Pc: a.effect2Pc, effect4Pc: a.effect4Pc })
    }
    return { weaponAssets, artifactAssets }
  } catch {
    return { weaponAssets: new Map<string, WeaponAsset>(), artifactAssets: new Map<string, ArtifactAsset>() }
  }
}

// ─── Panel shell ─────────────────────────────────────────────────────────────

function Panel({ title, children, className = "" }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <section className={`rounded-xl border border-bg-light/70 bg-bg-light/25 p-5 ${className}`}>
      <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-text/45">{title}</h3>
      {children}
    </section>
  )
}

// ─── Pill ─────────────────────────────────────────────────────────────────────

function Pill({ label, rank, primary = false }: { label: string; rank?: number; primary?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${
      primary
        ? "border-primary/50 bg-primary/15 text-text"
        : "border-bg-light/60 bg-bg-light/15 text-text/75"
    }`}>
      {rank !== undefined && <span className="font-mono text-[10px] text-text/35">{rank}</span>}
      {label}
    </span>
  )
}

// ─── Builds ───────────────────────────────────────────────────────────────────

type CharacterSummary = { title?: string; description?: string; weaponText?: string; elementText?: string; rarity?: number }

export default async function Builds({ buildData, characterData }: { buildData: CharacterBuildData; characterData: Character }) {
  const { build } = buildData
  const teams = buildData.teams ?? []
  const weapons = build.weapons ?? []
  const artifacts = build.artifacts ?? []
  const subStats = build.sub_stats ?? []
  const talentPriority = build.talent_priority ?? []

  const [{ weaponAssets, artifactAssets }, ...teamCharacterSummaries] = await Promise.all([
    fetchAssetMaps(),
    ...teams.flatMap((team) => team.characters.map((member) => fetchCharacterSummary(member))),
  ])

  const summaryMap = new Map<string, CharacterSummary>()
  let si = 0
  for (const team of teams) {
    for (const member of team.characters) {
      const summary = teamCharacterSummaries[si++]
      if (summary) summaryMap.set(member, summary)
    }
  }

  const mainStats = Object.entries(MAIN_STAT_LABELS)
    .map(([key, label]) => ({ label, values: build.main_stats?.[key as keyof typeof MAIN_STAT_LABELS] }))
    .filter((e) => Boolean(e.values?.length))

  const hasStats = mainStats.length > 0
  const hasSubs = subStats.length > 0
  const hasTalents = talentPriority.length > 0

  return (
    <div className="flex flex-col gap-5">

      {/* ── Row 1: Weapons + Artifacts ─────────────────────────────────────── */}
      <div className="grid gap-5 lg:grid-cols-2">

        {/* Weapons */}
        <Panel title="Recommended Weapons">
          <ol className="flex flex-col divide-y divide-bg-light/30">
            {weapons.map((weapon, idx) => {
              const asset = weaponAssets.get(weapon)
              const icon = asset?.icon ? `https://enka.network/ui/${asset.icon}.png` : undefined
              const tooltip = [asset?.weaponText, asset?.description].filter(Boolean).join("\n\n")
              return (
                <li key={`${weapon}-${idx}`} className="group relative flex items-center gap-3 py-2.5 first:pt-0 last:pb-0">
                  <span className="w-5 shrink-0 font-mono text-xs text-text/30 text-right">{idx + 1}</span>
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border p-1 ${weaponTile(asset?.rarity)}`} title={tooltip || undefined}>
                    {icon
                      ? <Image src={icon} alt="" width={40} height={40} className="h-full w-full object-contain" />
                      : <span className="text-[10px] text-text/35">?</span>
                    }
                  </div>
                  <span className={idx === 0 ? "font-semibold text-primary" : "text-text/80"} title={tooltip || undefined}>
                    {weapon}
                  </span>
                  {tooltip && (
                    <div className="pointer-events-none absolute left-0 top-full z-20 mt-2 hidden rounded-lg border border-bg-light/60 bg-bg-darkest/95 p-3 text-xs leading-relaxed text-text/75 shadow-[0_20px_60px_rgba(0,0,0,0.45)] group-hover:block sm:max-w-md">
                      {asset?.weaponText && <p className="mb-1 text-[10px] uppercase tracking-wider text-text/45">{asset.weaponText}</p>}
                      <p className="whitespace-pre-line">{asset?.description}</p>
                    </div>
                  )}
                </li>
              )
            })}
          </ol>
        </Panel>

        {/* Artifacts */}
        <Panel title="Artifact Sets">
          <ol className="flex flex-col gap-3">
            {artifacts.map((group, idx) => {
              // Separate real set names from raw stat identifiers
              const realSets = group.filter(n => !isRawStatName(n))
              const rawStats = group.filter(n => isRawStatName(n))

              const primary = realSets[0] ?? group[0]
              const asset = primary ? artifactAssets.get(primary) : undefined
              const tooltip = [asset?.effect2Pc, asset?.effect4Pc].filter(Boolean).join("\n\n")

              // Display name: humanise raw stats, keep real names as-is
              const displayParts = [
                ...realSets,
                ...rawStats.map(humaniseRawStat),
              ]

              return (
                <li key={`${group.join("-")}-${idx}`} className="group relative flex items-start gap-3">
                  <span className="mt-2 w-5 shrink-0 font-mono text-xs text-text/30 text-right">{idx + 1}</span>

                  {/* Icons — only for real sets that resolved */}
                  {realSets.length > 0 && (
                    <div className="flex shrink-0 flex-wrap items-center gap-1 rounded-lg border border-bg-light/60 bg-bg-light/15 p-1 self-start mt-0.5" title={tooltip || undefined}>
                      {realSets.map((setName, si) => {
                        const icon = artifactIcon(setName, artifactAssets)
                        return icon
                          ? <Image key={`${setName}-${si}`} src={icon} alt="" width={34} height={34} className="h-[34px] w-[34px] object-contain" />
                          : <span key={`${setName}-${si}`} className="flex h-[34px] w-[34px] items-center justify-center text-[10px] text-text/35">?</span>
                      })}
                    </div>
                  )}

                  <div className="flex min-w-0 flex-col gap-1.5">
                    {/* Real set names */}
                    {realSets.length > 0 && (
                      <span className={`${idx === 0 ? "font-semibold text-text" : "text-text/80"} leading-tight`} title={tooltip || undefined}>
                        {realSets.join(" + ")}
                      </span>
                    )}

                    {/* Raw stat fallback pills */}
                    {rawStats.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {rawStats.map((raw, ri) => (
                          <span key={`${raw}-${ri}`} className="inline-flex items-center rounded-md border border-bg-light/50 bg-bg-light/10 px-2 py-0.5 text-[11px] text-text/55">
                            {humaniseRawStat(raw)}
                          </span>
                        ))}
                      </div>
                    )}

                    <span className="text-[11px] text-text/40">
                      {group.length > 1 ? "2pc + 2pc" : "4-piece"}
                    </span>
                  </div>

                  {tooltip && (
                    <div className="pointer-events-none absolute left-0 top-full z-20 mt-2 hidden rounded-lg border border-bg-light/60 bg-bg-darkest/95 p-3 text-xs leading-relaxed text-text/75 shadow-[0_20px_60px_rgba(0,0,0,0.45)] group-hover:block sm:max-w-md">
                      {asset?.effect2Pc && <div><p className="text-[10px] uppercase tracking-wider text-text/45">2-Piece</p><p className="mt-1 whitespace-pre-line">{asset.effect2Pc}</p></div>}
                      {asset?.effect4Pc && <div className={asset?.effect2Pc ? "mt-2" : ""}><p className="text-[10px] uppercase tracking-wider text-text/45">4-Piece</p><p className="mt-1 whitespace-pre-line">{asset.effect4Pc}</p></div>}
                    </div>
                  )}
                </li>
              )
            })}
          </ol>
        </Panel>
      </div>

      {/* ── Row 2: Priorities (full width, 3 columns) ─────────────────────── */}
      {(hasStats || hasSubs || hasTalents) && (
        <section className="rounded-xl border border-bg-light/70 bg-bg-light/25 p-5">
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-text/45">Priorities</h3>
          <div className="grid gap-6 sm:grid-cols-3 sm:divide-x sm:divide-bg-light/30">

            {/* Main Stats */}
            <div>
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-text/35">Main Stats</p>
              {hasStats ? (
                <dl className="flex flex-col gap-3">
                  {mainStats.map((stat) => (
                    <div key={stat.label} className="flex flex-col gap-1">
                      <dt className="text-[11px] uppercase tracking-wider text-text/40">{stat.label}</dt>
                      <dd className="flex flex-wrap items-center gap-x-2 gap-y-1">
                        {stat.values?.map((value) => (
                          <span key={value} className="inline-flex items-center gap-1 text-sm font-semibold text-text">
                            <StatIcon name={value} className="h-3.5 w-3.5" />
                            {value}
                          </span>
                        ))}
                      </dd>
                    </div>
                  ))}
                </dl>
              ) : (
                <p className="text-sm text-text/40">—</p>
              )}
            </div>

            {/* Substat Priority */}
            <div className="sm:pl-6">
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-text/35">Substat Priority</p>
              {hasSubs ? (
                <ol className="flex flex-col gap-2">
                  {subStats.map((stat, i) => (
                    <li key={`${stat}-${i}`} className="flex items-center gap-2">
                      <span className="w-4 shrink-0 font-mono text-[10px] text-text/30">{i + 1}</span>
                      <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium ${
                        i === 0 ? "border-primary/50 bg-primary/15 text-text" : "border-bg-light/60 bg-bg-light/15 text-text/75"
                      }`}>
                        <StatIcon name={stat} className="h-3.5 w-3.5" />
                        {stat}
                      </span>
                    </li>
                  ))}
                </ol>
              ) : (
                <p className="text-sm text-text/40">—</p>
              )}
            </div>

            {/* Talent Priority */}
            <div className="sm:pl-6">
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-text/35">Talent Priority</p>
              {hasTalents ? (
                <ol className="flex flex-col gap-2">
                  {talentPriority.map((talent, i) => {
                    const icon = talentIcon(talent, characterData)
                    return (
                      <li key={`${talent}-${i}`} className="flex items-center gap-2">
                        <span className="w-4 shrink-0 font-mono text-[10px] text-text/30">{i + 1}</span>
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-bg-light/60 bg-bg-light/15 px-2.5 py-0.5 text-xs font-medium text-text/80">
                          {icon && (
                            <Image
                              src={`https://enka.network/ui/${icon}.png`}
                              alt=""
                              width={18}
                              height={18}
                              className="h-[18px] w-[18px] shrink-0 rounded-full object-contain"
                            />
                          )}
                          {talent}
                        </span>
                      </li>
                    )
                  })}
                </ol>
              ) : (
                <p className="text-sm text-text/40">—</p>
              )}
            </div>

          </div>
        </section>
      )}

      {/* ── Row 3: Teams (full width) ──────────────────────────────────────── */}
      {teams.length > 0 && (
        <Panel title="Teams">
          <div className="flex flex-col gap-5">
            {teams.map((team, teamIndex) => (
              <div key={`${team.name}-${teamIndex}`}>
                <p className="mb-2.5 text-sm font-semibold text-text/80">{team.name}</p>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {team.characters.map((member, memberIndex) => {
                    const summary = summaryMap.get(member)
                    const isFiveStar = summary?.rarity === 5
                    const ringClass = isFiveStar
                      ? "border-2 border-[#E59934] shadow-[0_0_6px_rgba(229,153,52,0.35)]"
                      : "border-2 border-[#9B59B6] shadow-[0_0_6px_rgba(155,89,182,0.35)]"

                    return (
                      <Link
                        key={`${member}-${memberIndex}`}
                        href={`/characters/${encodeURIComponent(member)}`}
                        className="group relative flex items-center gap-2.5 rounded-xl border border-bg-light/50 bg-bg-dark/60 p-2 sm:px-3 sm:py-2 text-sm text-text/70 transition-all hover:border-primary/40 hover:bg-bg-light/20 hover:text-text cursor-pointer"
                      >
                        <div
                          className={`h-[44px] w-[44px] shrink-0 rounded-full bg-bg-dark/60 overflow-hidden flex items-center justify-center transition-transform duration-200 group-hover:scale-105 ${ringClass}`}
                        >
                          <Image
                            src={characterIcon(member)}
                            alt={member}
                            width={44}
                            height={44}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <span className="truncate font-medium leading-tight">
                          {member}
                        </span>

                        {/* Character Description Hover Popover (ported from homepage dailies) */}
                        <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-full mb-2.5 z-50 hidden group-hover:flex flex-col w-64 sm:w-72 rounded-xl border border-bg-light/80 bg-bg-darkest/95 p-3.5 text-xs text-text/80 shadow-[0_20px_50px_rgba(0,0,0,0.7)] backdrop-blur-md">
                          <div className="flex items-baseline justify-between gap-2">
                            <span className="text-sm font-bold text-text">
                              {member}
                            </span>
                            {summary?.rarity && (
                              <span className="text-[11px] font-semibold text-[#E59934]">
                                {"★".repeat(summary.rarity)}
                              </span>
                            )}
                          </div>

                          {summary?.title && (
                            <span className="text-xs text-primary font-medium mt-0.5">
                              {summary.title}
                            </span>
                          )}

                          {[summary?.elementText, summary?.weaponText].filter(Boolean).length > 0 && (
                            <span className="text-[10px] uppercase tracking-wider text-text/45 mt-0.5">
                              {[summary?.elementText, summary?.weaponText]
                                .filter(Boolean)
                                .join(" · ")}
                            </span>
                          )}

                          {summary?.description && (
                            <p className="mt-2 text-xs text-text/75 leading-relaxed whitespace-pre-line line-clamp-4">
                              {summary.description}
                            </p>
                          )}

                          {/* Arrow pointer */}
                          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-bg-darkest/95" />
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </Panel>
      )}

    </div>
  )
}
