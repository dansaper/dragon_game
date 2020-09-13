import * as React from "react";
import { ClientState } from "../ClientState";
import { GameState } from "../../common/GameState";
import { DetailedInfoPanelWrapper } from "./DetailedInfoPanelWrapper";
import { MainContentPane } from "./MainContentPane";
import { ResourcePane } from "./ResourcePane";
import { GameClient } from "../GameClient";
import { ClientEventTypes } from "../client_events/ClientEvents";

interface GameContentPaneProps {
  clientState: ClientState;
  gameState: GameState;
}

export class GameContentPane extends React.Component<GameContentPaneProps> {
  constructor(props: GameContentPaneProps) {
    super(props);
    this.toggleInfoPanel = this.toggleInfoPanel.bind(this);
  }

  public render() {
    return (
      <div className="game-content-pane">
        <ResourcePane resources={this.props.gameState.resources} />
        <MainContentPane clientState={this.props.clientState} gameState={this.props.gameState} />
        <DetailedInfoPanelWrapper
          isPanelOpen={this.props.clientState.isDetailedInfoPanelOpen}
          togglePanel={this.toggleInfoPanel}
          info={this.props.clientState.currentDetailedInfoKey}
        />
      </div>
    );
  }

  private toggleInfoPanel() {
    GameClient.sendClientEvents([
      {
        eventType: ClientEventTypes.TOGGLE_INFO_PANEL,
      },
    ]);
  }
}
