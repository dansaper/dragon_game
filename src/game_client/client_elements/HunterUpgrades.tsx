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
  isViewable: () => true,
  isPurchaseable(state: GameState) {
    return Utils.costCheck(state, this.getCost(state));
  },
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
      new PurchaseUpgradeEvent(Upgrades.PLAINS_HUNTER_WEAK_BONE_BOWS)
    ];
  },
  parents: []
};

interface PlainsHunterWeakLeatherBootsProps extends UpgradeDisplayDefinition {
  calculateLeatherCost: (state: GameState) => number;
  calculateBoneCost: (state: GameState) => number;
}
const PlainsHunterWeakLeatherBoots: PlainsHunterWeakLeatherBootsProps = {
  isVisible: () => true,
  isViewable(state: GameState) {
    return this.parents.every(p => state.upgrades.has(p));
  },
  isPurchaseable(state: GameState) {
    return Utils.costCheck(state, this.getCost(state));
  },
  title: "Baby wyvern boots",
  infoKey: DetailedInfoKeys.NO_INFO,
  details:
    "Lets Plains Hunters stay out hunting longer without getting blisters, so they can hunt more stuff",
  calculateBoneCost() {
    const baseCost = 2;
    return baseCost;
  },
  calculateLeatherCost() {
    const baseCost = 10;
    return baseCost;
  },
  getCost(state: GameState) {
    return new Map([
      [ResourceTypes.BABY_WYVERN_BONE, this.calculateBoneCost(state)],
      [ResourceTypes.BABY_WYVERN_LEATHER, this.calculateLeatherCost(state)]
    ]);
  },
  purchase(state: GameState) {
    return [
      ...Utils.costsToEvents(this.getCost(state)),
      new PurchaseUpgradeEvent(Upgrades.PLAINS_HUNTER_WEAK_LEATHER_BOOTS)
    ];
  },
  parents: [Upgrades.PLAINS_HUNTER_WEAK_BONE_BOWS]
};

Utils.bindFunctions(PlainsHunterWeakBoneBow);
Utils.bindFunctions(PlainsHunterWeakLeatherBoots);
export { PlainsHunterWeakBoneBow, PlainsHunterWeakLeatherBoots };
