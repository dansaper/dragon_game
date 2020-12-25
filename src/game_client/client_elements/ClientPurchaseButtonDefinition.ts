import { GameState } from "../../common/GameState";
import { Purchase } from "../../common/Purchases";
import { DetailedInfoKey } from "../DetailedInfo";

export interface ClientPurchaseButtonDefinition {
  purchase: Purchase;
  title: string;
  infoKey?: DetailedInfoKey;
  isVisible: (state: GameState) => boolean;
}
