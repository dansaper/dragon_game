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

const toggleInfoPanel = () => {
  GameClient.sendClientEvents([
    {
      eventType: ClientEventTypes.TOGGLE_INFO_PANEL,
    },
  ]);
};

export const GameContentPane: React.FunctionComponent<GameContentPaneProps> = (props) => {
  return (
    <div className="game-content-pane">
      <ResourcePane resources={props.gameState.resources} />
      <MainContentPane clientState={props.clientState} gameState={props.gameState} />
      <DetailedInfoPanelWrapper
        isPanelOpen={props.clientState.isDetailedInfoPanelOpen}
        togglePanel={toggleInfoPanel}
        info={props.clientState.currentDetailedInfoKey}
      />
    </div>
  );
};
