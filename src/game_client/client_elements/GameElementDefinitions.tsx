import { DetailedInfoKeys } from "../../common/DetailedInfo";
import { GameEvent } from "../../common/events/GameEvents";
import { PurchaseUpgradeEvent } from "../../common/events/PurchaseUpgradeEvent";
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

interface OptionalUpgradeDisplayDefinitionProps {
  isVisible: (state: GameState) => boolean;
  isViewable: (state: GameState) => boolean;
  isPurchaseable: (state: GameState) => boolean;
  infoKey: DetailedInfoKeys;
  getCost: (state: GameState) => Map<ResourceTypes, number>;
  purchase: (state: GameState) => GameEvent[];
  details: string;
}

interface RequiredUpgradeDisplayDefinitionProps {
  title: string;
  upgrade: Upgrades;
  parents: Upgrades[];
}

export type UpgradeDisplayDefinition = OptionalUpgradeDisplayDefinitionProps &
  RequiredUpgradeDisplayDefinitionProps;

const DefaultUpgradeDefinitionProps: OptionalUpgradeDisplayDefinitionProps = {
  isVisible: () => true,
  isViewable(this: UpgradeDisplayDefinition, state: GameState) {
    return this.parents.every(p => state.upgrades.has(p));
  },
  isPurchaseable(this: UpgradeDisplayDefinition, state: GameState) {
    return Utils.costCheck(state, this.getCost(state));
  },
  infoKey: DetailedInfoKeys.NO_INFO,
  getCost: () => new Map(),
  purchase(this: UpgradeDisplayDefinition, state: GameState) {
    return [...Utils.costsToEvents(this.getCost(state)), new PurchaseUpgradeEvent(this.upgrade)];
  },
  details: "No Details"
};

export function MakeUpgradeDisplayDef<T>(
  custom: RequiredUpgradeDisplayDefinitionProps & Partial<OptionalUpgradeDisplayDefinitionProps> & T
): UpgradeDisplayDefinition & T {
  return Object.assign({}, DefaultUpgradeDefinitionProps, custom);
}
