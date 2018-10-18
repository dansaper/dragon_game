import { GameState, ResourceTypes } from "../GameState";
import { GameEvent, GameEventTypes, GameStateModificationHandler } from "./GameEvents";

export class ResourceModificationEvent implements GameEvent {
  public readonly eventType = GameEventTypes.MODIFY_RESOURCE;
  constructor(public resourceType: ResourceTypes, public modification: number) {}
}

export const ResourceModificationEventHandlers: GameStateModificationHandler = {
  gameState: (state: GameState, e: ResourceModificationEvent) => {
    const oldValue = state.resources.get(e.resourceType);
    state.resources.set(
      e.resourceType,
      oldValue !== undefined ? oldValue + e.modification : e.modification
    );

    return state;
  }
};

export function IsResourceModificationEvent(e: GameEvent): e is ResourceModificationEvent {
  return e.eventType === GameEventTypes.MODIFY_RESOURCE;
}
