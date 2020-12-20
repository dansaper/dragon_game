import * as BaseCampButtons from "./purchase_definitions/BaseCampButtons";
import { Purchase } from "../../common/Purchases";
import { ClientPurchaseButtonDefinition } from "./ClientPurchaseButtonDefinition";

const ClientPurchaseDefinitionsMap = new Map<Purchase, ClientPurchaseButtonDefinition>();
const addPurchaseDef = (purchaseDef: ClientPurchaseButtonDefinition) => {
  ClientPurchaseDefinitionsMap.set(purchaseDef.purchase, purchaseDef);
};

addPurchaseDef(BaseCampButtons.HuntBabyWyverns);
addPurchaseDef(BaseCampButtons.CraftBabyWyvernLeather);
addPurchaseDef(BaseCampButtons.HirePlainsHunter);

export { ClientPurchaseDefinitionsMap };
