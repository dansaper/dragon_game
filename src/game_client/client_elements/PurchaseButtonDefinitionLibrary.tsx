import * as BaseCampButtons from "./BaseCampButtons";
import { PurchaseButtonDefinition } from "./GameElementDefinitions";
import * as Utils from "./LibraryUtils";

export enum PurchaseButtonGameElements {
  HUNT_BABY_WYVERN_BUTTON,
  HIRE_PLAINS_HUNTER_BUTTON
}

export const PurchaseButtonDefinitions: Map<
  PurchaseButtonGameElements,
  PurchaseButtonDefinition
> = new Map();

PurchaseButtonDefinitions.set(
  PurchaseButtonGameElements.HUNT_BABY_WYVERN_BUTTON,
  Utils.bindFunctions(BaseCampButtons.HuntBabyWyverns)
);
PurchaseButtonDefinitions.set(
  PurchaseButtonGameElements.HIRE_PLAINS_HUNTER_BUTTON,
  Utils.bindFunctions(BaseCampButtons.HirePlainsHunter)
);
