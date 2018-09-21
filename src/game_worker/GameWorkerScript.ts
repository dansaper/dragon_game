import {GameState} from "../GameState"
import {GameWorker} from "./GameWorker";

const ctx: Worker = self as any;

const worker = new GameWorker();

ctx.onmessage = function(e) {
    const state : GameState = e.data;
    const newState = worker.tick(state);
    ctx.postMessage(newState, [newState]);
}