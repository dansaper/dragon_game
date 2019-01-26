import { DetailedInfoKeys } from "../../common/DetailedInfo";
import { GameProgressionFlags, GameState } from "../../common/GameState";
import { ResourceTypes } from "../../common/Resources";
import { MakePurchaseButtonDef } from "./GameElementDefinitions";
import * as Utils from "./LibraryUtils";

interface HirePlainsHunterDef {
  calculateLeatherCost: (state: GameState) => number;
}
const HirePlainsHunter = MakePurchaseButtonDef<HirePlainsHunterDef>({
  isVisible(state: GameState) {
    return state.flags.has(GameProgressionFlags.PLAINS_HUNTER_UNLOCKED);
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
  getOutputs() {
    return new Map([[ResourceTypes.PLAINS_HUNTER, 1]]);
  }
});

Utils.bindFunctions(HirePlainsHunter);
export { HirePlainsHunter };
