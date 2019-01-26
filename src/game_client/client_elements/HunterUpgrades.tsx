import { DetailedInfoKeys } from "../../common/DetailedInfo";
import { GameState } from "../../common/GameState";
import { ResourceTypes } from "../../common/Resources";
import { Upgrades } from "../../common/Upgrades";
import { MakeUpgradeDisplayDef } from "./GameElementDefinitions";
import * as Utils from "./LibraryUtils";

interface PlainsHunterWeakBoneBowProps {
  calculateBoneCost: (state: GameState) => number;
}
const PlainsHunterWeakBoneBow = MakeUpgradeDisplayDef<PlainsHunterWeakBoneBowProps>({
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
  getOutputs() {
    return [Upgrades.PLAINS_HUNTER_WEAK_BONE_BOWS];
  },
  parents: []
});

interface PlainsHunterWeakLeatherBootsProps {
  calculateLeatherCost: (state: GameState) => number;
  calculateBoneCost: (state: GameState) => number;
}
const PlainsHunterWeakLeatherBoots = MakeUpgradeDisplayDef<PlainsHunterWeakLeatherBootsProps>({
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
  getOutputs() {
    return [Upgrades.PLAINS_HUNTER_WEAK_LEATHER_BOOTS];
  },
  parents: [Upgrades.PLAINS_HUNTER_WEAK_BONE_BOWS]
});

Utils.bindFunctions(PlainsHunterWeakBoneBow);
Utils.bindFunctions(PlainsHunterWeakLeatherBoots);
export { PlainsHunterWeakBoneBow, PlainsHunterWeakLeatherBoots };
