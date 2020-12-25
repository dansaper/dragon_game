import * as React from "react";
import { GameState } from "../../../common/GameState";
import { Purchase } from "../../../common/Purchases";
import { GameEventTypes } from "../../../common/GameEvents";
import { ClientPurchaseDefinitionsMap } from "../../client_elements/ClientPurchaseButtonDefinitionsMap";
import { PurchaseDefinitionsMap } from "../../../common/PurchaseDefinitionsMap";
import { canBuyPurchase } from "../PurchaseUtils";
import { GameClient } from "../../GameClient";
import { ResourceList } from "../ResourceList";
import { ButtonWithInfo } from "./ButtonWithInfo";

interface PurchaseButtonProps {
  purchase: Purchase;
  gameState: GameState;
}

export const PurchaseButton: React.FunctionComponent<PurchaseButtonProps> = (props) => {
  const cachedProps = React.useMemo(() => {
    const purchaseDef = PurchaseDefinitionsMap.get(props.purchase);
    const clientDef = ClientPurchaseDefinitionsMap.get(props.purchase);

    if (!purchaseDef || !clientDef) {
      throw new Error(`Unable to load definitions for purchase button: ${props.purchase}`);
    }

    return {
      isVisible: () => clientDef.isVisible(props.gameState),
      isDisabled: () => !canBuyPurchase(props.gameState, purchaseDef),
      onClick: () =>
        GameClient.sendGameEvents([
          {
            eventType: GameEventTypes.PURCHASE,
            purchase: props.purchase,
          },
        ]),
      renderContent: () => {
        return (
          <div className="purchase-button-cost">
            <ResourceList resources={purchaseDef.getCost(props.gameState)} />
          </div>
        );
      },
      title: clientDef.title,
      infoKey: clientDef.infoKey,
    };
  }, [props.purchase, props.gameState]);

  return <ButtonWithInfo {...cachedProps}></ButtonWithInfo>;
};
