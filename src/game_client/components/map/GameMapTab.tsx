import * as React from "react";
import { GameState } from "../../../common/GameState";
import { GameMap } from "./GameMap";

interface GameMapTabProps {
  gameState: GameState;
}

export const GameMapTab: React.FunctionComponent<GameMapTabProps> = (_props) => {
  return (
    <div>
      <GameMap ownedTiles={[]} />
    </div>
  );
};
