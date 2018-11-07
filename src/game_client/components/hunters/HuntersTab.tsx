import * as React from "react";
import { GameEvent } from "../../../common/events/GameEvents";
import { GameState } from "../../../common/GameState";
import { HunterRow } from "./HunterRow";

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
      <div>
        <HunterRow gameState={this.props.gameState} sendGameEvents={this.props.sendGameEvents} />
      </div>
    );
  }
}
