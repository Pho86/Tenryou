export type Weapon = {
    id: number;
    name: string;
    dupealias?: string; 

    description: string;
    descriptionRaw: string;
    parsedDescription:string;

    weaponType: 'WEAPON_BOW' | 'WEAPON_CATALYST' | 'WEAPON_CLAYMORE' | 'WEAPON_POLE' | 'WEAPON_SWORD_ONE_HAND'; // enum
    weaponText: string; 

    rarity: 1 | 2 | 3 | 4 | 5;
    story: string;
    level:number;

    baseAtkValue: number; 
    mainStatType?: 'FIGHT_PROP_ATTACK_PERCENT' | 'FIGHT_PROP_CHARGE_EFFICIENCY' | 'FIGHT_PROP_CRITICAL' | 'FIGHT_PROP_CRITICAL_HURT' | 'FIGHT_PROP_DEFENSE_PERCENT' | 'FIGHT_PROP_ELEMENT_MASTERY' | 'FIGHT_PROP_HP_PERCENT' | 'FIGHT_PROP_PHYSICAL_ADD_HURT'; // enum. low rarity weapons dont have this
    mainStatText?: string; 
    baseStatText: string; 

    effectName?: string; // low rarity weapons dont have this
    effectTemplateRaw?: string; // low rarity weapons dont have this
    r1?: WeaponRefine; // for example dull blade doesn't have any refinement
    r2?: WeaponRefine;
    r3?: WeaponRefine;
    r4?: WeaponRefine;
    r5?: WeaponRefine;

    costs: {
        "ascend1": any[];
        "ascend2": any[];
        "ascend3": any[];
        "ascend4": any[];
        "ascend5"?: any[]; // 1 and 2 star weapons only have 4 ascensions
        "ascend6"?: any[]; // 1 and 2 star weapons only have 4 ascensions
    };
    images: {
        filename_icon: string;
        filename_awakenIcon: string;
        filename_gacha: string;
        mihoyo_icon?: string; 
        mihoyo_awakenIcon?: string; 
    };
    stats: any;
    version: string;
    [key: string]: any;
}

export interface WeaponRefine {
    description: string; // sanitized with removeColorHTML, replaceNonBreakSpace, removeHashtag, replaceGenderM
    values: string[];
}