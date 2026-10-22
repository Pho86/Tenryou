# Character Page Surface Brief

## Scope
Redesign of the Genshin Impact character detail page at `/characters/[name]`.

## Visitor Mode
Read — the visitor came to understand who a character is, how to build them, and how they fit in a team.

## Audience, Job, Action, Proof, Constraints
- Audience: Genshin Impact players researching characters and planning teams (equal jobs).
- Job: Understand a character's identity, build viability, and team fit within seconds.
- Action: Read identity, compare build options, assess synergy, browse all data.
- Proof: Real character data from genshin-db and Enka.network; real ascension materials, talents, constellations, voice lines.
- Constraints: Dark theme with primary #FF7373; navigation and route structure preserved; no gradient text, no glass, no card-stacking layouts.

## Chosen Direction
Identity-first Read surface: the first viewport answers "Who is this character?" with name, element, weapon, rarity, title, and description. Build guidance (artifacts, weapons, substats) and raw data (stats, constellations, talents, voices, outfits) carry equal weight side by side below. The Tenryou dark theme and #FF7373 accent own the frame; no gradient text, no glass, no same-size card stacks.

## Memorable Moment
The character's portrait and element weapon badges anchor the top of the page, with the reading column descending into build and reference sections in a single calm column.

## Unresolved Decisions
None — direction is settled by user confirmation.

## Direction contract

THESIS: A character page that answers "Who is this character?" before anything else — identity (name, element, weapon, rarity, role, story) leads the first viewport, refusing the category-default of raw stat tables or card stacks at the top.

OWN-WORLD: Tenryou dark theme — bg #2a2727, bg-dark #161515, primary #FF7373, text #FFF7F7; Signika and Poppins type; element/weapon badges as small icon chips; rounded-xl containers; no gradient text, no glass, no card stacks.

STORY: The visitor understands the character's identity at a glance, then weighs build guidance against raw data side by side, and can browse every data field (constellations, talents, voices, outfits) without hidden interaction.

FIRST VIEWPORT: Masthead/nav rail at top; character portrait full-width or near-full-width beneath it; name + element/weapon chips + rarity stars + title + description in a calm reading column below the portrait; primary action (scroll to build/data) implied by descending structure, no CTA button required.

FORM: Single-column Read layout; identity header, then two equal-weight columns or stacked equal sections (build guidance vs raw data), then full-width data sections (constellations, talents, voices, gallery); seed: none (unavailable).

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.
