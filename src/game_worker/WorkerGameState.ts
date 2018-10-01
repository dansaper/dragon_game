import { GameState, Resources } from "../common/GameState";

export class WorkerGameState implements GameState {
  constructor(public resources: Resources) {}
}
