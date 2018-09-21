import { ResourceTypes } from "./GameStateModels";

export enum GameEventType {
  MODIFY_RESOURCE
}

export interface IGameEvent {
  eventType: GameEventType;
}

export class ResourceModificationEvent implements IGameEvent {
  public readonly eventType: GameEventType = GameEventType.MODIFY_RESOURCE;
  constructor(public resourceType: ResourceTypes, public modification: number) {}
}
