import { ResourceModificationEvent } from "../../common/events/ResourceModificationEvent";
import { GameState } from "../../common/GameState";
import { ResourceTypes } from "../../common/Resources";

export function bindFunctions<T extends { [index: string]: any }>(obj: T) {
  for (const k of Object.keys(obj)) {
    if (typeof obj[k] === "function") {
      obj[k] = obj[k].bind(obj);
    }
  }
}

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
  const events = [];
  for (const [resourceType, cost] of costs) {
    events.push(new ResourceModificationEvent(resourceType, -cost));
  }
  return events;
}
