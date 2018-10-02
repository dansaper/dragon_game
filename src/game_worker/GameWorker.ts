import { GameEvent, GameStateModificationHandlers } from "../common/events/GameEvents";
import { WorkerGameState } from "./WorkerGameState";

export class GameWorker {
  public tick(state: WorkerGameState): WorkerGameState {
    return state;
  }

  public handleEvents(state: WorkerGameState, events: GameEvent[]): WorkerGameState {
    events.forEach(event => {
      const handler = GameStateModificationHandlers.get(event.eventType);
      if (handler !== undefined) {
        state = handler(state, event);
      }
    });
    return state;
  }
}
