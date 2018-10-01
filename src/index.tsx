import { EmptyModel, GameState } from "./common/GameState";
import { GameClient } from "./game_client/GameClient";

const worker = new Worker("./dist/worker_bundle.js");
const game = new GameClient(worker, EmptyModel);
worker.onmessage = e => {
  const model: GameState = e.data as GameState;
  game.gameState = model;
  game.rerender();
};
