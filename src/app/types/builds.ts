export type BuildMainStats = {
    flower?: string[];
    plume?: string[];
    sands?: string[];
    goblet?: string[];
    circlet?: string[];
};

export type TalentPriorityItem = "normal attack" | "elemental skill" | "elemental burst" | string;

export type CharacterBuild = {
    weapons: string[];
    artifacts: string[][];
    main_stats: BuildMainStats;
    sub_stats: string[];
    talent_priority: TalentPriorityItem[];
};

export type BuildTeam = {
    name: string;
    characters: string[];
};

export type CharacterBuildData = {
    id: string;
    name: string;
    build: CharacterBuild;
    teams: BuildTeam[];
};
