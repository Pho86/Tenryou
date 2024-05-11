export type Voiceover = {
    id: number;
    name: string;

    friendLines: Voiceline[];
    actionLines: Voiceline[];

    version: {
        [voicelineId: number | string]: string
    };
}

export type Voiceline = {
    voicelineId: number;
    title: string;
    voicelineType: string;
    description: string;
    voicefile: string;

    hasGenderedVoicefile?: boolean;
    voicefile_male?: string;

    hasUnlockConditions?: boolean;
    unlockConditions: {
        unlockText: string;
        conditionType: string; // enum
        paramList: number[];
    }[];
}