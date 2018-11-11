import { ResourceTypes } from "./Resources";
import { Upgrades } from "./Upgrades";

export enum GameProgressionFlags {
  BABY_WYVERN_LEATHER_UNLOCKED = "BABY_WYVERN_LEATHER_UNLOCKED",
  PLAINS_HUNTER_UNLOCKED = "PLAINS_HUNTER_UNLOCKED"
}

export interface GameState {
  resources: Map<ResourceTypes, number>;
  flags: Set<GameProgressionFlags>;
  upgrades: Set<Upgrades>;
}

export const EmptyModel: GameState = {
  resources: new Map(),
  flags: new Set(),
  upgrades: new Set()
};
