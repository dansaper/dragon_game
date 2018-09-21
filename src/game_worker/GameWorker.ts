import {GameState} from "./WorkerGameState";
import { ResourceTypes } from "../GameStateModels";

export class GameWorker {
    tick(state: GameState): GameState {
        const hide = state.resources.basic.get(ResourceTypes.WYVERN_HIDE);
        if (hide) {
            hide.value.changeValue(1);
        }
        return state;
    }
}