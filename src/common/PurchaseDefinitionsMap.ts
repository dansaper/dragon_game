import * as BaseCampPurchases from "./purchase_definitions/base_camp_purchases";
import { PurchaseDefinition } from "./purchase_definitions/purchaseDefinition";
import { Purchase } from "./Purchases";

const PurchaseDefinitionsMap = new Map<Purchase, PurchaseDefinition>();
const addPurchaseDef = (purchaseDef: PurchaseDefinition) => {
  PurchaseDefinitionsMap.set(purchaseDef.purchase, purchaseDef);
};

addPurchaseDef(BaseCampPurchases.HuntBabyWyvern);
addPurchaseDef(BaseCampPurchases.CraftBabyWyvernLeather);
addPurchaseDef(BaseCampPurchases.HirePlainsHunter);

export { PurchaseDefinitionsMap };
