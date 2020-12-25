import { ResourceTypes } from "../../Resources";
import { Upgrades } from "../../Upgrades";
import { UpgradeDefinition } from "../UpgradeDefinition";

const BASE_BONE_COST = 5;
const calculateBoneCost = (): number => {
  return BASE_BONE_COST;
};

export const HunterWeakBoneBows: UpgradeDefinition = {
  upgrade: Upgrades.HUNTER_WEAK_BONE_BOWS,
  getCost: () => {
    return new Map([[ResourceTypes.BABY_WYVERN_BONE, calculateBoneCost()]]);
  },
};
