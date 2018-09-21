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
}
