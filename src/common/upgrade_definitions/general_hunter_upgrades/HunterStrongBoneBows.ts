import { ResourceTypes } from "../../Resources";
import { Upgrades } from "../../Upgrades";
import { UpgradeDefinition } from "../UpgradeDefinition";

const BASE_BONE_COST = 5;
const calculateBoneCost = (): number => {
  return BASE_BONE_COST;
};

export const HunterStrongBoneBows: UpgradeDefinition = {
  upgrade: Upgrades.HUNTER_STRONG_BONE_BOWS,
  getCost: () => {
    return new Map([[ResourceTypes.DRAGON_BONE, calculateBoneCost()]]);
  },
  prerequisites: {
    upgrades: [Upgrades.HUNTER_NORMAL_BONE_BOWS],
  },
};
