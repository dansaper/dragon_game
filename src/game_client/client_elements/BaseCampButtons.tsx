import { DetailedInfoKeys } from "../../common/DetailedInfo";
import { ResourceModificationEvent } from "../../common/events/ResourceModificationEvent";
import { GameState, ResourceTypes } from "../../common/GameState";
import * as Utils from "./LibraryUtils";

const HuntBabyWyverns = {
  isVisible: () => true,
  isEnabled: () => true,
  title: "Hunt for a baby Wyvern",
  infoKey: DetailedInfoKeys.NO_INFO,
  purchase: () => {
    return [
      new ResourceModificationEvent(ResourceTypes.BABY_WYVERN_BONE, 1),
      new ResourceModificationEvent(ResourceTypes.BABY_WYVERN_HIDE, 1)
    ];
  }
};

const CraftBabyWyvernLeather = {
  isVisible: () => true,
  isEnabled(state: GameState) {
    const hide = state.resources.get(ResourceTypes.BABY_WYVERN_HIDE);
    const cost = this.calculateCost();
    if (hide === undefined || hide < cost) {
      return false;
    }
    return true;
  },
  title: `Craft baby wyvern leather`,
  infoKey: DetailedInfoKeys.NO_INFO,
  baseCost: 5,
  calculateCost() {
    return this.baseCost;
  },
  purchase() {
    return [
      new ResourceModificationEvent(ResourceTypes.BABY_WYVERN_HIDE, -this.calculateCost()),
      new ResourceModificationEvent(ResourceTypes.BABY_WYVERN_LEATHER, 1)
    ];
  }
};

const HirePlainsHunter = {
  isVisible: () => true,
  isEnabled(state: GameState) {
    const leather = state.resources.get(ResourceTypes.BABY_WYVERN_LEATHER);
    const cost = this.calculateCost();
    if (leather === undefined || leather < cost) {
      return false;
    }
    return true;
  },
  title: `Hire a Plains Hunter`,
  infoKey: DetailedInfoKeys.NO_INFO,
  baseCost: 5,
  calculateCost() {
    return this.baseCost * 2;
  },
  purchase() {
    return [
      new ResourceModificationEvent(ResourceTypes.BABY_WYVERN_LEATHER, -this.calculateCost()),
      new ResourceModificationEvent(ResourceTypes.PLAINS_HUNTER, 1)
    ];
  }
};

Utils.bindFunctions(HuntBabyWyverns);
Utils.bindFunctions(CraftBabyWyvernLeather);
Utils.bindFunctions(HirePlainsHunter);
export { HuntBabyWyverns, CraftBabyWyvernLeather, HirePlainsHunter };
