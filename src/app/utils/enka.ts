import {
    EnkaClient,
    DetailedGenshinUser,
    Character as EnkaCharacter,
    CharacterData,
    CharacterStats,
    Constellation,
    Costume,
    Artifact as EnkaArtifact,
    ArtifactSplitSubstat,
    Weapon as EnkaWeapon,
    WeaponData,
    NameCard,
    ProfilePicture,
    StatProperty,
    TextAssets,
    ImageAssets,
    Skill,
    SkillLevel,
    PassiveTalent,
} from "enka-network-api";

type AnyRecord = Record<string, unknown>;

let client: EnkaClient | null = null;

function getClient() {
    if (!client) {
        client = new EnkaClient({
            requestTimeout: 15000,
            defaultLanguage: "en",
            showFetchCacheLog: false,
        });
    }

    return client;
}

function text(value: TextAssets | null | undefined): string {
    try {
        return value?.get() ?? "";
    } catch {
        return "";
    }
}

function nameOf(assets: ImageAssets | null | undefined): string {
    return assets?.name ?? "";
}

function roundStat(stat: StatProperty | null | undefined): number {
    if (!stat) return 0;
    const value = stat.isPercent ? stat.getMultipliedValue() : stat.value;
    return Math.round(value * 10) / 10;
}

function mapStat(stat: StatProperty): { stat: string; statValue: number } {
    return { stat: stat.fightProp, statValue: roundStat(stat) };
}

function mapNameCard(nameCard: NameCard | null | undefined): AnyRecord | null {
    if (!nameCard) return null;

    return {
        id: nameCard.id,
        assets: {
            icon: nameOf(nameCard.icon),
            picPath: (nameCard.pictures ?? []).map(nameOf),
        },
        name: text(nameCard.name),
    };
}

function mapSkill(
    skill: Skill | null | undefined,
    skillLevels: { skill: Skill; level: SkillLevel }[]
): AnyRecord {
    const skillLevel = skillLevels.find((entry) => entry.skill.id === skill?.id);

    return {
        level: skillLevel?.level.base ?? 0,
        id: skill?.id ?? 0,
        assets: { icon: nameOf(skill?.icon) },
        name: text(skill?.name),
    };
}

function mapArtifact(artifact: EnkaArtifact): AnyRecord {
    const data = artifact.artifactData;
    const split: ArtifactSplitSubstat[] = artifact.substats?.split ?? [];

    return {
        artifactId: data.id,
        level: artifact.level,
        nameTextMapHash: "",
        setNameTextMapHash: "",
        stars: data.stars,
        mainstat: {
            ...mapStat(artifact.mainstat),
            id: 0,
        },
        substats: (artifact.substats?.total ?? []).map(mapStat),
        rolledSubstatsIds: split.map((stat) => stat._data?.id ?? 0),
        substatsRollQuality: split.map((stat) => {
            const id = (stat._data?.id as number) ?? 0;
            const quality = id % 10;

            return {
                id,
                type: stat.fightProp,
                rollQuality: [quality >= 1 && quality <= 4 ? quality : 1],
            };
        }),
        itemType: "ITEM_RELIQUARY",
        icon: nameOf(data.icon),
        equipType: data.equipType,
        name: text(data.name),
        setName: text(data.set?.name),
    };
}

function mapWeapon(weapon: EnkaWeapon | null | undefined): AnyRecord | null {
    if (!weapon) return null;

    const data: WeaponData = weapon.weaponData;

    return {
        weaponId: data.id,
        level: weapon.level,
        ascensionLevel: weapon.ascension,
        refinement: {
            id: weapon.refinement?.id ?? 0,
            level: Math.max(0, (weapon.refinementRank ?? 1) - 1),
        },
        nameTextMapHash: "",
        stars: data.stars,
        weaponStats: weapon.weaponStats.map(mapStat),
        itemType: "ITEM_WEAPON",
        assets: {
            icon: nameOf(data.icon),
            awakenIcon: nameOf(data.awakenIcon),
        },
        name: text(data.name),
    };
}

