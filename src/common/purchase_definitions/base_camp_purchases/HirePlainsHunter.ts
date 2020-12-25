import { GameProgressionFlags } from "../../GameProgressionFlags";
import { Purchases } from "../../Purchases";
import { ResourceTypes } from "../../Resources";
import { PurchaseDefinition } from "../purchaseDefinition";

const BASE_LEATHER_COST = 2;
const calculateLeatherCost = (): number => {
  return BASE_LEATHER_COST;
};

export const HirePlainsHunter: PurchaseDefinition = {
  purchase: Purchases.BASE_CAMP_HIRE_PLAINS_HUNTER,
  getCost: () => {
    return new Map([[ResourceTypes.BABY_WYVERN_LEATHER, calculateLeatherCost()]]);
  },
  getOutputs: () => {
    return new Map([[ResourceTypes.PLAINS_HUNTER, 1]]);
  },
  prerequisites: {
    flags: [GameProgressionFlags.PLAINS_HUNTER_UNLOCKED],
  },
};
