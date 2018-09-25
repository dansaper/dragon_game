import * as React from "react";
import { IGameEvent } from "../../common/GameEvents";
import { IGameState } from "../../common/GameStateModels";
import { ClientActions, ClientEvent, IClientEvent } from "../ClientEvents";
import { IClientState } from "../GameClient";
import { DetailedInfoPanelWrapper } from "./DetailedInfoPanelWrapper";
import { MainContentPane } from "./MainContentPane";
import { ResourceList } from "./ResourceList";

interface IGameContentPane {
  clientState: IClientState;
  gameState: IGameState;
  sendGameEvents: (e: IGameEvent[]) => void;
  sendClientEvents: (e: IClientEvent[]) => void;
}

export class GameContentPane extends React.PureComponent<IGameContentPane, {}> {
  public render() {
    return (
      <div className="game_content_pane">
        <div className="resource_pane">
          <ResourceList resources={this.props.gameState.resources} />
        </div>
        <div className="main_content_pane">
          <div>Foo Bar Baz</div>
          <div>Biz Bak Boo</div>
          <MainContentPane
            sendevent={e => {
              this.props.sendGameEvents([e]);
            }}
          />
        </div>
        <DetailedInfoPanelWrapper
          info={this.props.clientState.currentDetailedInfo}
          isPanelOpen={this.props.clientState.isDetailedInfoVisible}
          togglePanel={() => {
            this.props.sendClientEvents([ClientEvent(ClientActions.DETAILED_INFO_PANEL_TOGGLE)]);
          }}
        />
      </div>
    );
  }
}
