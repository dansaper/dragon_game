import * as React from "react";
import * as ReactDOM from "react-dom";

import { GamePane} from "./components/GamePane";
import { GameStateModel, ResourceTypes} from "./GameStateModels";
import { GameState } from "./GameState";


const worker = new Worker("./dist/worker_bundle.js");
worker.onmessage = function(e) {
    ReactDOM.render(
        <GamePane state={new GameState(e.data)}/>,
        document.getElementById("game")
    );
}