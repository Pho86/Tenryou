export type AscendCost = {
    id: number
    name: string
    count: number
}

export type Quote = {
    title: string;
    audio: string;
    text: string;
    tips?: string;
    tasks?: string[];
};

export type Character = {
    nameCard: {
        id: number;
        name: string;
        images: { filename_background: string };
        description: string;
        source: string[];
    } | null;
    outfits: OutfitEntry[] | null;
    id: number;
    name: string;
    fullname?: string;

    title: string;
    description: string;

    weaponType: 'WEAPON_BOW' | 'WEAPON_CATALYST' | 'WEAPON_CLAYMORE' | 'WEAPON_POLE' | 'WEAPON_SWORD_ONE_HAND';
    weaponText: string;
    bodyType: 'BODY_BOY' | 'BODY_GIRL' | 'BODY_LADY' | 'BODY_LOLI' | 'BODY_MALE';
    gender: string;

    qualityType: string;
    rarity: 4 | 5;

    birthdaymmdd: string;
    birthday: string;

    element?:string;
    elementType: 'ELEMENT_ANEMO' | 'ELEMENT_CRYO' | 'ELEMENT_DENDRO' | 'ELEMENT_ELECTRO' | 'ELEMENT_GEO' | 'ELEMENT_HYDRO' | 'ELEMENT_NONE' | 'ELEMENT_PYRO';
    elementText: string;

    affiliation: string;
    associationType: 'ASSOC_FATUI' | 'ASSOC_FONTAINE' | 'ASSOC_INAZUMA' | 'ASSOC_LIYUE' | 'ASSOC_MAINACTOR' | 'ASSOC_MONDSTADT' | 'ASSOC_RANGER' | 'ASSOC_SUMERU';
    region: string;

    substatType: 'FIGHT_PROP_ATTACK_PERCENT' | 'FIGHT_PROP_CHARGE_EFFICIENCY' | 'FIGHT_PROP_CRITICAL' | 'FIGHT_PROP_CRITICAL_HURT' | 'FIGHT_PROP_DEFENSE_PERCENT' | 'FIGHT_PROP_ELEC_ADD_HURT' | 'FIGHT_PROP_ELEMENT_MASTERY' | 'FIGHT_PROP_FIRE_ADD_HURT' | 'FIGHT_PROP_GRASS_ADD_HURT' | 'FIGHT_PROP_HEAL_ADD' | 'FIGHT_PROP_HP_PERCENT' | 'FIGHT_PROP_ICE_ADD_HURT' | 'FIGHT_PROP_PHYSICAL_ADD_HURT' | 'FIGHT_PROP_ROCK_ADD_HURT' | 'FIGHT_PROP_WATER_ADD_HURT' | 'FIGHT_PROP_WIND_ADD_HURT';
    substatText: string;
    map: <T>(callbackfn: (value: Character, index: number, array: Character[]) => T) => T[];
    constellation: string;
    cv: {
        english: string;
        chinese: string;
        japanese: string;
        korean: string;
    };
    costs: {
        "ascend1": AscendCost[];
        "ascend2": AscendCost[];
        "ascend3": AscendCost[];
        "ascend4": AscendCost[];
        "ascend5": AscendCost[];
        "ascend6": AscendCost[];
        "ascend7"?: AscendCost[];
    };
    images: {
        filename_icon: string;
        filename_sideIcon: string;
        filename_gachaSplash?: string;
        filename_gachaSlice?: string;

        card?: string;
        portrait?: string;
        mihoyo_icon: string;
        mihoyo_sideIcon: string;
        cover1?: string;
        cover2?: string;
        "hoyolab-avatar"?: string;
    };
    fileName: string;
    nameCardName: string;
    talents: CharacterTalents | null;
    constellations: CharacterConstellations | null;
    voices: CharacterVoices | null;
    quotes?: Record<string, Quote>;
    result: Character | null;
    url: {
        fandom: string;
    };
    active: boolean;
    version: string;
}

export type OutfitEntry = {
    id: number;
    name: string;
    description: string;
    isDefault: boolean;
    characterId: number;
    characterName: string;
    source: string[];
    images: {
        namesplash: string | null;
        namecard: string | null;
        nameicon: string;
        filename_card: string;
        filename_icon?: string;
        filename_iconCircle: string;
        filename_splash?: string;
        filename_sideIcon?: string;
    };
    url: { modelviewer: string };
    version: string;
};

export type TalentUpgrade = {
    level: number;
    description: string[];
    params: number[];
};

export type TalentEntry = {
    name: string;
    description: string;
    upgrades?: TalentUpgrade[];
    images: { filename_icon: string };
};

export type CharacterTalents = {
    name: string;
    combat1: TalentEntry;
    combat2: TalentEntry;
    combat3: TalentEntry;
    passive1?: TalentEntry;
    passive2?: TalentEntry;
    passive3?: TalentEntry;
    passive4?: TalentEntry;
    costs: Record<string, AscendCost[]>;
};

export type ConstellationEntry = {
    name: string;
    description: string;
    images: { filename_icon: string };
};

export type CharacterConstellations = {
    name: string;
    c1: ConstellationEntry;
    c2: ConstellationEntry;
    c3: ConstellationEntry;
    c4: ConstellationEntry;
    c5: ConstellationEntry;
    c6: ConstellationEntry;
};

export type VoiceEntry = {
    title: string;
    text: string;
    audio: string;
};

export type CharacterVoices = {
    name: string;
    result: Record<string, VoiceEntry>;
};
