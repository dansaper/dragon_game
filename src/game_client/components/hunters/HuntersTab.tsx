import * as React from "react";
import { GameState } from "../../../common/GameState";
import { HunterUpgradePanel } from "./HunterUpgradePanel";

interface HuntersTabProps {
  gameState: GameState;
}

export const HuntersTab: React.FunctionComponent<HuntersTabProps> = (props) => {
  return (
    <div className="hunters-tab">
      <HunterUpgradePanel gameState={props.gameState} />
    </div>
  );
};
