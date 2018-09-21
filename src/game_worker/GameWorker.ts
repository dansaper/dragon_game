import {GameState} from "../GameState";
import { ResourceTypes } from "../GameStateModels";

export class GameWorker {
    tick(state: GameState) {
        state.resources.basic.get(ResourceTypes.WYVERN_HIDE).value.changeValue(1);
        return state;
    }
}