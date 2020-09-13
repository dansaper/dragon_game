import { GameEvent } from "./GameEvents";
import { GameState } from "./GameState";

export type messageToWorker = GameEvent[] | "toggle_pause";
export type messageFromWorker = GameState;
