import { GameEvent, GameEventTypes } from "../common/events/GameEvents";
import { GameState } from "../common/GameState";
import { ResourceTypes } from "../common/Resources";
import { GameWorker } from "./GameWorker";

// We're actually running from a web worker, not a window
const ctx: Worker = self as any;

const worker = new GameWorker();

// Temporarily use a state with some stuff in it to start us out
let currentState: GameState;
currentState = {
  resources: new Map([[ResourceTypes.WYVERN_BONE, 0], [ResourceTypes.WYVERN_HIDE, 3]]),
  flags: new Set(),
  upgrades: new Set()
};

let paused = false;

ctx.onmessage = (ev: MessageEvent) => {
  const events = ev.data as GameEvent[];
  if (events.length === 0) {
    return;
  }

  // Handle pause and unpause, which affect the worker, not the game worker
  if (paused) {
    // Nothing can happen while paused except for unpausing
    if (events[0].eventType === GameEventTypes.TOGGLE_PAUSE) {
      paused = false;
    }
    return;
  }
  if (events[0].eventType === GameEventTypes.TOGGLE_PAUSE) {
    // We know we aren't paused, so unpause
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
