export type Character = {
    nameCard: any;
    outfits: any;
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
    map: any;
    constellation: string;
    cv: {
        english: string;
        chinese: string;
        japanese: string;
        korean: string;
    };
    costs: {
        "ascend1": any;
        "ascend2": any;
        "ascend3": any;
        "ascend4": any;
        "ascend5": any;
        "ascend6": any;
        "ascend7": any;
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
    talents: any;
    constellations: any;
    voices: any;
    result: any;
    url: {
        fandom: string;
    };
    stats: any;
    active: boolean;
    version: string;
}
