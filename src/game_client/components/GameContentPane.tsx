import * as React from "react";
import { GameEvent } from "../../common/GameEvents";
import { GameState } from "../../common/GameState";
import { ClientActions, ClientEvent, IClientEvent } from "../ClientEvents";
import { ClientState } from "../ClientState";
import { DetailedInfoPanelWrapper } from "./DetailedInfoPanelWrapper";
import { MainContentPane } from "./MainContentPane";
import { ResourceList } from "./ResourceList";

interface GameContentPaneProps {
  clientState: ClientState;
  gameState: GameState;
  sendGameEvents: (e: GameEvent[]) => void;
  sendClientEvents: (e: IClientEvent[]) => void;
}

export class GameContentPane extends React.PureComponent<GameContentPaneProps, {}> {
  constructor(props: GameContentPaneProps) {
    super(props);
    this.togglePanel = this.togglePanel.bind(this);
  }

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
            clientState={this.props.clientState}
            gameState={this.props.gameState}
            sendGameEvents={this.props.sendGameEvents}
            sendClientEvents={this.props.sendClientEvents}
          />
        </div>
        <DetailedInfoPanelWrapper
          info={this.props.clientState.currentDetailedInfoKey}
          isPanelOpen={this.props.clientState.isDetailedInfoVisible}
          togglePanel={() => {
            this.props.sendClientEvents([ClientEvent(ClientActions.DETAILED_INFO_PANEL_TOGGLE)]);
          }}
        />
      </div>
    );
  }

  private togglePanel() {
    this.props.sendClientEvents([ClientEvent(ClientActions.DETAILED_INFO_PANEL_TOGGLE)]);
  }
}
