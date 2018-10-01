import * as React from "react";
import { GameEvent, GameEventTypes } from "../../common/GameEvents";
import { GameState } from "../../common/GameState";
import { ClientActions, ClientEvent, IClientEvent } from "../ClientEvents";
import { ClientState } from "../ClientState";
import { GameClient } from "../GameClient";
import { GameContentPane } from "./GameContentPane";
import { GameMenu } from "./GameMenu";

interface GamePaneProps {
  clientState: ClientState;
  gameState: GameState;
  sendGameEvents: (e: GameEvent[]) => void;
  sendClientEvents: (e: IClientEvent[]) => void;
}

export class GamePane extends React.PureComponent<GamePaneProps, {}> {
  constructor(props: GameClient) {
    super(props);
    this.pauseHandler = this.pauseHandler.bind(this);
    this.unpauseHandler = this.unpauseHandler.bind(this);
  }

  public render() {
    return (
      <>
        <GameMenu
          isPaused={this.props.clientState.isPaused}
          onPause={this.pauseHandler}
          onUnpause={this.unpauseHandler}
        />
        <GameContentPane
          clientState={this.props.clientState}
          gameState={this.props.gameState}
          sendGameEvents={this.props.sendGameEvents}
          sendClientEvents={this.props.sendClientEvents}
        />
      </>
    );
  }

  private pauseHandler() {
    this.props.sendGameEvents([GameEvent(GameEventTypes.PAUSE)]);
    this.props.sendClientEvents([ClientEvent(ClientActions.PAUSE)]);
  }

  private unpauseHandler() {
    this.props.sendGameEvents([GameEvent(GameEventTypes.UNPAUSE)]);
    this.props.sendClientEvents([ClientEvent(ClientActions.UNPAUSE)]);
  }
}
