import * as React from "react";
import { GameEvent } from "../../../common/events/GameEvents";
import { GameState } from "../../../common/GameState";
import {
  PurchaseButtonDefinitions,
  PurchaseButtonGameElements
} from "../../client_elements/PurchaseButtonDefinitionLibrary";
import { ButtonWithInfo } from "./ButtonWithInfo";

export class PurchaseButton extends React.Component<
  {
    button: PurchaseButtonGameElements;
    gameState: GameState;
    sendGameEvents: (e: GameEvent[]) => void;
  },
  {}
> {
  public render() {
    const buttonDef = PurchaseButtonDefinitions.get(this.props.button)!;

    return (
      <ButtonWithInfo
        isVisible={() => buttonDef.isVisible(this.props.gameState)}
        isDisabled={() => !buttonDef.isEnabled(this.props.gameState)}
        title={buttonDef.title}
        infoKey={buttonDef.infoKey}
        onClick={() => this.props.sendGameEvents(buttonDef.purchase(this.props.gameState))}
        sendGameEvents={this.props.sendGameEvents}
      />
    );
  }
}
