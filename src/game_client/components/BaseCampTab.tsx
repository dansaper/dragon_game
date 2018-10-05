import * as React from "react";
import { GameEvent } from "../../common/events/GameEvents";
import { GameState } from "../../common/GameState";
import { PurchaseButtonGameElements } from "../PurchaseButtonElements";
import { PurchaseButton } from "./common/PurchaseButton";

interface BaseCampTabProps {
  gameState: GameState;
  sendGameEvents: (e: GameEvent[]) => void;
}

export class BaseCampTab extends React.PureComponent<BaseCampTabProps, {}> {
  constructor(props: BaseCampTabProps) {
    super(props);
  }

  public render() {
    return (
      <div>
        <PurchaseButton
          gameState={this.props.gameState}
          button={PurchaseButtonGameElements.HUNT_BABY_WYVERN_BUTTON}
          sendGameEvents={this.props.sendGameEvents}
        />
      </div>
    );
  }
}
