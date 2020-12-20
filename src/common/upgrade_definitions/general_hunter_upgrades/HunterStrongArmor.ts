import { ResourceTypes } from "../../Resources";
import { Upgrades } from "../../Upgrades";
import { UpgradeDefinition } from "../UpgradeDefinition";

const BASE_BONE_COST = 5;
const calculateBoneCost = (): number => {
  return BASE_BONE_COST;
};
const BASE_HIDE_COST = 3;
const calculateHideCost = (): number => {
  return BASE_HIDE_COST;
};
const BASE_LEATHER_COST = 5;
const calculateLeatherCost = (): number => {
  return BASE_LEATHER_COST;
};

export const HunterStrongArmor: UpgradeDefinition = {
  upgrade: Upgrades.HUNTER_STRONG_ARMOR,
  getCost: () => {
    return new Map([
      [ResourceTypes.DRAGON_BONE, calculateBoneCost()],
      [ResourceTypes.DRAGON_HIDE, calculateHideCost()],
      [ResourceTypes.DRAGON_LEATHER, calculateLeatherCost()],
    ]);
  },
  prerequisites: {
    upgrades: [Upgrades.HUNTER_NORMAL_ARMOR],
  },
};
