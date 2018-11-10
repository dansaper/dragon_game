import * as React from "react";
import { GameEvent } from "../../../common/events/GameEvents";
import { GameState } from "../../../common/GameState";
import { HunterRow } from "./HunterRow";
import { HunterUpgradeCanvas } from "./HunterUpgradeCanvas";

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
        <div className="hunter-upgrade-panel">
          <HunterUpgradeCanvas
            gameState={this.props.gameState}
            sendGameEvents={this.props.sendGameEvents}
          />
        </div>
      </div>
    );
  }
}
