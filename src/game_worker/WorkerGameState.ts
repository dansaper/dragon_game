import { IGameState, Resources } from "../common/GameStateModels";

export class GameState implements IGameState {
  constructor(public resources: Resources) {}
}
