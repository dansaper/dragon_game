import * as React from "react";
import * as ReactDOM from "react-dom";

import { GamePane} from "./components/GamePane";
import { GameState } from "./game_worker/WorkerGameState";


const worker = new Worker("./dist/worker_bundle.js");
worker.onmessage = function(e) {
    ReactDOM.render(
        <GamePane state={new GameState(e.data)}/>,
        document.getElementById("game")
    );
}