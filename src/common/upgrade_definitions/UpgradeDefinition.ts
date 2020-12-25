import { GameEventPrerequisites } from "../GameEventPrerequisites";
import { GameState } from "../GameState";
import { ResourceTypes } from "../Resources";
import { Upgrade } from "../Upgrades";

export interface UpgradeDefinition {
  upgrade: Upgrade;
  prerequisites?: GameEventPrerequisites;
  getCost: (state: GameState) => Map<ResourceTypes, number>;
}
