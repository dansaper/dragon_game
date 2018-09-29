import { GameEventTypes, IGameEvent, ResourceModificationEvent } from "../common/GameEvents";
import { GameState } from "./WorkerGameState";

export class GameWorker {
  public tick(state: GameState): GameState {
    return state;
  }

  public handleEvents(state: GameState, events: IGameEvent[]): GameState {
    events.forEach(event => {
      switch (event.eventType) {
        case GameEventTypes.MODIFY_RESOURCE: {
          const e = event as ResourceModificationEvent;
          const oldValue = state.resources.get(e.resourceType);
          if (oldValue !== undefined) {
            state.resources.set(e.resourceType, oldValue + e.modification);
          }
        }
      }
    });
    return state;
  }
}
