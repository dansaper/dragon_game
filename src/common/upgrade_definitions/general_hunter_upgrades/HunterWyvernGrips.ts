import { ResourceTypes } from "../../Resources";
import { Upgrades } from "../../Upgrades";
import { UpgradeDefinition } from "../UpgradeDefinition";

const BASE_LEATHER_COST = 5;
const calculateLeatherCost = (): number => {
  return BASE_LEATHER_COST;
};

export const HunterWyvernGrips: UpgradeDefinition = {
  upgrade: Upgrades.HUNTER_WYVERN_GRIPS,
  getCost: () => {
    return new Map([[ResourceTypes.WYVERN_LEATHER, calculateLeatherCost()]]);
  },
  prerequisites: {
    upgrades: [Upgrades.HUNTER_BABY_WYVERN_GRIPS],
  },
};
