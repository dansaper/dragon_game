import { DetailedInfoKeys } from "../../common/DetailedInfo";
import { GameEvent } from "../../common/events/GameEvents";
import { GameState } from "../../common/GameState";
import { ResourceTypes } from "../../common/Resources";
import { Upgrades } from "../../common/Upgrades";
import * as Utils from "./LibraryUtils";

export interface PurchaseButtonDefinition {
  isVisible: (state: GameState) => boolean;
  isPurchaseable: (state: GameState) => boolean;
  title: string;
  infoKey: DetailedInfoKeys;
  getCost: (state: GameState) => Map<ResourceTypes, number>;
  getOutputs: (state: GameState) => Map<ResourceTypes, number>;
  purchase: (state: GameState) => GameEvent[];
}

const DefaultPurchaseButton: PurchaseButtonDefinition = {
  isVisible: () => true,
  isPurchaseable(state: GameState) {
    return Utils.costCheck(state, this.getCost(state));
  },
  title: "No Title",
  infoKey: DetailedInfoKeys.NO_INFO,
  getCost: () => new Map(),
  getOutputs: () => new Map(),
  purchase(state: GameState) {
    return [
      ...Utils.costsToEvents(this.getCost(state)),
      ...Utils.outputsToResourceEvents(this.getOutputs(state))
    ];
  }
};

export function MakePurchaseButtonDef<T>(
  custom: Partial<PurchaseButtonDefinition> & T
): PurchaseButtonDefinition & T {
  return Object.assign({}, DefaultPurchaseButton, custom);
}

export interface UpgradeDisplayDefinition {
  isVisible: (state: GameState) => boolean;
  isViewable: (state: GameState) => boolean;
  isPurchaseable: (state: GameState) => boolean;
  title: string;
  infoKey: DetailedInfoKeys;
  getCost: (state: GameState) => Map<ResourceTypes, number>;
  getOutputs: (state: GameState) => Upgrades[];
  purchase: (state: GameState) => GameEvent[];
  details: string;
  parents: Upgrades[];
}

const DefaultUpgradeDefinition: UpgradeDisplayDefinition = {
  isVisible: () => true,
  isViewable(state: GameState) {
    return this.parents.every(p => state.upgrades.has(p));
  },
  isPurchaseable(state: GameState) {
    return Utils.costCheck(state, this.getCost(state));
  },
  title: "No Title",
  infoKey: DetailedInfoKeys.NO_INFO,
  getCost: () => new Map(),
  getOutputs: () => [],
  purchase(state: GameState) {
    return [
      ...Utils.costsToEvents(this.getCost(state)),
      ...Utils.outputsToUpgradeEvents(this.getOutputs(state))
    ];
  },
  details: "No Details",
  parents: []
};

export function MakeUpgradeDisplayDef<T>(
  custom: Partial<UpgradeDisplayDefinition> & T
): UpgradeDisplayDefinition & T {
  return Object.assign({}, DefaultUpgradeDefinition, custom);
}
