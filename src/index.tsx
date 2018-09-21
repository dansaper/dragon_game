import * as React from "react";
import * as ReactDOM from "react-dom";

import {Game, GameState, ResourceTypes, ResourceValue} from "./GameState";
import {GamePane} from "./components/GamePane";

const initialState : GameState = {
        resources: {
            basic: new Map([
                [ResourceTypes.WYVERN_BONE, { value: new ResourceValue(0), displayName: "Wyvern Bone"}],
                [ResourceTypes.WYVERN_HIDE, { value: new ResourceValue(3), displayName: "Wyvern Hide"}]
            ])
        }
};

ReactDOM.render(
    <GamePane state={initialState}/>,
    document.getElementById("game")
)