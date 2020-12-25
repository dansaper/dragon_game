import { ResourceTypes } from "../../Resources";
import { Upgrades } from "../../Upgrades";
import { UpgradeDefinition } from "../UpgradeDefinition";

const BASE_BONE_COST = 5;
const calculateBoneCost = (): number => {
  return BASE_BONE_COST;
};
const BASE_LEATHER_COST = 10;
const calculateLeatherCost = (): number => {
  return BASE_LEATHER_COST;
};

export const PlainsHunterWeakLeatherBoots: UpgradeDefinition = {
  upgrade: Upgrades.PLAINS_HUNTER_WEAK_LEATHER_BOOTS,
  getCost: () => {
    return new Map([
      [ResourceTypes.BABY_WYVERN_BONE, calculateBoneCost()],
      [ResourceTypes.BABY_WYVERN_LEATHER, calculateLeatherCost()],
    ]);
  },
};
