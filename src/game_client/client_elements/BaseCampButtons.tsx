import { DetailedInfoKeys } from "../../common/DetailedInfo";
import { ResourceModificationEvent } from "../../common/events/ResourceModificationEvent";
import { GameProgressionFlags, GameState } from "../../common/GameState";
import { ResourceTypes } from "../../common/Resources";
import { PurchaseButtonDefinition } from "./GameElementDefinitions";
import * as Utils from "./LibraryUtils";

const HuntBabyWyverns: PurchaseButtonDefinition = {
  isVisible: () => true,
  isPurchaseable: () => true,
  title: "Hunt for a baby Wyvern",
  infoKey: DetailedInfoKeys.NO_INFO,
  getCost: () => new Map(),
  purchase: () => {
    return [
      new ResourceModificationEvent(ResourceTypes.BABY_WYVERN_BONE, 1),
      new ResourceModificationEvent(ResourceTypes.BABY_WYVERN_HIDE, 1)
    ];
  }
};

interface CraftBabyWyvernLeatherDef extends PurchaseButtonDefinition {
  calculateHideCost: (state: GameState) => number;
}
const CraftBabyWyvernLeather: CraftBabyWyvernLeatherDef = {
  isVisible(state: GameState) {
    return state.flags.has(GameProgressionFlags.BABY_WYVERN_LEATHER_UNLOCKED);
  },
  isPurchaseable(state: GameState) {
    return Utils.costCheck(state, this.getCost(state));
  },
  title: `Craft baby wyvern leather`,
  infoKey: DetailedInfoKeys.NO_INFO,
  calculateHideCost() {
    const baseCost = 5;
    return baseCost;
  },
  getCost(state: GameState) {
    return new Map([[ResourceTypes.BABY_WYVERN_HIDE, this.calculateHideCost(state)]]);
  },
  purchase(state: GameState) {
    return [
      ...Utils.costsToEvents(this.getCost(state)),
      new ResourceModificationEvent(ResourceTypes.BABY_WYVERN_LEATHER, 1)
    ];
  }
};

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

Utils.bindFunctions(HuntBabyWyverns);
Utils.bindFunctions(CraftBabyWyvernLeather);
Utils.bindFunctions(HirePlainsHunter);
export { HuntBabyWyverns, CraftBabyWyvernLeather, HirePlainsHunter };
