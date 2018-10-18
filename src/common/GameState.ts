export enum ResourceTypes {
  BABY_WYVERN_BONE = "Baby Wyvern Bone",
  BABY_WYVERN_HIDE = "Baby Wyvern Hide",
  BABY_WYVERN_LEATHER = "Baby Wyvern Leather",
  PLAINS_HUNTER = "Plains Hunter",
  WYVERN_BONE = "Wyvern Bone",
  WYVERN_HIDE = "Wyvern Hide"
}

export type Resource = number;
export type Resources = Map<ResourceTypes, Resource>;

export enum GameProgressionFlags {
  BABY_WYVERN_LEATHER_UNLOCKED,
  PLAINS_HUNTER_UNLOCKED
}

export interface GameState {
  resources: Resources;
  flags: Set<GameProgressionFlags>;
}

export const EmptyModel: GameState = {
  resources: new Map(),
  flags: new Set()
};
