import { DetailedInfoKeys } from "../../common/DetailedInfo";
import { GameProgressionFlags, GameState } from "../../common/GameState";
import { ResourceTypes } from "../../common/Resources";
import { MakePurchaseButtonDef, PurchaseButtonDefinition } from "./GameElementDefinitions";
import * as Utils from "./LibraryUtils";

const HuntBabyWyverns: PurchaseButtonDefinition = MakePurchaseButtonDef<{}>({
  title: "Hunt for a baby Wyvern",
  infoKey: DetailedInfoKeys.NO_INFO,
  getOutputs() {
    return new Map([[ResourceTypes.BABY_WYVERN_BONE, 1], [ResourceTypes.BABY_WYVERN_HIDE, 1]]);
  }
});

interface CraftBabyWyvernLeatherDef {
  calculateHideCost: (state: GameState) => number;
}
const CraftBabyWyvernLeather = MakePurchaseButtonDef<CraftBabyWyvernLeatherDef>({
  isVisible(state: GameState) {
    return state.flags.has(GameProgressionFlags.BABY_WYVERN_LEATHER_UNLOCKED);
  },
  title: "Craft baby wyvern leather",
  infoKey: DetailedInfoKeys.NO_INFO,
  calculateHideCost() {
    const baseCost = 5;
    return baseCost;
  },
  getCost(state: GameState) {
    return new Map([[ResourceTypes.BABY_WYVERN_HIDE, this.calculateHideCost(state)]]);
  },
  getOutputs() {
    return new Map([[ResourceTypes.BABY_WYVERN_LEATHER, 1]]);
  }
});

Utils.bindFunctions(HuntBabyWyverns);
Utils.bindFunctions(CraftBabyWyvernLeather);
export { HuntBabyWyverns, CraftBabyWyvernLeather };
