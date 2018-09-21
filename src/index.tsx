import * as React from "react";
import * as ReactDOM from "react-dom";
import { IGameStateModel } from "./common/GameStateModels";
import { ClientGame } from "./game_client/ClientGame";
import { GamePane } from "./game_client/components/GamePane";

const worker = new Worker("./dist/worker_bundle.js");
worker.onmessage = e => {
  const model: IGameStateModel = e.data as IGameStateModel;
  const game = new ClientGame(worker, model.resources);
  ReactDOM.render(<GamePane game={game} />, document.getElementById("game"));
};
