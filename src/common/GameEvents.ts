import { ResourceTypes } from "./GameState";

export enum GameEventTypes {
  PAUSE,
  UNPAUSE,
  MODIFY_RESOURCE
}

export interface GameEvent {
  eventType: GameEventTypes;
}
export function GameEvent(event: GameEventTypes): GameEvent {
  return {
    eventType: event
  };
}

export class ResourceModificationEvent implements GameEvent {
  public readonly eventType = GameEventTypes.MODIFY_RESOURCE;
  constructor(public resourceType: ResourceTypes, public modification: number) {}
}
