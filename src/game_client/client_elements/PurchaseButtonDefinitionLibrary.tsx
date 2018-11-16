import * as BaseCampButtons from "./BaseCampButtons";
import { PurchaseButtonDefinition } from "./GameElementDefinitions";
import * as HunterPurchaseButtons from "./HunterPurchaseButtons";

export enum PurchaseButtonGameElements {
  HUNT_BABY_WYVERN_BUTTON,
  CRAFT_BABY_WYVERN_LEATHER_BUTTON,
  HIRE_PLAINS_HUNTER_BUTTON
}

export const PurchaseButtonDefinitions: Map<
  PurchaseButtonGameElements,
  PurchaseButtonDefinition
> = new Map();

PurchaseButtonDefinitions.set(
  PurchaseButtonGameElements.HUNT_BABY_WYVERN_BUTTON,
  BaseCampButtons.HuntBabyWyverns
);
PurchaseButtonDefinitions.set(
  PurchaseButtonGameElements.CRAFT_BABY_WYVERN_LEATHER_BUTTON,
  BaseCampButtons.CraftBabyWyvernLeather
);
PurchaseButtonDefinitions.set(
  PurchaseButtonGameElements.HIRE_PLAINS_HUNTER_BUTTON,
  HunterPurchaseButtons.HirePlainsHunter
);
