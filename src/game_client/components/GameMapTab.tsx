import * as React from "react";
import { GameEvent } from "../../common/events/GameEvents";
import { GameState } from "../../common/GameState";
import { GameMap } from "./map/GameMap";

interface GameMapTabProps {
  gameState: GameState;
  sendGameEvents: (e: GameEvent[]) => void;
}

export class GameMapTab extends React.PureComponent<GameMapTabProps, {}> {
  public render() {
    return (
      <div>
        <GameMap ownedTiles={[]} />
      </div>
    );
  }
}
