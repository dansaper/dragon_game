import * as React from "react";
import { GameState } from "../../common/GameState";
import { Purchases } from "../../common/Purchases";
import { PurchaseButton } from "./common/PurchaseButton";

interface BaseCampTabProps {
  gameState: GameState;
}

export const BaseCampTab: React.FunctionComponent<BaseCampTabProps> = (props) => {
  return (
    <div>
      <PurchaseButton gameState={props.gameState} purchase={Purchases.BASE_CAMP_HUNT_BABY_WYVERN} />
      <PurchaseButton
        gameState={props.gameState}
        purchase={Purchases.BASE_CAMP_CRAFT_BABY_WYVERN_LEATHER}
      />
      <PurchaseButton
        gameState={props.gameState}
        purchase={Purchases.BASE_CAMP_HIRE_PLAINS_HUNTER}
      />
    </div>
  );
};
