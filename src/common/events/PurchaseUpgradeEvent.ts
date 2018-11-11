import { GameState } from "../GameState";
import { Upgrades } from "../Upgrades";
import { GameEvent, GameEventTypes, GameStateModificationHandler } from "./GameEvents";

export class PurchaseUpgradeEvent implements GameEvent {
  public readonly eventType = GameEventTypes.PURCHASE_UPGRADE;
  constructor(public upgrade: Upgrades) {}
}

export const PurchaseUpgradeEventHandlers: GameStateModificationHandler = {
  gameState: (state: GameState, e: PurchaseUpgradeEvent) => {
    state.upgrades.add(e.upgrade);
    return state;
  }
};

export function IsSetProgressionFlagEvent(e: GameEvent): e is PurchaseUpgradeEvent {
  return e.eventType === GameEventTypes.PURCHASE_UPGRADE;
}
