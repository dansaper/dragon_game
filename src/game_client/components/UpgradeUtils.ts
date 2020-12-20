import { checkGameEventPrerequisites } from "../../common/GameEventPrerequisites";
import { GameState } from "../../common/GameState";
import { UpgradeDefinition } from "../../common/upgrade_definitions/upgradeDefinition";

export const canBuyUpgrade = (state: GameState, upgradeDefiniton: UpgradeDefinition) => {
  if (upgradeDefiniton.prerequisites) {
    const validationResult = checkGameEventPrerequisites(state, upgradeDefiniton.prerequisites);

    if (!validationResult.valid) {
      return false;
    }
  }

  const cost = upgradeDefiniton.getCost(state);

  for (const [resourceType, amount] of cost) {
    const currentAmount = state.resources.get(resourceType);
    if (currentAmount === undefined || currentAmount < amount) {
      return false;
    }
  }

  return true;
};
