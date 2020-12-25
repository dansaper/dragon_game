import { GameProgressionFlags } from "../../GameProgressionFlags";
import { Purchases } from "../../Purchases";
import { ResourceTypes } from "../../Resources";
import { PurchaseDefinition } from "../purchaseDefinition";

const BASE_HIDE_COST = 5;
const calculateHideCost = (): number => {
  return BASE_HIDE_COST;
};

export const CraftBabyWyvernLeather: PurchaseDefinition = {
  purchase: Purchases.BASE_CAMP_CRAFT_BABY_WYVERN_LEATHER,
  getCost: () => {
    return new Map([[ResourceTypes.BABY_WYVERN_HIDE, calculateHideCost()]]);
  },
  getOutputs: () => {
    return new Map([[ResourceTypes.BABY_WYVERN_LEATHER, 1]]);
  },
  prerequisites: {
    flags: [GameProgressionFlags.BABY_WYVERN_LEATHER_UNLOCKED],
  },
};
