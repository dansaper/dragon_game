import * as React from "react";
import { GameState } from "../../../common/GameState";
import { HunterUpgradePanel } from "./HunterUpgradePanel";

interface HuntersTabProps {
  gameState: GameState;
}

export class HuntersTab extends React.Component<HuntersTabProps> {
  public render() {
    return (
      <div className="hunters-tab">
        <HunterUpgradePanel gameState={this.props.gameState} />
      </div>
    );
  }
}
