import * as React from "react";
import { GameEvent, GameEventTypes } from "../../common/GameEvents";
import { ClientActions, ClientEvent } from "../ClientEvents";
import { GameClient } from "../GameClient";
import { GameContentPane } from "./GameContentPane";
import { GameMenu } from "./GameMenu";

interface IGamePane {
  game: GameClient;
}

export class GamePane extends React.PureComponent<IGamePane, {}> {
  constructor(props: IGamePane) {
    super(props);
    this.pauseHandler = this.pauseHandler.bind(this);
    this.unpauseHandler = this.unpauseHandler.bind(this);
  }

  public render() {
    return (
      <>
        <GameMenu
          isPaused={this.props.game.clientState.isPaused}
          onPause={this.pauseHandler}
          onUnpause={this.unpauseHandler}
        />
        <GameContentPane
          clientState={this.props.game.clientState}
          gameState={this.props.game.gameState}
          sendGameEvents={e => this.props.game.sendGameEvents(e)}
          sendClientEvents={e => this.props.game.sendClientEvents(e)}
        />
      </>
    );
  }

  private pauseHandler() {
    this.props.game.sendGameEvents([GameEvent(GameEventTypes.PAUSE)]);
    this.props.game.sendClientEvents([ClientEvent(ClientActions.PAUSE)]);
  }

  private unpauseHandler() {
    this.props.game.sendGameEvents([GameEvent(GameEventTypes.UNPAUSE)]);
    this.props.game.sendClientEvents([ClientEvent(ClientActions.UNPAUSE)]);
  }
}