function mapCharacter(character: EnkaCharacter): AnyRecord {
    const data: CharacterData = character.characterData;
    const stats: CharacterStats = character.stats;
    const skillLevels = character.skillLevels ?? [];

    return {
        characterId: data.id,
        element: text(data.element?.name),
        stars: data.stars,
        rarity: data.stars,
        maxLevel: character.maxLevel,
        properties: {
            xp: { type: 1001, val: "" },
            ascension: { type: 1002, val: String(character.ascension) },
            level: { type: 4001, val: String(character.level) },
            stamina: { type: 10010, val: "24000" },
        },
        stats: {
            baseHp: { value: stats.healthBase.value },
            hpPercentage: { value: stats.healthPercent.value },
            baseAtk: { value: stats.attackBase.value },
            atkPercentage: { value: stats.attackPercent.value },
            baseDef: { value: stats.defenseBase.value },
            defPercentage: { value: stats.defensePercent.value },
            critRate: { value: stats.critRate.value },
            critDamage: { value: stats.critDamage.value },
            energyRecharge: { value: stats.chargeEfficiency.value },
            healingBonus: { value: stats.healAdd.value },
            incomingHealingBonus: { value: stats.healedAdd.value },
            elementalMastery: { value: stats.elementMastery.value },
            physicalRes: { value: stats.physicalRes.value },
            physicalDamageBonus: { value: stats.physicalDamage.value },
            physicalAddHurt: stats.physicalDamage.value,
            pyroDamageBonus: { value: stats.pyroDamage.value },
            electroDamageBonus: { value: stats.electroDamage.value },
            hydroDamageBonus: { value: stats.hydroDamage.value },
            dendroDamageBonus: { value: stats.dendroDamage.value },
            anemoDamageBonus: { value: stats.anemoDamage.value },
            geoDamageBonus: { value: stats.geoDamage.value },
            cryoDamageBonus: { value: stats.cryoDamage.value },
            pyroRes: { value: stats.pyroRes.value },
            electroRes: { value: stats.electroRes.value },
            hydroRes: { value: stats.hydroRes.value },
            dendroRes: { value: stats.dendroRes.value },
            anemoRes: { value: stats.anemoRes.value },
            geoRes: { value: stats.geoRes.value },
            cryoRes: { value: stats.cryoRes.value },
            currentHp: { value: stats.currentHealth.value },
            maxHp: { value: stats.maxHealth.value },
            atk: { value: stats.attack.value },
            def: { value: stats.defense.value },
        },
        constellationsList: (character.unlockedConstellations ?? []).map((constellation: Constellation) => ({
            id: constellation.id,
            name: text(constellation.name),
            assets: { icon: nameOf(constellation.icon) },
        })),
        skillDepotId: data.skillDepotId,
        inherentProudSkillList: (character.unlockedPassiveTalents ?? []).map((talent: PassiveTalent) => talent.id),
        skills: {
            normalAttacks: mapSkill(data.normalAttack, skillLevels),
            elementalSkill: mapSkill(data.elementalSkill, skillLevels),
            elementalBurst: mapSkill(data.elementalBurst, skillLevels),
        },
        skillsExtraLevel: {},
        equipment: {
            artifacts: (character.artifacts ?? []).map(mapArtifact),
            weapon: mapWeapon(character.weapon),
        },
        friendship: { level: character.friendship },
        assets: {
            icon: nameOf(data.icon),
            sideIcon: nameOf(data.sideIcon),
            gachaIcon: nameOf(data.splashImage),
            constellations: (data.constellations ?? []).map((constellation: Constellation) => nameOf(constellation.icon)),
            talents: {
                normalAttack: nameOf(data.normalAttack?.icon),
                elementalSkill: nameOf(data.elementalSkill?.icon),
                elementalBurst: nameOf(data.elementalBurst?.icon),
            },
            costumes: (data.costumes ?? []).map((costume: Costume) => ({
                sideIconName: nameOf(costume.sideIcon),
                icon: nameOf(costume.icon),
                art: nameOf(costume.splashImage),
            })),
        },
        costumeId: character.costume?.id ?? "",
        name: text(data.name),
    };
}

function mapUser(user: DetailedGenshinUser): AnyRecord {
    return {
        language: "en",
        uid: String(user.uid),
        player: {
            username: user.nickname ?? "",
            levels: {
                world: user.worldLevel ?? 0,
                rank: user.level ?? 0,
            },
            signature: user.signature ?? "",
            namecard: mapNameCard(user.profileCard),
            achievements: user.achievements ?? 0,
            abyss: user.spiralAbyss
                ? {
                    floor: user.spiralAbyss.floor,
                    chamber: user.spiralAbyss.chamber,
                    stars: user.spiralAbyss.stars,
                }
                : { floor: 0, chamber: 0, stars: 0 },
            showcase: (user.charactersPreview ?? []).map((preview) => ({
                characterId: preview.costume?.characterId,
                level: preview.level,
                costumeId: "",
                element: text(preview.element?.name),
                constellations: preview.constellation ?? 0,
                assets: {
                    icon: nameOf(preview.costume?.icon),
                    sideIcon: nameOf(preview.costume?.sideIcon),
                    gachaIcon: nameOf(preview.costume?.splashImage),
                },
                name: text(preview.costume?.name),
            })),
            namecardsList: (user.nameCards ?? []).map(mapNameCard).filter(Boolean),
            profilePicture: user.profilePicture
                ? {
                    characterId: user.profilePicture.id,
                    id: user.profilePicture.id,
                    assets: { icon: nameOf(user.profilePicture.icon) },
                    name: text(user.profilePicture.name),
                }
                : null,
            maxFriendshipCount: user.maxFriendshipCount,
            publicConstellations: user.showConstellationPreview,
        },
        characters: (user.characters ?? []).map(mapCharacter),
        ttl: user.ttl,
    };
}

const cache = new Map<string, { expiresAt: number; data: AnyRecord }>();
const CACHE_TTL = 5 * 60 * 1000;

export async function getPlayer(uid: string): Promise<AnyRecord> {
    const key = String(uid);
    const cached = cache.get(key);

    if (cached && cached.expiresAt > Date.now()) {
        return cached.data;
    }

    const user = await getClient().fetchUser(key) as DetailedGenshinUser;
    const data = mapUser(user);

    cache.set(key, { expiresAt: Date.now() + CACHE_TTL, data });

    return data;
}
