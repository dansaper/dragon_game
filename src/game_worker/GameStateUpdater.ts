import { GameEvent, GameEventTypes } from "../common/GameEvents";
import { GameState } from "../common/GameState";
import { ResourceTypes } from "../common/Resources";
import { handlePurchaseEvent, handlePurchaseUpgradeEvent } from "./events/GameEventHandlers";
import { setProgressionFlag } from "./events/GameStateModifiers";
import { getProgressionFlagsFromEvents } from "./ProgressionFlagResolver";

export class GameStateUpdater {
  public tick(state: GameState): GameState {
    // Temporary to make sure rerendering ui works ok
    state.resources.set(
      ResourceTypes.WYVERN_BONE,
      (state.resources.get(ResourceTypes.WYVERN_BONE) ?? 0) + 1
    );
    return state;
  }

  public handleEvents(state: GameState, events: GameEvent[]): GameState {
    let newState = state;
    for (const event of events) {
      newState = this.handleEvent(newState, event);
    }

    const newProgressionFlags = getProgressionFlagsFromEvents(events, newState);

    for (const flag of newProgressionFlags) {
      newState = setProgressionFlag(newState, flag, true);
    }

    return newState;
  }

  private handleEvent(state: GameState, event: GameEvent): GameState {
    switch (event.eventType) {
      case GameEventTypes.PURCHASE:
        return handlePurchaseEvent(state, event);
      case GameEventTypes.PURCHASE_UPGRADE:
        return handlePurchaseUpgradeEvent(state, event);
      default:
        throw new Error(event);
    }
  }
}
