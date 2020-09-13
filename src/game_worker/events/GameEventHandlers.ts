import {
  GameEvent,
  ResourceModificationEvent,
  SetProgressionFlagEvent,
  PurchaseUpgradeEvent,
} from "../../common/GameEvents";
import { GameState } from "../../common/GameState";
import { setResource, setProgressionFlag, setUpgrade } from "./GameStateModifiers";

type EventHandler<T extends GameEvent> = (state: GameState, event: T) => GameState;

export const handleModifyResourceEvent: EventHandler<ResourceModificationEvent> = (
  state,
  event
) => {
  const prevAmount = state.resources.get(event.resourceType);
  return setResource(state, event.resourceType, (prevAmount || 0) + event.modification);
};

export const handlePurchaseUpgradeEvent: EventHandler<PurchaseUpgradeEvent> = (state, event) => {
  return setUpgrade(state, event.upgrade, true);
};

export const handleSetProgressionFlagEvent: EventHandler<SetProgressionFlagEvent> = (
  state,
  event
) => {
  return setProgressionFlag(state, event.flag, true);
};
