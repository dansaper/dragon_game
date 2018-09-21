import {GameState} from "../GameState"
import {GameWorker} from "./GameWorker";
import { GameStateModel, ResourceTypes } from "../GameStateModels";

const ctx: Worker = self as any;
const worker = new GameWorker();

let currentState: GameState;
currentState = new GameState({
    resources: {
        basic: new Map([
            [ResourceTypes.WYVERN_BONE, { value: {value: 0}, displayName: "Wyvern Bone"}],
            [ResourceTypes.WYVERN_HIDE, { value: {value: 3}, displayName: "Wyvern Hide"}]
        ])
    }
});

startTicking(1000);

function startTicking(time: number) {
    setInterval(() => {
        currentState = worker.tick(currentState);
        ctx.postMessage(currentState);
    }, time)
}