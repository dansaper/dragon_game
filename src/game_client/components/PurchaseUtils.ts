import { checkGameEventPrerequisites } from "../../common/GameEventPrerequisites";
import { GameState } from "../../common/GameState";
import { PurchaseDefinition } from "../../common/purchase_definitions/purchaseDefinition";

export const canBuyPurchase = (state: GameState, purchaseDefiniton: PurchaseDefinition) => {
  if (purchaseDefiniton.prerequisites) {
    const validationResult = checkGameEventPrerequisites(state, purchaseDefiniton.prerequisites);

    if (!validationResult.valid) {
      return false;
    }
  }

  const cost = purchaseDefiniton.getCost(state);

  for (const [resourceType, amount] of cost) {
    const currentAmount = state.resources.get(resourceType);
    if (currentAmount === undefined || currentAmount < amount) {
      return false;
    }
  }

  return true;
};
