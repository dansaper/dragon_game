import { ResourceTypes } from "../../Resources";
import { Upgrades } from "../../Upgrades";
import { UpgradeDefinition } from "../UpgradeDefinition";

const BASE_LEATHER_COST = 5;
const calculateLeatherCost = (): number => {
  return BASE_LEATHER_COST;
};

export const HunterDragonGrips: UpgradeDefinition = {
  upgrade: Upgrades.HUNTER_DRAGON_GRIPS,
  getCost: () => {
    return new Map([[ResourceTypes.DRAGON_LEATHER, calculateLeatherCost()]]);
  },
  prerequisites: {
    upgrades: [Upgrades.HUNTER_WYVERN_GRIPS],
  },
};
