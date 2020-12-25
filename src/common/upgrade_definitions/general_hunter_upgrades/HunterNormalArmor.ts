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

export const HunterNormalArmor: UpgradeDefinition = {
  upgrade: Upgrades.HUNTER_NORMAL_ARMOR,
  getCost: () => {
    return new Map([
      [ResourceTypes.WYVERN_BONE, calculateBoneCost()],
      [ResourceTypes.WYVERN_HIDE, calculateHideCost()],
      [ResourceTypes.WYVERN_LEATHER, calculateLeatherCost()],
    ]);
  },
  prerequisites: {
    upgrades: [Upgrades.HUNTER_WEAK_ARMOR],
  },
};
