export type Material = {
    id: number;
    name: string;
    dupealias?: string; 
    rarity?: 1 | 2 | 3 | 4 | 5; 
    sortRank: number;

    description: string;
    category: 'ADSORBATE' | 'AVATAR_MATERIAL' | 'CONSUME' | 'EXCHANGE' | 'EXP_FRUIT' | 'FISH_BAIT' | 'FISH_ROD' | 'ITEM_VIRTUAL' | 'NOTICE_ADD_HP' | 'WEAPON_EXP_STONE' | 'WOOD'; 
    typeText: string;

    dropDomainId?: number;
    dropDomainName?: string;
    daysOfWeek?: string[];

    source: string[];
    sources: string[];

    images: {
        filename_icon: string;
    };
}