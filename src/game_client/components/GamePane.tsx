import * as React from "react";
import { GameEvent, GameEventTypes } from "../../common/GameEvents";
import { ClientActions, ClientEvent } from "../ClientEvents";
import { GameClient } from "../GameClient";
import { GameContentPane } from "./GameContentPane";
import { GameMenu } from "./GameMenu";

interface IGamePane {
  game: GameClient;
}

export class GamePane extends React.Component<IGamePane, {}> {
  public render() {
    return (
      <>
        <GameMenu
          isPaused={this.props.game.clientState.isPaused}
          onPause={() => {
            this.props.game.sendClientEvents([ClientEvent(ClientActions.PAUSE)]);
            this.props.game.sendGameEvents([GameEvent(GameEventTypes.PAUSE)]);
          }}
          onUnpause={() => {
            this.props.game.sendClientEvents([ClientEvent(ClientActions.UNPAUSE)]);
            this.props.game.sendGameEvents([GameEvent(GameEventTypes.UNPAUSE)]);
          }}
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
}
