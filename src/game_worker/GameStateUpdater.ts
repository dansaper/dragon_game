import { GameEvent, GameEventTypes } from "../common/GameEvents";
import { GameState } from "../common/GameState";
import { ResourceTypes } from "../common/Resources";
import {
  handleModifyResourceEvent,
  handlePurchaseUpgradeEvent,
  handleSetProgressionFlagEvent,
} from "./events/GameEventHandlers";

export class GameStateUpdater {
  public tick(state: GameState): GameState {
    // Temporary to make sure rerendering ui works ok
    state.resources.set(
      ResourceTypes.WYVERN_BONE,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      state.resources.get(ResourceTypes.WYVERN_BONE)! + 1
    );
    return state;
  }

  public handleEvents(state: GameState, events: GameEvent[]): GameState {
    let newState = state;
    for (const event of events) {
      newState = this.handleEvent(newState, event);
    }

    return newState;
  }

  private handleEvent(state: GameState, event: GameEvent): GameState {
    switch (event.eventType) {
      case GameEventTypes.MODIFY_RESOURCE:
        return handleModifyResourceEvent(state, event);
      case GameEventTypes.PURCHASE_UPGRADE:
        return handlePurchaseUpgradeEvent(state, event);
      case GameEventTypes.SET_PROGRESSION_FLAG:
        return handleSetProgressionFlagEvent(state, event);
      default:
        throw new Error(event);
    }
  }
}
