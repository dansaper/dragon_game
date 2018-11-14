import { Upgrades } from "../../../common/Upgrades";

export const HunterUpgradeButtonLayout: Map<Upgrades, { x: number; y: number }> = new Map();

// Plains Hunter buttons
HunterUpgradeButtonLayout.set(Upgrades.PLAINS_HUNTER_WEAK_BONE_BOWS, { x: 20, y: 20 });
HunterUpgradeButtonLayout.set(Upgrades.PLAINS_HUNTER_WEAK_LEATHER_BOOTS, { x: 40, y: 120 });
