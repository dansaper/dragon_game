import { GameProgressionFlag } from "./GameProgressionFlags";
import { ResourceTypes } from "./Resources";
import { Upgrade } from "./Upgrades";

export interface GameState {
  resources: Map<ResourceTypes, number>;
  flags: Set<GameProgressionFlag>;
  upgrades: Set<Upgrade>;
}

export const getEmptyModel: () => GameState = () => ({
  resources: new Map(),
  flags: new Set(),
  upgrades: new Set(),
});
