import { DetailedInfoKeys } from "../../common/DetailedInfo";
import { ResourceModificationEvent } from "../../common/events/ResourceModificationEvent";
import { GameState, ResourceTypes } from "../../common/GameState";

const HuntBabyWyverns = {
  isVisible: () => true,
  isEnabled: () => true,
  title: "Hunt for a baby Wyverns",
  infoKey: DetailedInfoKeys.NO_INFO,
  purchase: () => {
    return [
      new ResourceModificationEvent(ResourceTypes.BABY_WYVERN_BONE, 1),
      new ResourceModificationEvent(ResourceTypes.BABY_WYVERN_HIDE, 1)
    ];
  }
};

const HirePlainsHunter = {
  isVisible: () => true,
  isEnabled(state: GameState) {
    const gold = state.resources.get(ResourceTypes.GOLD);
    const cost = this.calculateCost();
    if (gold === undefined || gold < cost) {
      return false;
    }
    return true;
  },
  title: `Hire a ${ResourceTypes.PLAINS_HUNTER}`,
  infoKey: DetailedInfoKeys.NO_INFO,
  baseCost: 5,
  calculateCost() {
    return this.baseCost * 2;
  },
  purchase() {
    return [
      new ResourceModificationEvent(ResourceTypes.GOLD, -this.calculateCost()),
      new ResourceModificationEvent(ResourceTypes.PLAINS_HUNTER, 1)
    ];
  }
};

export { HuntBabyWyverns, HirePlainsHunter };
