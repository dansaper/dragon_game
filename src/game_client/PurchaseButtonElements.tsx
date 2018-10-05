import { DetailedInfoKeys } from "../common/DetailedInfo";
import { GameEvent } from "../common/events/GameEvents";
import { ResourceModificationEvent } from "../common/events/ResourceModificationEvent";
import { GameState, ResourceTypes } from "../common/GameState";

export enum PurchaseButtonGameElements {
  HUNT_BABY_WYVERN_BUTTON,
  HIRE_PLAINS_HUNTER_BUTTON
}

export interface PurchaseButtonDefinition {
  isVisible: (state: GameState) => boolean;
  isEnabled: (state: GameState) => boolean;
  title: string;
  infoKey: DetailedInfoKeys;
  baseCost?: number;
  calculateCost?: (state: GameState) => number;
  purchase: (state: GameState) => GameEvent[];
  [propName: string]: any;
}

function bindFunctions(obj: PurchaseButtonDefinition): PurchaseButtonDefinition {
  Object.keys(obj).forEach(k => {
    if (typeof obj[k] === "function") {
      obj[k] = obj[k].bind(obj);
    }
  });
  return obj;
}

export const PurchaseButtonDefinitions: Map<
  PurchaseButtonGameElements,
  PurchaseButtonDefinition
> = new Map();

const huntBabyWyvernsButton = {
  isVisible: () => true,
  isEnabled: () => true,
  title: "Hunt for a baby Wyverns",
  infoKey: DetailedInfoKeys.NO_INFO,
  purchase: () => {
    return [
      new ResourceModificationEvent(ResourceTypes.BABY_WYVERN_BONE, 1),
      new ResourceModificationEvent(ResourceTypes.BABY_WYVERN_HIDE, 1)
    ];
  }
};
PurchaseButtonDefinitions.set(
  PurchaseButtonGameElements.HUNT_BABY_WYVERN_BUTTON,
  bindFunctions(huntBabyWyvernsButton)
);

const hirePlainsHunterButton = {
  isVisible: () => true,
  isEnabled(state: GameState) {
    const gold = state.resources.get(ResourceTypes.GOLD);
    const cost = this.calculateCost();
    if (gold === undefined || gold < cost) {
      return false;
    }
    return true;
  },
  title: `Hire a ${ResourceTypes.PLAINS_HUNTER}`,
  infoKey: DetailedInfoKeys.NO_INFO,
  baseCost: 5,
  calculateCost() {
    return this.baseCost * 2;
  },
  purchase() {
    return [
      new ResourceModificationEvent(ResourceTypes.GOLD, -this.calculateCost()),
      new ResourceModificationEvent(ResourceTypes.PLAINS_HUNTER, 1)
    ];
  }
};
PurchaseButtonDefinitions.set(
  PurchaseButtonGameElements.HIRE_PLAINS_HUNTER_BUTTON,
  bindFunctions(hirePlainsHunterButton)
);
