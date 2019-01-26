import { PurchaseUpgradeEvent } from "../../common/events/PurchaseUpgradeEvent";
import { ResourceModificationEvent } from "../../common/events/ResourceModificationEvent";
import { GameState } from "../../common/GameState";
import { ResourceTypes } from "../../common/Resources";
import { Upgrades } from "../../common/Upgrades";

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

export function outputsToResourceEvents(
  outputs: Map<ResourceTypes, number>
): ResourceModificationEvent[] {
  const events = [];
  for (const [resourceType, cost] of outputs) {
    events.push(new ResourceModificationEvent(resourceType, cost));
  }
  return events;
}

export function outputsToUpgradeEvents(outputs: Upgrades[]): PurchaseUpgradeEvent[] {
  return outputs.map(u => new PurchaseUpgradeEvent(u));
}
