export enum Upgrades {
  PLAINS_HUNTER_WEAK_BONE_BOWS = "PLAINS_HUNTER_WEAK_BONE_BOWS",
  PLAINS_HUNTER_WEAK_LEATHER_BOOTS = "PLAINS_HUNTER_WEAK_LEATHER_BOOTS"
}

export enum UpgradeCategories {
  GENERAL_HUNTER_UPGRADES = "GENERAL_HUNTER_UPGRADES",
  PLAIN_HUNTER_UPGRADES = "PLAIN_HUNTER_UPGRADES"
}

const plainsHunterUpgrades = [
  Upgrades.PLAINS_HUNTER_WEAK_BONE_BOWS,
  Upgrades.PLAINS_HUNTER_WEAK_LEATHER_BOOTS
];

export const UpgradesMap: Map<UpgradeCategories, Upgrades[]> = new Map([
  [UpgradeCategories.PLAIN_HUNTER_UPGRADES, plainsHunterUpgrades]
]);
