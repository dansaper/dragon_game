import { checkGameEventPrerequisites } from "../../common/GameEventPrerequisites";
import { GameEvent, PurchaseEvent, PurchaseUpgradeEvent } from "../../common/GameEvents";
import { GameState } from "../../common/GameState";
import { PurchaseDefinitionsMap } from "../../common/PurchaseDefinitionsMap";
import { ResourceTypes } from "../../common/Resources";
import { UpgradeDefinitionsMap } from "../../common/UpgradeDefinitionsMap";
import { Logger } from "../Logger";
import { modifyResources, setUpgrade } from "./GameStateModifiers";

type EventHandler<T extends GameEvent> = (state: GameState, event: T) => GameState;

export const handlePurchaseEvent: EventHandler<PurchaseEvent> = (state, event) => {
  const eventDefinition = PurchaseDefinitionsMap.get(event.purchase);

  if (!eventDefinition) {
    throw new Error(`Unknown Purchase Event Definition: ${event.purchase}`);
  }

  if (eventDefinition.prerequisites) {
    const result = checkGameEventPrerequisites(state, eventDefinition.prerequisites);

    if (!result.valid) {
      const errors: string[] = [];
      result.missingUpgrades.forEach((upgrade) => {
        errors.push(`Missing Required Upgrade: ${upgrade} for Purchase Event: ${event.purchase}`);
      });
      result.missingFlags.forEach((flag) => {
        errors.push(`Missing Required Flag: ${flag} for Purchase Event: ${event.purchase}`);
      });

      Logger.logErrors(`Worker Validation failed for Purchase Event: ${event.purchase}`, errors);
      throw new Error(`Worker Validation failed for Purchase Event: ${event.purchase}`);
    }
  }

  const cost = eventDefinition.getCost(state);
  const outputs = eventDefinition.getOutputs(state);

  const modifications = new Map<ResourceTypes, number>();
  cost.forEach((amount, resourceType) => {
    modifications.set(resourceType, -1 * amount);
  });
  outputs.forEach((amount, resourceType) => {
    const previous = modifications.get(resourceType) ?? 0;
    modifications.set(resourceType, amount + previous);
  });

  const result = modifyResources(state, modifications);

  if ([...result.resources].some(([_, number]) => number < 0)) {
    throw new Error(`Cost exceeded for Purchase Event: ${event.purchase}`);
  }

  return result;
};

export const handlePurchaseUpgradeEvent: EventHandler<PurchaseUpgradeEvent> = (state, event) => {
  const eventDefinition = UpgradeDefinitionsMap.get(event.upgrade);

  if (!eventDefinition) {
    throw new Error(`Unknown Upgrade Event Definition: ${event.upgrade}`);
  }

  if (eventDefinition.prerequisites) {
    const result = checkGameEventPrerequisites(state, eventDefinition.prerequisites);

    if (!result.valid) {
      const errors: string[] = [];

      result.missingUpgrades.forEach((upgrade) => {
        errors.push(`Missing Required Upgrade: ${upgrade} for Upgrade Event: ${event.upgrade}`);
      });
      result.missingFlags.forEach((flag) => {
        errors.push(`Missing Required Flag: ${flag} for Upgrade Event: ${event.upgrade}`);
      });

      Logger.logErrors(`Worker Validation failed for Upgrade Event: ${event.upgrade}`, errors);
      throw new Error(`Worker Validation failed for Upgrade Event: ${event.upgrade}`);
    }
  }

  const cost = eventDefinition.getCost(state);
  const modifications = new Map<ResourceTypes, number>();
  cost.forEach((amount, resourceType) => {
    modifications.set(resourceType, -1 * amount);
  });

  let result = modifyResources(state, modifications);

  if ([...result.resources].some(([_, number]) => number < 0)) {
    throw new Error(`Cost exceeded for Purchase Upgrade Event: ${event.upgrade}`);
  }

  result = setUpgrade(result, event.upgrade, true);

  return result;
};
