import {GameState, ResourceTypes} from "../GameState";

export class GameWorker {
    tick(state: GameState) {
        state.resources.basic.get(ResourceTypes.WYVERN_HIDE).value.changeValue(1);
        return state;
    }
}