import * as React from "react";
import * as ReactDOM from "react-dom";
import { ClientGameView } from "./game_client/ClientGameState";
import { GamePane } from "./game_client/components/GamePane";
import { IGameStateModel } from "./common/GameStateModels";

const worker = new Worker("./dist/worker_bundle.js");
worker.onmessage = e => {
  const model: IGameStateModel = e.data as IGameStateModel;
  ReactDOM.render(
    <GamePane {...new ClientGameView(model.resources)} />,
    document.getElementById("game")
  );
};
