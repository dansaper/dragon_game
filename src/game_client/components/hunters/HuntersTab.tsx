import * as React from "react";
import { GameEvent } from "../../../common/events/GameEvents";
import { GameState } from "../../../common/GameState";
import { HunterUpgradePanel } from "./HunterUpgradePanel";

interface HuntersTabProps {
  gameState: GameState;
  sendGameEvents: (e: GameEvent[]) => void;
}

export class HuntersTab extends React.Component<HuntersTabProps> {
  public render() {
    return (
      <div className="hunters-tab">
        <HunterUpgradePanel
          gameState={this.props.gameState}
          sendGameEvents={this.props.sendGameEvents}
        />
      </div>
    );
  }
}
