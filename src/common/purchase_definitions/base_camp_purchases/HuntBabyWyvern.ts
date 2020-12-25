import { Purchases } from "../../Purchases";
import { ResourceTypes } from "../../Resources";
import { PurchaseDefinition } from "../purchaseDefinition";

export const HuntBabyWyvern: PurchaseDefinition = {
  purchase: Purchases.BASE_CAMP_HUNT_BABY_WYVERN,
  getCost: () => {
    return new Map();
  },
  getOutputs: () => {
    return new Map([
      [ResourceTypes.BABY_WYVERN_BONE, 1],
      [ResourceTypes.BABY_WYVERN_HIDE, 1],
    ]);
  },
};
