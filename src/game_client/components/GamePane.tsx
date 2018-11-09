import * as React from "react";
import { ClientState } from "../../common/ClientState";
import { GameEvent, GameEventTypes } from "../../common/events/GameEvents";
import { GameState } from "../../common/GameState";
import { GameClient } from "../GameClient";
import { GameContentPane } from "./GameContentPane";
import { GameMenu } from "./GameMenu";

interface GamePaneProps {
  clientState: ClientState;
  gameState: GameState;
  sendGameEvents: (e: GameEvent[]) => void;
}

export class GamePane extends React.Component<GamePaneProps, {}> {
  constructor(props: GameClient) {
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
          sendGameEvents={this.props.sendGameEvents}
        />
        <GameContentPane
          clientState={this.props.clientState}
          gameState={this.props.gameState}
          sendGameEvents={this.props.sendGameEvents}
        />
      </React.StrictMode>
    );
  }

  private pauseHandler() {
    this.props.sendGameEvents([{ eventType: GameEventTypes.TOGGLE_PAUSE }]);
  }
}
