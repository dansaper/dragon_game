import { Upgrades } from "../../../common/Upgrades";

export const HunterUpgradeButtonLayout: Map<Upgrades, { x: number; y: number }> = new Map();
const buttons = HunterUpgradeButtonLayout;
const p = (x: number, y: number) => {
  return { x, y };
};
// General Hunter buttons
buttons.set(Upgrades.HUNTER_WEAK_BONE_BLADES, p(20, 20));
buttons.set(Upgrades.HUNTER_NORMAL_BONE_BLADES, p(20, 120));
buttons.set(Upgrades.HUNTER_STRONG_BONE_BLADES, p(20, 220));

buttons.set(Upgrades.HUNTER_WEAK_ARMOR, p(160, 120));
buttons.set(Upgrades.HUNTER_NORMAL_ARMOR, p(160, 220));
buttons.set(Upgrades.HUNTER_STRONG_ARMOR, p(100, 320));
buttons.set(Upgrades.HUNTER_ARMOR_SPIKES, p(220, 320));

buttons.set(Upgrades.HUNTER_WEAK_BONE_BOWS, p(300, 20));
buttons.set(Upgrades.HUNTER_NORMAL_BONE_BOWS, p(300, 120));
buttons.set(Upgrades.HUNTER_STRONG_BONE_BOWS, p(300, 220));

buttons.set(Upgrades.HUNTER_BABY_WYVERN_GRIPS, p(360, 320));
buttons.set(Upgrades.HUNTER_WYVERN_GRIPS, p(360, 420));
buttons.set(Upgrades.HUNTER_DRAGON_GRIPS, p(360, 520));

// Plains Hunter buttons
buttons.set(Upgrades.PLAINS_HUNTER_WEAK_LEATHER_BOOTS, p(40, 20));
