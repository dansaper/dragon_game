import { GameEventTypes, IGameEvent } from "../common/GameEvents";
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

let paused = false;

ctx.onmessage = (ev: MessageEvent) => {
  const events = ev.data as IGameEvent[];
  if (events.length === 0) {
    return;
  }

  // Handle pause and unpause, which affect the worker, not the game worker
  if (paused) {
    // Nothing can happen while paused except for unpausing
    if (events[0].eventType === GameEventTypes.UNPAUSE) {
      paused = false;
    }
    return;
  }
  if (events[0].eventType === GameEventTypes.PAUSE) {
    paused = true;
    return;
  }

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
