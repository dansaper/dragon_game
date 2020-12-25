import { Purchase } from "./Purchases";
import { Upgrade } from "./Upgrades";

export const GameEventTypes = {
  PURCHASE: "PURCHASE",
  PURCHASE_UPGRADE: "PURCHASE_UPGRADE",
  SET_PROGRESSION_FLAG: "SET_PROGRESSION_FLAG",
} as const;

interface GameEventGuard {
  readonly eventType: typeof GameEventTypes[keyof typeof GameEventTypes];
}

export interface PurchaseEvent extends GameEventGuard {
  readonly eventType: typeof GameEventTypes.PURCHASE;
  purchase: Purchase;
}

export interface PurchaseUpgradeEvent extends GameEventGuard {
  readonly eventType: typeof GameEventTypes.PURCHASE_UPGRADE;
  upgrade: Upgrade;
}

export type GameEvent = PurchaseEvent | PurchaseUpgradeEvent;
