import { GameEvent, GameEventTypes, ResourceModificationEvent } from "../common/GameEvents";
import { WorkerGameState } from "./WorkerGameState";

export class GameWorker {
  public tick(state: WorkerGameState): WorkerGameState {
    return state;
  }

  public handleEvents(state: WorkerGameState, events: GameEvent[]): WorkerGameState {
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
