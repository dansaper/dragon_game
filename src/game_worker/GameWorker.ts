import { GameEvent, GameStateModificationHandlers } from "../common/events/GameEvents";
import { GameState } from "../common/GameState";

export class GameWorker {
  public tick(state: GameState): GameState {
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
