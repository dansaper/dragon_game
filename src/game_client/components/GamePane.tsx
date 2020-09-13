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

export class GamePane extends React.Component<GamePaneProps> {
  constructor(props: GamePaneProps) {
    super(props);
    this.pauseHandler = this.pauseHandler.bind(this);
  }

  public render() {
    return (
      <React.StrictMode>
        <GameMenu
          isPaused={this.props.clientState.isPaused}
          onPause={this.pauseHandler}
          onUnpause={this.pauseHandler}
        />
        <GameContentPane clientState={this.props.clientState} gameState={this.props.gameState} />
      </React.StrictMode>
    );
  }

  private pauseHandler() {
    GameClient.toggleGamePause();
  }
}
