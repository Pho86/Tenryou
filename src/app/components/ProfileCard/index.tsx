export const propertyGroups = {
    flat: ['FIGHT_PROP_HP', 'FIGHT_PROP_ATTACK', 'FIGHT_PROP_DEFENSE', 'FIGHT_PROP_ELEMENT_MASTERY', "FIGHT_PROP_BASE_ATTACK"],
    percent: ['FIGHT_PROP_HP_PERCENT', 'FIGHT_PROP_ATTACK_PERCENT', 'FIGHT_PROP_DEFENSE_PERCENT', 'FIGHT_PROP_CRITICAL', 'FIGHT_PROP_CRITICAL_HURT', 'FIGHT_PROP_CHARGE_EFFICIENCY', 'FIGHT_PROP_HEAL_ADD',],
    damageBonuses: ['FIGHT_PROP_PHYSICAL_ADD_HURT', 'FIGHT_PROP_FIRE_ADD_HURT', 'FIGHT_PROP_ELEC_ADD_HURT', 'FIGHT_PROP_WATER_ADD_HURT', 'FIGHT_PROP_WIND_ADD_HURT', 'FIGHT_PROP_ICE_ADD_HURT', 'FIGHT_PROP_ROCK_ADD_HURT', 'FIGHT_PROP_GRASS_ADD_HURT']
};

export function isPropertyFlat(property: string) {
    return propertyGroups.flat.includes(property);
}
export function isPropertyDamageBonus(property: string) {
    return propertyGroups.damageBonuses.includes(property);
}
export function isAttackStat(property: string) {
    return (
        (propertyGroups.flat.includes(property) && property === 'FIGHT_PROP_ATTACK') ||
        (propertyGroups.percent.includes(property) && property === 'FIGHT_PROP_ATTACK_PERCENT') ||
        (propertyGroups.flat.includes(property) && property === 'FIGHT_PROP_BASE_ATTACK')
    );
}
export function isDefenseStat(property: string) {
    return (
        (propertyGroups.flat.includes(property) && property === 'FIGHT_PROP_DEFENSE') ||
        (propertyGroups.percent.includes(property) && property === 'FIGHT_PROP_DEFENSE_PERCENT')
    );
}
export function isHPStat(property: string) {
    return (
        (propertyGroups.flat.includes(property) && property === 'FIGHT_PROP_HP') ||
        (propertyGroups.percent.includes(property) && property === 'FIGHT_PROP_HP_PERCENT')
    );
}


export * from "./grid"
export * from "./small"
export * from "./wide"