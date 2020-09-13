import * as React from "react";
import { GameState } from "../../../common/GameState";
import { GameMap } from "./GameMap";

interface GameMapTabProps {
  gameState: GameState;
}

export class GameMapTab extends React.Component<GameMapTabProps> {
  public render() {
    return (
      <div>
        <GameMap ownedTiles={[]} />
      </div>
    );
  }
}
