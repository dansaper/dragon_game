import * as React from "react";
import { ClientState } from "../ClientState";
import { GameState } from "../../common/GameState";
import { GameContentPane } from "./GameContentPane";
import { GameMenu } from "./GameMenu";
import { GameClient } from "../GameClient";

interface GamePaneProps {
  clientState: ClientState;
  gameState: GameState;
}

const pauseHandler = () => {
  GameClient.toggleGamePause();
};

export const GamePane: React.FunctionComponent<GamePaneProps> = (props) => {
  return (
    <React.StrictMode>
      <GameMenu
        isPaused={props.clientState.isPaused}
        onPause={pauseHandler}
        onUnpause={pauseHandler}
      />
      <GameContentPane clientState={props.clientState} gameState={props.gameState} />
    </React.StrictMode>
  );
};
