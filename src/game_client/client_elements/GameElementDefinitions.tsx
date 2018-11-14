import { DetailedInfoKeys } from "../../common/DetailedInfo";
import { GameEvent } from "../../common/events/GameEvents";
import { GameState } from "../../common/GameState";
import { ResourceTypes } from "../../common/Resources";
import { Upgrades } from "../../common/Upgrades";

export interface PurchaseButtonDefinition {
  isVisible: (state: GameState) => boolean;
  isPurchaseable: (state: GameState) => boolean;
  title: string;
  infoKey: DetailedInfoKeys;
  getCost: (state: GameState) => Map<ResourceTypes, number>;
  purchase: (state: GameState) => GameEvent[];
}

export interface UpgradeDisplayDefinition extends PurchaseButtonDefinition {
  isViewable: (state: GameState) => boolean;
  details: string;
  parents: Upgrades[];
}
