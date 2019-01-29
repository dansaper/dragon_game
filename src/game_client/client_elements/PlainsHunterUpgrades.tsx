import { DetailedInfoKeys } from "../../common/DetailedInfo";
import { GameState } from "../../common/GameState";
import { ResourceTypes } from "../../common/Resources";
import { Upgrades } from "../../common/Upgrades";
import { MakeUpgradeDisplayDef } from "./GameElementDefinitions";
import * as Utils from "./LibraryUtils";

const PlainsHunterWeakLeatherBoots = MakeUpgradeDisplayDef<{
  calculateLeatherCost: (state: GameState) => number;
  calculateBoneCost: (state: GameState) => number;
}>({
  upgrade: Upgrades.PLAINS_HUNTER_WEAK_LEATHER_BOOTS,
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
  parents: []
});

const upgrades = [PlainsHunterWeakLeatherBoots].map(u => Utils.bindFunctions(u));
export { upgrades };
