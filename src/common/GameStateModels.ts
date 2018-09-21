export enum ResourceTypes {
  WYVERN_BONE = "Wyvern Bone",
  WYVERN_HIDE = "Wyvern Hide"
}

export type Resource = number;
export type Resources = Map<ResourceTypes, Resource>;

export interface IGameStateModel {
  resources: Resources;
}
