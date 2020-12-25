import { GameEventPrerequisites } from "../GameEventPrerequisites";
import { GameState } from "../GameState";
import { Purchase } from "../Purchases";
import { ResourceTypes } from "../Resources";

export interface PurchaseDefinition {
  purchase: Purchase;
  prerequisites?: GameEventPrerequisites;
  getCost: (state: GameState) => Map<ResourceTypes, number>;
  getOutputs: (state: GameState) => Map<ResourceTypes, number>;
}
