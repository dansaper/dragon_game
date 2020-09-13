import { GameProgressionFlags } from "./GameState";
import { ResourceTypes } from "./Resources";
import { Upgrades } from "./Upgrades";

export const GameEventTypes = {
  MODIFY_RESOURCE: "modify_resource",
  PURCHASE_UPGRADE: "purchase_upgrade",
  SET_PROGRESSION_FLAG: "set_progression_flag",
} as const;

interface GameEventGuard {
  readonly eventType: typeof GameEventTypes[keyof typeof GameEventTypes];
}

export interface PurchaseUpgradeEvent extends GameEventGuard {
  readonly eventType: typeof GameEventTypes.PURCHASE_UPGRADE;
  upgrade: Upgrades;
}

export interface ResourceModificationEvent extends GameEventGuard {
  readonly eventType: typeof GameEventTypes.MODIFY_RESOURCE;
  resourceType: ResourceTypes;
  modification: number;
}

export interface SetProgressionFlagEvent extends GameEventGuard {
  readonly eventType: typeof GameEventTypes.SET_PROGRESSION_FLAG;
  flag: GameProgressionFlags;
}

export type GameEvent = PurchaseUpgradeEvent | ResourceModificationEvent | SetProgressionFlagEvent;
