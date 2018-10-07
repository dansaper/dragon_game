import { DetailedInfoKeys } from "../../common/DetailedInfo";
import { GameEvent } from "../../common/events/GameEvents";
import { GameState } from "../../common/GameState";

export interface PurchaseButtonDefinition {
  isVisible: (state: GameState) => boolean;
  isEnabled: (state: GameState) => boolean;
  title: string;
  infoKey: DetailedInfoKeys;
  baseCost?: number;
  calculateCost?: (state: GameState) => number;
  purchase: (state: GameState) => GameEvent[];
  [propName: string]: any;
}
