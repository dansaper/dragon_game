import { EmptyModel, IGameState } from "./common/GameStateModels";
import { GameClient } from "./game_client/GameClient";

const worker = new Worker("./dist/worker_bundle.js");
const game = new GameClient(worker, EmptyModel);
worker.onmessage = e => {
  const model: IGameState = e.data as IGameState;
  game.gameState = model;
  game.rerender();
};
