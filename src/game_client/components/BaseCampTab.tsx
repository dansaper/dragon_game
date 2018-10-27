import * as React from "react";
import { GameEvent } from "../../common/events/GameEvents";
import { GameState } from "../../common/GameState";
import { PurchaseButtonGameElements } from "../client_elements/PurchaseButtonDefinitionLibrary";
import { PurchaseButton } from "./common/PurchaseButton";

interface BaseCampTabProps {
  gameState: GameState;
  sendGameEvents: (e: GameEvent[]) => void;
}

export class BaseCampTab extends React.Component<BaseCampTabProps, {}> {
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
        <PurchaseButton
          gameState={this.props.gameState}
          button={PurchaseButtonGameElements.CRAFT_BABY_WYVERN_LEATHER_BUTTON}
          sendGameEvents={this.props.sendGameEvents}
        />
        <PurchaseButton
          gameState={this.props.gameState}
          button={PurchaseButtonGameElements.HIRE_PLAINS_HUNTER_BUTTON}
          sendGameEvents={this.props.sendGameEvents}
        />
      </div>
    );
  }
}
