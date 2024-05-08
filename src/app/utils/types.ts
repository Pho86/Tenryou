import React from "react";

export type Character = {
    region: string;
    fileName: string;
    voices: string[];
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
    talents: any[];
    title: string;
    elementText: string;
    vision_key: string;
    weaponText: string;
    weapon_type: string;
    cv: {
        english:string;
        japanese:string;
    }
}