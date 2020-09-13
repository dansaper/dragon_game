import { getEmptyModel } from "../common/GameState";
import { ResourceTypes } from "../common/Resources";
import { messageFromWorker, messageToWorker } from "../common/WorkerTypes";
import { GameStateUpdater } from "./GameStateUpdater";

interface GameWorkerThreadInterface extends DedicatedWorkerGlobalScope {
  postMessage: (ev: messageFromWorker) => void;
  onmessage: (ev: MessageEvent<messageToWorker>) => void;
}

// We're actually running from a web worker, not a window
const ctx = (self as unknown) as GameWorkerThreadInterface;

const worker = new GameStateUpdater();

let currentState = getEmptyModel();
// Temporarily use a state with some stuff in it to start us out
currentState.resources.set(ResourceTypes.WYVERN_BONE, 0);
currentState.resources.set(ResourceTypes.WYVERN_HIDE, 3);

let paused = false;

ctx.onmessage = (ev) => {
  if (ev.data === "toggle_pause") {
    paused = !paused;
    return;
  }

  if (paused) {
    return;
  }

  const events = ev.data;

  currentState = worker.handleEvents(currentState, events);
  ctx.postMessage(currentState);
};

ctx.postMessage(currentState);
startTicking(1000);

function startTicking(time: number) {
  setInterval(() => {
    if (paused) {
      return;
    }

    currentState = worker.tick(currentState);
    ctx.postMessage(currentState);
  }, time);
}
