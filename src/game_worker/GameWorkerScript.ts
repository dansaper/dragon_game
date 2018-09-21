import { ResourceTypes } from "../common/GameStateModels";
import { GameWorker } from "./GameWorker";
import { GameState } from "./WorkerGameState";

// We're actually running from a web worker, not a window
const ctx: Worker = self as any;

const worker = new GameWorker();

let currentState: GameState;
currentState = new GameState(
  new Map([[ResourceTypes.WYVERN_BONE, 0], [ResourceTypes.WYVERN_HIDE, 3]])
);

ctx.onmessage = (ev: MessageEvent) => {
  currentState = worker.handleEvents(currentState, ev.data);
  ctx.postMessage(currentState);
};

ctx.postMessage(currentState);
startTicking(1000);

function startTicking(time: number) {
  setInterval(() => {
    currentState = worker.tick(currentState);
    ctx.postMessage(currentState);
  }, time);
}
