import * as React from "react";
import { GameEvent, GameEventTypes } from "../../common/GameEvents";
import { ClientActions, ClientEvent } from "../ClientEvents";
import { GameClient } from "../GameClient";
import { DetailedInfoPanelWrapper } from "./DetailedInfoPanelWrapper";
import { MainContentPane } from "./MainContentPane";
import { PauseButton } from "./PauseButton";
import { ResourceList } from "./ResourceList";

interface IGamePane {
  game: GameClient;
}

export class GamePane extends React.Component<IGamePane, {}> {
  public render() {
    const clientState = this.props.game.clientState;
    const gameState = this.props.game.gameState;
    return (
      <>
        <div className="game_menu">
          <PauseButton
            isPaused={clientState.isPaused}
            pause={() => {
              this.props.game.sendClientEvents([ClientEvent(ClientActions.PAUSE)]);
              this.props.game.sendGameEvents([GameEvent(GameEventTypes.PAUSE)]);
            }}
            unpause={() => {
              this.props.game.sendClientEvents([ClientEvent(ClientActions.UNPAUSE)]);
              this.props.game.sendGameEvents([GameEvent(GameEventTypes.UNPAUSE)]);
            }}
          />
        </div>
        <div className="game_pane">
          <div className="resource_pane">
            <ResourceList resources={gameState.resources} />
          </div>
          <div className="main_content_pane">
            <div>Foo Bar Baz</div>
            <div>Biz Bak Boo</div>
            <MainContentPane
              sendevent={e => {
                this.props.game.sendGameEvents([e]);
              }}
            />
          </div>
          <DetailedInfoPanelWrapper
            info={clientState.currentDetailedInfo}
            isPanelOpen={clientState.isDetailedInfoVisible}
            togglePanel={() => {
              this.props.game.sendClientEvents([
                ClientEvent(ClientActions.DETAILED_INFO_PANEL_TOGGLE)
              ]);
            }}
          />
        </div>
      </>
    );
  }
}
