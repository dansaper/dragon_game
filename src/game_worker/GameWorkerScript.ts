import { getEmptyModel } from "../common/GameState";
import { ResourceTypes } from "../common/Resources";
import { MessageFromWorker, MessageToWorker } from "../common/WorkerTypes";
import { GameStateUpdater } from "./GameStateUpdater";

interface GameWorkerThreadInterface extends DedicatedWorkerGlobalScope {
  postMessage: (ev: MessageFromWorker) => void;
  onmessage: (ev: MessageEvent<MessageToWorker>) => void;
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

  if (ev.data === "set_debug_state") {
    // currentState =
    ctx.postMessage(currentState);
    return;
  }

  if (paused) {
    return;
  }

  const events = ev.data;

  performance.mark("WorkerMessageRecieved");
  currentState = worker.handleEvents(currentState, events);
  performance.mark("WorkerMessagePosting");
  performance.measure("WorkerMessageTime", "WorkerMessageRecieved", "WorkerMessagePosting");
  performance.clearMarks("WorkerMessageRecieved");
  performance.clearMarks("WorkerMessagePosting");
  performance.clearMeasures("WorkerMessageTime");
  ctx.postMessage(currentState);
};

ctx.postMessage(currentState);
startTicking(1000);

function startTicking(time: number) {
  setInterval(() => {
    if (paused) {
      return;
    }

    performance.mark("WorkerTickStarting");
    currentState = worker.tick(currentState);
    performance.mark("WorkerTickPosting");
    performance.measure("WorkerTickTime", "WorkerTickStarting", "WorkerTickPosting");
    performance.clearMarks("WorkerTickStarting");
    performance.clearMarks("WorkerTickPosting");
    performance.clearMeasures("WorkerTickTime");
    ctx.postMessage(currentState);
  }, time);
}
