import { DetailedInfoKeys } from "../../common/DetailedInfo";
import { GameState } from "../../common/GameState";
import { ResourceTypes } from "../../common/Resources";
import { Upgrades } from "../../common/Upgrades";
import { MakeUpgradeDisplayDef } from "./GameElementDefinitions";
import * as Utils from "./LibraryUtils";

interface HunterWeakBoneBowProps {
  calculateBoneCost: (state: GameState) => number;
}

const HunterWeakBoneBow = MakeUpgradeDisplayDef<HunterWeakBoneBowProps>({
  upgrade: Upgrades.HUNTER_WEAK_BONE_BOWS,
  title: "Weak Bone Bows",
  infoKey: DetailedInfoKeys.NO_INFO,
  details: "Allows hunters to use bows made of Baby Wyvern bone",
  calculateBoneCost() {
    const baseCost = 5;
    return baseCost;
  },
  getCost(state: GameState) {
    return new Map([[ResourceTypes.BABY_WYVERN_BONE, this.calculateBoneCost(state)]]);
  },
  parents: []
});

interface HunterNormalBoneBowProps {
  calculateBoneCost: (state: GameState) => number;
}
const HunterNormalBoneBow = MakeUpgradeDisplayDef<HunterNormalBoneBowProps>({
  upgrade: Upgrades.HUNTER_NORMAL_BONE_BOWS,
  title: "Normal Bone Bows",
  infoKey: DetailedInfoKeys.NO_INFO,
  details: "Allows hunters to use bows made of Wyvern bone",
  calculateBoneCost() {
    const baseCost = 5;
    return baseCost;
  },
  getCost(state: GameState) {
    return new Map([[ResourceTypes.BABY_WYVERN_BONE, this.calculateBoneCost(state)]]);
  },
  parents: [Upgrades.HUNTER_WEAK_BONE_BOWS]
});

const upgrades = [Utils.bindFunctions(HunterWeakBoneBow), Utils.bindFunctions(HunterNormalBoneBow)];
export { upgrades };
