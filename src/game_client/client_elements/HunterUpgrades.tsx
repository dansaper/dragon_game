import { DetailedInfoKeys } from "../../common/DetailedInfo";
import { PurchaseUpgradeEvent } from "../../common/events/PurchaseUpgradeEvent";
import { GameState } from "../../common/GameState";
import { ResourceTypes } from "../../common/Resources";
import { Upgrades } from "../../common/Upgrades";
import { UpgradeDisplayDefinition } from "./GameElementDefinitions";
import * as Utils from "./LibraryUtils";

interface PlainsHunterWeakBoneBowProps extends UpgradeDisplayDefinition {
  calculateBoneCost: (state: GameState) => number;
}
const PlainsHunterWeakBoneBow: PlainsHunterWeakBoneBowProps = {
  isVisible: () => true,
  isEnabled: () => true,
  title: "Bone Bows",
  infoKey: DetailedInfoKeys.NO_INFO,
  details: "Allows Plains Hunters to use bows made of Baby Wyvern bone",
  calculateBoneCost() {
    const baseCost = 5;
    return baseCost;
  },
  getCost(state: GameState) {
    return new Map([[ResourceTypes.BABY_WYVERN_BONE, this.calculateBoneCost(state)]]);
  },
  purchase(state: GameState) {
    return [
      ...Utils.costsToEvents(this.getCost(state)),
      new PurchaseUpgradeEvent(Upgrades.PLAINS_HUNTER_BOWS_WEAK_BONE)
    ];
  },
  parents: [],
  children: []
};

Utils.bindFunctions(PlainsHunterWeakBoneBow);
export { PlainsHunterWeakBoneBow };
