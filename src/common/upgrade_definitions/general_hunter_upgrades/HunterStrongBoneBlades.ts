import { ResourceTypes } from "../../Resources";
import { Upgrades } from "../../Upgrades";
import { UpgradeDefinition } from "../UpgradeDefinition";

const BASE_BONE_COST = 5;
const calculateBoneCost = (): number => {
  return BASE_BONE_COST;
};

export const HunterStrongBoneBlades: UpgradeDefinition = {
  upgrade: Upgrades.HUNTER_STRONG_BONE_BLADES,
  getCost: () => {
    return new Map([[ResourceTypes.DRAGON_BONE, calculateBoneCost()]]);
  },
  prerequisites: {
    upgrades: [Upgrades.HUNTER_NORMAL_BONE_BLADES],
  },
};
