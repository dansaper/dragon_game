import { ResourceTypes } from "./GameStateModels";

export enum GameEventTypes {
  PAUSE,
  UNPAUSE,
  MODIFY_RESOURCE
}

export interface IGameEvent {
  eventType: GameEventTypes;
}
export function GameEvent(event: GameEventTypes): IGameEvent {
  return {
    eventType: event
  };
}

export class ResourceModificationEvent implements IGameEvent {
  public readonly eventType = GameEventTypes.MODIFY_RESOURCE;
  constructor(public resourceType: ResourceTypes, public modification: number) {}
}
