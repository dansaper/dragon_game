import * as React from "react";
import { GameEvent } from "../../../common/events/GameEvents";
import { GameState } from "../../../common/GameState";
import {
  PurchaseButtonDefinitions,
  PurchaseButtonGameElements
} from "../../client_elements/PurchaseButtonDefinitionLibrary";
import { ResourceList } from "../ResourceList";
import { ButtonWithInfo } from "./ButtonWithInfo";

interface CachedProperties {
  onClick: () => void;
  isVisible: () => boolean;
  isDisabled: () => boolean;
  renderContent: () => JSX.Element;
}

export class PurchaseButton extends React.Component<
  {
    button: PurchaseButtonGameElements;
    gameState: GameState;
    sendGameEvents: (e: GameEvent[]) => void;
  },
  {}
> {
  // We cache functions for a given button def so we don't recreate functions every time we render
  private cachedButtonProperties = new Map<PurchaseButtonGameElements, CachedProperties>();

  public render() {
    const buttonDef = PurchaseButtonDefinitions.get(this.props.button)!;

    let cached: CachedProperties;
    if (!this.cachedButtonProperties.has(this.props.button)) {
      const propsCapturingThis = {
        isVisible: () => buttonDef.isVisible(this.props.gameState),
        isDisabled: () => !buttonDef.isPurchaseable(this.props.gameState),
        onClick: () => this.props.sendGameEvents(buttonDef.purchase(this.props.gameState)),
        renderContent: () => {
          return (
            <div className={"purchase-button-cost"}>
              <ResourceList resources={buttonDef.getCost(this.props.gameState)} />
            </div>
          );
        }
      };
      this.cachedButtonProperties.set(this.props.button, propsCapturingThis);
      cached = propsCapturingThis;
    } else {
      cached = this.cachedButtonProperties.get(this.props.button)!;
    }

    return (
      <ButtonWithInfo
        {...cached}
        title={buttonDef.title}
        infoKey={buttonDef.infoKey}
        sendGameEvents={this.props.sendGameEvents}
      />
    );
  }
}
