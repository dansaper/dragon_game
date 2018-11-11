import { DetailedInfoKeys } from "../../common/DetailedInfo";
import { GameEvent } from "../../common/events/GameEvents";
import { GameState } from "../../common/GameState";
import { ResourceTypes } from "../../common/Resources";
import { Upgrades } from "../../common/Upgrades";

export interface PurchaseButtonDefinition {
  isVisible: (state: GameState) => boolean;
  isEnabled: (state: GameState) => boolean;
  title: string;
  infoKey: DetailedInfoKeys;
  getCost: (state: GameState) => Map<ResourceTypes, number>;
  purchase: (state: GameState) => GameEvent[];
}

export interface UpgradeDisplayDefinition extends PurchaseButtonDefinition {
  details: string;
  parents: Upgrades[];
  children: Upgrades[];
}
