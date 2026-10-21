
export type User = {
    characters: Characters[];
    player: Player;
    uid: string;
}


export type PlayerData = {
    playerInfo: Player
    avatarInfoList: Characters[]
    ttl: number
    uid: string
}

export type Player = {
    username: string
    level: number
    levels: {
        world: number
        rank: number
    }
    achievements: number
    signature: string
    worldLevel: number
    nameCardId: number
    finishAchievementNum: number
    towerFloorIndex: number
    towerLevelIndex: number
    showAvatarInfoList: Showcase[]
    showNameCardIdList: number[]
    profilePicture: ProfilePicture
    abyss: {
        floor: number
        chamber: number
        stars: number
    }
    namecardsList: NamecardItem[]
}

export type NamecardItem = {
    id: number
    name: string
    assets: {
        icon: string
        picPath: string[]
    }
}

export type Showcase = {
    avatarId: number
    level: number
    costumeId: number
}

export type ProfilePicture = {
    id: number
    avatarId: number
    assets: {
        icon: string
    }
}

export type ConstellationItem = {
    id: number
    name: string
    assets: { icon: string }
} | undefined

export type Skill = {
    level: number
    id: number
    assets: { icon: string }
    name: string
}

export type CharacterAssets = {
    icon: string
    sideIcon: string
    gachaIcon: string
    constellations: string[]
    talents: {
        normalAttack: string
        elementalSkill: string
        elementalBurst: string
    }
    costumes: { sideIconName: string; icon: string; art: string }[]
}

export type CharacterStats = {
    baseHp: { value: number }
    hpPercentage: { value: number }
    baseAtk: { value: number }
    atkPercentage: { value: number }
    baseDef: { value: number }
    defPercentage: { value: number }
    critRate: { value: number }
    critDamage: { value: number }
    energyRecharge: { value: number }
    healingBonus: { value: number }
    incomingHealingBonus: { value: number }
    elementalMastery: { value: number }
    physicalRes: { value: number }
    physicalDamageBonus: { value: number }
    physicalAddHurt: number
    pyroDamageBonus: { value: number }
    electroDamageBonus: { value: number }
    hydroDamageBonus: { value: number }
    dendroDamageBonus: { value: number }
    anemoDamageBonus: { value: number }
    geoDamageBonus: { value: number }
    cryoDamageBonus: { value: number }
    pyroRes: { value: number }
    electroRes: { value: number }
    hydroRes: { value: number }
    dendroRes: { value: number }
    anemoRes: { value: number }
    geoRes: { value: number }
    cryoRes: { value: number }
    currentHp: { value: number }
    maxHp: { value: number }
    atk: { value: number }
    def: { value: number }
}

export type Characters = {
    avatarId: number
    skillDepotId: number
    costumeId: number
    equipment: Equipment
    element: string
    maxLevel: number
    name: string
    fileName: string
    filename: string
    assets: CharacterAssets
    skills: {
        normalAttacks: Skill
        elementalSkill: Skill
        elementalBurst: Skill
    }
    constellationsList: ConstellationItem[]
    friendship: {
        level: number
    }
    properties: {
        level: {
            val: number
        }
    }
    stats: CharacterStats
    rarity: 4 | 5
    active?: boolean
}

export type WeaponAssets = {
    icon: string
    awakenIcon: string
}

export type Equipment = {
    weapon: {
        name: string
        assets: WeaponAssets
        stars: number
        weaponStats: WeaponStat[]
        refinement: {
            level: number
        }
        level: number
    }
    artifacts: Artifact[]
}

export type WeaponStat = {
    stat: string
    statValue: number
}

export type RollQualityItem = {
    id: number
    type: string
    rollQuality: number[]
}

export type Artifact = {
    mainstat: {
        stat: string
        statValue: number
    }
    rollquality: RollQualityItem[]
    substatsRollQuality: RollQualityItem[]
    critvalue: number
    substats: SubStat[]
    critValue: number
    stars: number
    name: string
    setName: string
    icon: string
}

export type SubStat = {
    statValue: number
    stat: string
}
