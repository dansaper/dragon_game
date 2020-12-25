import { GameEvent } from "./GameEvents";
import { GameState } from "./GameState";

export type MessageToWorker = GameEvent[] | "toggle_pause" | "set_debug_state";
export type MessageFromWorker = GameState;
