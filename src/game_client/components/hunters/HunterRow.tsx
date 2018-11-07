import * as React from "react";
import { GameEvent } from "../../../common/events/GameEvents";
import { GameState } from "../../../common/GameState";

interface HuntersRowProps {
  gameState: GameState;
  sendGameEvents: (e: GameEvent[]) => void;
}

export class HunterRow extends React.Component<HuntersRowProps, {}> {
  constructor(props: HuntersRowProps) {
    super(props);
  }

  public render() {
    return (
      <div>
        <span>Test</span>
      </div>
    );
  }
}
