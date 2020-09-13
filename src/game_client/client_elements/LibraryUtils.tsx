import { GameEventTypes, ResourceModificationEvent } from "../../common/GameEvents";
import { GameState } from "../../common/GameState";
import { ResourceTypes } from "../../common/Resources";

export function costCheck(state: GameState, costs: Map<ResourceTypes, number>): boolean {
  for (const [resourceType, cost] of costs) {
    const currentAmount = state.resources.get(resourceType);
    if (currentAmount === undefined || currentAmount < cost) {
      return false;
    }
  }
  return true;
}

export function costsToEvents(costs: Map<ResourceTypes, number>): ResourceModificationEvent[] {
  const events: ResourceModificationEvent[] = [];
  for (const [resourceType, cost] of costs) {
    events.push({
      eventType: GameEventTypes.MODIFY_RESOURCE,
      resourceType: resourceType,
      modification: cost * -1,
    });
  }
  return events;
}

export function outputsToResourceEvents(
  outputs: Map<ResourceTypes, number>
): ResourceModificationEvent[] {
  const events: ResourceModificationEvent[] = [];
  for (const [resourceType, cost] of outputs) {
    events.push({
      eventType: GameEventTypes.MODIFY_RESOURCE,
      resourceType: resourceType,
      modification: cost,
    });
  }
  return events;
}
