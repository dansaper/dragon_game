import * as React from "react";
import { GameState } from "../../../common/GameState";
import {
  PurchaseButtonDefinitions,
  PurchaseButtonGameElements,
} from "../../client_elements/PurchaseButtonDefinitionLibrary";
import { GameClient } from "../../GameClient";
import { ResourceList } from "../ResourceList";
import { ButtonWithInfo } from "./ButtonWithInfo";
import { PropertyCache } from "./PropertyCache";

interface CachedProperties {
  onClick: () => void;
  isVisible: () => boolean;
  isDisabled: () => boolean;
  renderContent: () => JSX.Element;
}

export class PurchaseButton extends React.Component<{
  button: PurchaseButtonGameElements;
  gameState: GameState;
}> {
  // We cache functions for a given button def so we don't recreate functions every time we render
  private cachedButtonProperties = new PropertyCache<
    PurchaseButtonGameElements,
    CachedProperties
  >();

  public render() {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const buttonDef = PurchaseButtonDefinitions.get(this.props.button)!;

    const propsCapturingThis = {
      isVisible: () => buttonDef.isVisible(this.props.gameState),
      isDisabled: () => !buttonDef.isPurchaseable(this.props.gameState),
      onClick: () => GameClient.sendGameEvents(buttonDef.purchase(this.props.gameState)),
      renderContent: () => {
        return (
          <div className="purchase-button-cost">
            <ResourceList resources={buttonDef.getCost(this.props.gameState)} />
          </div>
        );
      },
    };
    const cached = this.cachedButtonProperties.getOrSet(this.props.button, propsCapturingThis);

    return <ButtonWithInfo {...cached} title={buttonDef.title} infoKey={buttonDef.infoKey} />;
  }
}
