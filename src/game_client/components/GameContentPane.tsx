import * as React from "react";
import { ClientState } from "../../common/ClientState";
import { GameEvent } from "../../common/events/GameEvents";
import { ToggleDetailedInfoPanelEvent } from "../../common/events/ToggleDetailedInfoPanelEvent";
import { GameState } from "../../common/GameState";
import { DetailedInfoPanelWrapper } from "./DetailedInfoPanelWrapper";
import { MainContentPane } from "./MainContentPane";
import { ResourceList } from "./ResourceList";

interface GameContentPaneProps {
  clientState: ClientState;
  gameState: GameState;
  sendGameEvents: (e: GameEvent[]) => void;
}

export class GameContentPane extends React.PureComponent<GameContentPaneProps, {}> {
  constructor(props: GameContentPaneProps) {
    super(props);
    this.toggleInfoPanel = this.toggleInfoPanel.bind(this);
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
          />
        </div>
        <DetailedInfoPanelWrapper
          isPanelOpen={this.props.clientState.isDetailedInfoPanelOpen}
          togglePanel={this.toggleInfoPanel}
          info={this.props.clientState.currentDetailedInfoKey}
        />
      </div>
    );
  }

  private toggleInfoPanel() {
    this.props.sendGameEvents([new ToggleDetailedInfoPanelEvent()]);
  }
}
