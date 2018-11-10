import * as React from "react";
import { DetailedInfoKeys } from "../../../common/DetailedInfo";
import { GameEvent } from "../../../common/events/GameEvents";
import { GameState } from "../../../common/GameState";
import {
  PurchaseButtonDefinitions,
  PurchaseButtonGameElements
} from "../../client_elements/PurchaseButtonDefinitionLibrary";
import { ButtonWithInfo } from "./ButtonWithInfo";

interface CachedProperties {
  onClick: () => void;
  isVisible: () => boolean;
  isDisabled: () => boolean;
  title: string;
  infoKey: DetailedInfoKeys;
}

export class PurchaseButton extends React.Component<
  {
    button: PurchaseButtonGameElements;
    gameState: GameState;
    sendGameEvents: (e: GameEvent[]) => void;
  },
  {}
> {
  private cachedButtonProperties = new Map<PurchaseButtonGameElements, CachedProperties>();

  public render() {
    let cached;
    if (!this.cachedButtonProperties.has(this.props.button)) {
      const buttonDef = PurchaseButtonDefinitions.get(this.props.button)!;
      const propsCapturingThis = {
        isVisible: () => buttonDef.isVisible(this.props.gameState),
        isDisabled: () => !buttonDef.isEnabled(this.props.gameState),
        title: buttonDef.title,
        infoKey: buttonDef.infoKey,
        onClick: () => this.props.sendGameEvents(buttonDef.purchase(this.props.gameState))
      };
      this.cachedButtonProperties.set(this.props.button, propsCapturingThis);
      cached = propsCapturingThis;
    } else {
      cached = this.cachedButtonProperties.get(this.props.button);
    }

    return <ButtonWithInfo {...cached!} sendGameEvents={this.props.sendGameEvents} />;
  }
}
