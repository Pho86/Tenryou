
export type User = {
    characters: Characters;
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
    levels: any
    achievements: any
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
    }
    namecardsList: any[]
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

export type Characters = {
    avatarId: number
    skillDepotId: number
    costumeId: number
    length: number;
    equipment: Equipment
    [index: number]: Characters
    map: any
    element: string
    maxLevel: number
    name: string
    fileName:string
    filename:string
    assets: any
    skills: {
        normalAttacks: any
        elementalSkill: any
        elementalBurst: any
    }
    constellationsList: any
    friendship: {
        level: number
    }
    properties: {
        level: {
            val: number
        }
    }
    stats: any
}
export type Equipment = {
    weapon: {
        name: string
        assets: any
        stars: number
        weaponStats: StatsAPI[]
        refinement: {
            level: number
        }
        level: number
    }
    artifacts: {
        map: any
    }
}
export type Artifact = {
    mainstat: {
        stat: string
        statValue: number
    }
    rollquality: any
    substatsRollQuality: any
    critvalue: number
    substats: SubStat
    critValue: number
    stars: number
    name: string
    icon: string
}

export type SubStat = {
    forEach: any;
    statValue: number
    stat: string
    map: any
}


export type StatsAPI = {
    1: number
    3: number
    4: number
    6: number
    7: number
    9: number
    20: number
    22: number
    23: number
    26: number
    27: number
    28: number
    29: number
    30: number
    40: number
    41: number
    42: number
    43: number
    44: number
    45: number
    46: number
    50: number
    51: number
    52: number
    53: number
    54: number
    55: number
    56: number
    70: number
    71: number
    72: number
    73: number
    74: number
    75: number
    76: number
    80: number
    81: number
    1000: number
    1001: number
    1002: number
    1003: number
    1004: number
    1005: number
    1006: number
    1010: number
    2000: number
    2001: number
    2002: number
}

