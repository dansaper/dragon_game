import { GameEvent, GameStateModificationHandlers } from "../common/events/GameEvents";
import { GameState } from "../common/GameState";
import { ResourceTypes } from "../common/Resources";

export class GameWorker {
  public tick(state: GameState): GameState {
    // Temporary to make sure rerendering ui works ok
    state.resources.set(
      ResourceTypes.WYVERN_BONE,
      state.resources.get(ResourceTypes.WYVERN_BONE)! + 1
    );
    return state;
  }

  public handleEvents(state: GameState, events: GameEvent[]): GameState {
    for (const event of events) {
      const handler = GameStateModificationHandlers.get(event.eventType);
      if (handler !== undefined) {
        state = handler(state, event);
      }
    }
    return state;
  }
}
