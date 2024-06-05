export type Artifact = {
    id: number;
    name: string;
    rarityList: (1 | 2 | 3 | 4 | 5)[];
    effect1Pc?: string; 
    effect2Pc?: string;
    effect4Pc?: string;
    flower?: ArtifactDetail;
    plume?: ArtifactDetail;
    sands?: ArtifactDetail;
    goblet?: ArtifactDetail;
    circlet?: ArtifactDetail;
    hover?:string;
    images: {
        filename_flower?: string;
        filename_plume?: string;
        filename_sands?: string;
        filename_goblet?: string;
        filename_circlet?: string;
        mihoyo_flower?: string;
        mihoyo_plume?: string;
        mihoyo_sands?: string;
        mihoyo_goblet?: string;
        mihoyo_circlet?: string;
    };

    version: string;
    rewardPreview:any;
}

export type ArtifactDetail = {
    name: string;
    relicType: 'EQUIP_BRACER' | 'EQUIP_NECKLACE' | 'EQUIP_SHOES' | 'EQUIP_RING' | 'EQUIP_DRESS'; 
    relicText: string;
    description: string;
    story: string;
}