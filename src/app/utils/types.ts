import React from "react";

export type Character = {
    affiliation: string;
    birthday: string,
    constellation: any;
    constellations: {
        name: string;
        level: number;
        unlock: string;
        description: string;
        length: number;
        map: (child:any) => React.ReactNode;
    };
    description: string;
    gender: string;
    name: string;
    nation: string;
    passiveTalents: {
        map: (child:any) => React.ReactNode;
        name: string;
        level: number;
        unlock: string;
        description: string;
        length: number;
    };
    rarity: number;
    release: string;
    skillTalents: any[];
    title: string;
    vision: string;
    vision_key: string;
    weapon: string;
    weapon_type: string;
}