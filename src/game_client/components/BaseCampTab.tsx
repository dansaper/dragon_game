import * as React from "react";
import { GameEvent } from "../../common/events/GameEvents";
import { GameState } from "../../common/GameState";
import { PurchaseButtonGameElements } from "../client_elements/PurchaseButtonDefinitionLibrary";
import { PurchaseButton } from "./common/PurchaseButton";

interface BaseCampTabProps {
  gameState: GameState;
  sendGameEvents: (e: GameEvent[]) => void;
}

export function BaseCampTab(props: BaseCampTabProps) {
  return (
    <div>
      <PurchaseButton
        gameState={props.gameState}
        button={PurchaseButtonGameElements.HUNT_BABY_WYVERN_BUTTON}
        sendGameEvents={props.sendGameEvents}
      />
      <PurchaseButton
        gameState={props.gameState}
        button={PurchaseButtonGameElements.CRAFT_BABY_WYVERN_LEATHER_BUTTON}
        sendGameEvents={props.sendGameEvents}
      />
      <PurchaseButton
        gameState={props.gameState}
        button={PurchaseButtonGameElements.HIRE_PLAINS_HUNTER_BUTTON}
        sendGameEvents={props.sendGameEvents}
      />
    </div>
  );
}
