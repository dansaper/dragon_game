import * as React from "react";
import { GameState } from "../../../common/GameState";
import {
  PurchaseButtonDefinitions,
  PurchaseButtonGameElements,
} from "../../client_elements/PurchaseButtonDefinitionLibrary";
import { GameClient } from "../../GameClient";
import { ResourceList } from "../ResourceList";
import { ButtonWithInfo } from "./ButtonWithInfo";

interface PurchaseButtonProps {
  button: PurchaseButtonGameElements;
  gameState: GameState;
}

export const PurchaseButton: React.FunctionComponent<PurchaseButtonProps> = (props) => {
  const cachedProps = React.useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const buttonDef = PurchaseButtonDefinitions.get(props.button)!;

    return {
      isVisible: () => buttonDef.isVisible(props.gameState),
      isDisabled: () => !buttonDef.isPurchaseable(props.gameState),
      onClick: () => GameClient.sendGameEvents(buttonDef.purchase(props.gameState)),
      renderContent: () => {
        return (
          <div className="purchase-button-cost">
            <ResourceList resources={buttonDef.getCost(props.gameState)} />
          </div>
        );
      },
      title: buttonDef.title,
      infoKey: buttonDef.infoKey,
    };
  }, [props.button, props.gameState]);

  return <ButtonWithInfo {...cachedProps}></ButtonWithInfo>;
};
