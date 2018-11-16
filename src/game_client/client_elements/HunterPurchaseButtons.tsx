import { DetailedInfoKeys } from "../../common/DetailedInfo";
import { ResourceModificationEvent } from "../../common/events/ResourceModificationEvent";
import { GameProgressionFlags, GameState } from "../../common/GameState";
import { ResourceTypes } from "../../common/Resources";
import { PurchaseButtonDefinition } from "./GameElementDefinitions";
import * as Utils from "./LibraryUtils";

interface HirePlainsHunterDef extends PurchaseButtonDefinition {
  calculateLeatherCost: (state: GameState) => number;
}
const HirePlainsHunter: HirePlainsHunterDef = {
  isVisible(state: GameState) {
    return state.flags.has(GameProgressionFlags.PLAINS_HUNTER_UNLOCKED);
  },
  isPurchaseable(state: GameState) {
    return Utils.costCheck(state, this.getCost(state));
  },
  title: `Hire a Plains Hunter`,
  infoKey: DetailedInfoKeys.NO_INFO,
  calculateLeatherCost() {
    const baseCost = 2;
    return baseCost;
  },
  getCost(state: GameState) {
    return new Map([[ResourceTypes.BABY_WYVERN_LEATHER, this.calculateLeatherCost(state)]]);
  },
  purchase(state: GameState) {
    return [
      ...Utils.costsToEvents(this.getCost(state)),
      new ResourceModificationEvent(ResourceTypes.PLAINS_HUNTER, 1)
    ];
  }
};

Utils.bindFunctions(HirePlainsHunter);
export { HirePlainsHunter };
