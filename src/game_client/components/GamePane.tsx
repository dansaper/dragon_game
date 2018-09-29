import * as React from "react";
import { GameEvent, GameEventTypes } from "../../common/GameEvents";
import { ClientActions, ClientEvent } from "../ClientEvents";
import { IGameClient } from "../GameClient";
import { GameContentPane } from "./GameContentPane";
import { GameMenu } from "./GameMenu";

export class GamePane extends React.PureComponent<IGameClient, {}> {
  constructor(props: IGameClient) {
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
