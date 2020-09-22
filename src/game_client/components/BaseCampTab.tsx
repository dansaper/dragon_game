import * as React from "react";
import { GameState } from "../../common/GameState";
import { PurchaseButtonGameElements } from "../client_elements/PurchaseButtonDefinitionLibrary";
import { PurchaseButton } from "./common/PurchaseButton";

interface BaseCampTabProps {
  gameState: GameState;
}

export const BaseCampTab: React.FunctionComponent<BaseCampTabProps> = (props) => {
  return (
    <div>
      <PurchaseButton
        gameState={props.gameState}
        button={PurchaseButtonGameElements.HUNT_BABY_WYVERN_BUTTON}
      />
      <PurchaseButton
        gameState={props.gameState}
        button={PurchaseButtonGameElements.CRAFT_BABY_WYVERN_LEATHER_BUTTON}
      />
      <PurchaseButton
        gameState={props.gameState}
        button={PurchaseButtonGameElements.HIRE_PLAINS_HUNTER_BUTTON}
      />
    </div>
  );
};
