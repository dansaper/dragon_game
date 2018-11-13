import * as React from "react";
import { GameEvent } from "../../../common/events/GameEvents";
import { GameState } from "../../../common/GameState";
import { UpgradeCategories } from "../../../common/Upgrades";
import { HunterRow } from "./HunterRow";
import { HunterUpgradePanel } from "./HunterUpgradePanel";

interface HuntersTabProps {
  gameState: GameState;
  sendGameEvents: (e: GameEvent[]) => void;
}

export class HuntersTab extends React.Component<HuntersTabProps, {}> {
  constructor(props: HuntersTabProps) {
    super(props);
  }

  public render() {
    return (
      <div className="hunters-tab">
        <div className="hunter-rows">
          <HunterRow gameState={this.props.gameState} sendGameEvents={this.props.sendGameEvents} />
        </div>
        <HunterUpgradePanel
          gameState={this.props.gameState}
          sendGameEvents={this.props.sendGameEvents}
          category={UpgradeCategories.PLAIN_HUNTER_UPGRADES}
        />
      </div>
    );
  }
}
