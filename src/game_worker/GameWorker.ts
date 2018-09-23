import { GameEventTypes, IGameEvent, ResourceModificationEvent } from "../common/GameEvents";
import { ResourceTypes } from "../common/GameStateModels";
import { GameState } from "./WorkerGameState";

export class GameWorker {
  public tick(state: GameState): GameState {
    const hide = state.resources.get(ResourceTypes.WYVERN_HIDE);
    if (hide !== undefined) {
      state.resources.set(ResourceTypes.WYVERN_HIDE, hide + 1);
    }
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
