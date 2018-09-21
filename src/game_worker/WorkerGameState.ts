import { IGameStateModel, Resources } from "../common/GameStateModels";

export class GameState implements IGameStateModel {
  constructor(public resources: Resources) {}
}
