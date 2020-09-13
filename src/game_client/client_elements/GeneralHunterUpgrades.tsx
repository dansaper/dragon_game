import { DetailedInfoKeys } from "../DetailedInfo";
import { GameState } from "../../common/GameState";
import { ResourceTypes } from "../../common/Resources";
import { Upgrades } from "../../common/Upgrades";
import { MakeUpgradeDisplayDef } from "./GameElementDefinitions";

const HunterWeakBoneBlades = MakeUpgradeDisplayDef<{
  calculateBoneCost: (state: GameState) => number;
}>({
  upgrade: Upgrades.HUNTER_WEAK_BONE_BLADES,
  title: "Weak Bone Blades",
  infoKey: DetailedInfoKeys.NO_INFO,
  details: "Allows hunters to use blades made of Baby Wyvern bone",
  calculateBoneCost() {
    const baseCost = 5;
    return baseCost;
  },
  getCost(state: GameState) {
    return new Map([[ResourceTypes.BABY_WYVERN_BONE, this.calculateBoneCost(state)]]);
  },
  parents: [],
});

const HunterNormalBoneBlades = MakeUpgradeDisplayDef<{
  calculateBoneCost: (state: GameState) => number;
}>({
  upgrade: Upgrades.HUNTER_NORMAL_BONE_BLADES,
  title: "Normal Bone Blades",
  infoKey: DetailedInfoKeys.NO_INFO,
  details: "Allows hunters to use blades made of Wyvern bone",
  calculateBoneCost() {
    const baseCost = 5;
    return baseCost;
  },
  getCost(state: GameState) {
    return new Map([[ResourceTypes.WYVERN_BONE, this.calculateBoneCost(state)]]);
  },
  parents: [Upgrades.HUNTER_WEAK_BONE_BLADES],
});

const HunterStrongBoneBlades = MakeUpgradeDisplayDef<{
  calculateBoneCost: (state: GameState) => number;
}>({
  upgrade: Upgrades.HUNTER_STRONG_BONE_BLADES,
  title: "Strong Bone Blades",
  infoKey: DetailedInfoKeys.NO_INFO,
  details: "Allows hunters to use blades made of Dragon bone",
  calculateBoneCost() {
    const baseCost = 5;
    return baseCost;
  },
  getCost(state: GameState) {
    return new Map([[ResourceTypes.DRAGON_BONE, this.calculateBoneCost(state)]]);
  },
  parents: [Upgrades.HUNTER_NORMAL_BONE_BLADES],
});

const HunterWeakBoneBow = MakeUpgradeDisplayDef<{
  calculateBoneCost: (state: GameState) => number;
}>({
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
  parents: [],
});

const HunterNormalBoneBow = MakeUpgradeDisplayDef<{
  calculateBoneCost: (state: GameState) => number;
}>({
  upgrade: Upgrades.HUNTER_NORMAL_BONE_BOWS,
  title: "Normal Bone Bows",
  infoKey: DetailedInfoKeys.NO_INFO,
  details: "Allows hunters to use bows made of Wyvern bone",
  calculateBoneCost() {
    const baseCost = 5;
    return baseCost;
  },
  getCost(state: GameState) {
    return new Map([[ResourceTypes.WYVERN_BONE, this.calculateBoneCost(state)]]);
  },
  parents: [Upgrades.HUNTER_WEAK_BONE_BOWS],
});

const HunterStrongBoneBow = MakeUpgradeDisplayDef<{
  calculateBoneCost: (state: GameState) => number;
}>({
  upgrade: Upgrades.HUNTER_STRONG_BONE_BOWS,
  title: "Strong Bone Bows",
  infoKey: DetailedInfoKeys.NO_INFO,
  details: "Allows hunters to use bows made of Dragon bone",
  calculateBoneCost() {
    const baseCost = 5;
    return baseCost;
  },
  getCost(state: GameState) {
    return new Map([[ResourceTypes.DRAGON_BONE, this.calculateBoneCost(state)]]);
  },
  parents: [Upgrades.HUNTER_NORMAL_BONE_BOWS],
});

const HunterBabyWyvernGrips = MakeUpgradeDisplayDef<{
  calculateLeatherCost: (state: GameState) => number;
}>({
  upgrade: Upgrades.HUNTER_BABY_WYVERN_GRIPS,
  title: "Baby Wyvern Weapon Grips",
  infoKey: DetailedInfoKeys.NO_INFO,
  details: "Allows hunters to fasion basic grips made of Baby Wyvern leather",
  calculateLeatherCost() {
    const baseCost = 5;
    return baseCost;
  },
  getCost(state: GameState) {
    return new Map([[ResourceTypes.BABY_WYVERN_LEATHER, this.calculateLeatherCost(state)]]);
  },
  parents: [],
});

const HunterWyvernGrips = MakeUpgradeDisplayDef<{
  calculateLeatherCost: (state: GameState) => number;
}>({
  upgrade: Upgrades.HUNTER_WYVERN_GRIPS,
  title: "Wyvern Weapon Grips",
  infoKey: DetailedInfoKeys.NO_INFO,
  details: "Allows hunters to fasion grips made of Wyvern leather",
  calculateLeatherCost() {
    const baseCost = 5;
    return baseCost;
  },
  getCost(state: GameState) {
    return new Map([[ResourceTypes.WYVERN_LEATHER, this.calculateLeatherCost(state)]]);
  },
  parents: [Upgrades.HUNTER_BABY_WYVERN_GRIPS],
});

const HunterDragonGrips = MakeUpgradeDisplayDef<{
  calculateLeatherCost: (state: GameState) => number;
}>({
  upgrade: Upgrades.HUNTER_DRAGON_GRIPS,
  title: "Dragon Weapon Grips",
  infoKey: DetailedInfoKeys.NO_INFO,
  details: "Allows hunters to fasion grips made of Dragon leather",
  calculateLeatherCost() {
    const baseCost = 5;
    return baseCost;
  },
  getCost(state: GameState) {
    return new Map([[ResourceTypes.WYVERN_LEATHER, this.calculateLeatherCost(state)]]);
  },
  parents: [Upgrades.HUNTER_WYVERN_GRIPS],
});

const HunterWeakArmor = MakeUpgradeDisplayDef<{
  calculateBoneCost: (state: GameState) => number;
  calculateHideCost: (state: GameState) => number;
  calculateLeatherCost: (state: GameState) => number;
}>({
  upgrade: Upgrades.HUNTER_WEAK_ARMOR,
  title: "Weak Bone Armor",
  infoKey: DetailedInfoKeys.NO_INFO,
  details: "Protect hunters with armor made of the bone and hide of Baby Wyverns",
  calculateBoneCost() {
    const baseCost = 5;
    return baseCost;
  },
  calculateHideCost() {
    const baseCost = 5;
    return baseCost;
  },
  calculateLeatherCost() {
    const baseCost = 5;
    return baseCost;
  },
  getCost(state: GameState) {
    return new Map([
      [ResourceTypes.BABY_WYVERN_BONE, this.calculateBoneCost(state)],
      [ResourceTypes.BABY_WYVERN_HIDE, this.calculateHideCost(state)],
      [ResourceTypes.BABY_WYVERN_LEATHER, this.calculateLeatherCost(state)],
    ]);
  },
  parents: [],
});

const HunterNormalArmor = MakeUpgradeDisplayDef<{
  calculateBoneCost: (state: GameState) => number;
  calculateHideCost: (state: GameState) => number;
  calculateLeatherCost: (state: GameState) => number;
}>({
  upgrade: Upgrades.HUNTER_NORMAL_ARMOR,
  title: "Normal Bone Armor",
  infoKey: DetailedInfoKeys.NO_INFO,
  details: "Protect hunters with armor made of the bone and hide of Wyverns",
  calculateBoneCost() {
    const baseCost = 5;
    return baseCost;
  },
  calculateHideCost() {
    const baseCost = 5;
    return baseCost;
  },
  calculateLeatherCost() {
    const baseCost = 5;
    return baseCost;
  },
  getCost(state: GameState) {
    return new Map([
      [ResourceTypes.WYVERN_BONE, this.calculateBoneCost(state)],
      [ResourceTypes.WYVERN_HIDE, this.calculateHideCost(state)],
      [ResourceTypes.WYVERN_LEATHER, this.calculateLeatherCost(state)],
    ]);
  },
  parents: [Upgrades.HUNTER_WEAK_ARMOR],
});

const HunterStrongArmor = MakeUpgradeDisplayDef<{
  calculateBoneCost: (state: GameState) => number;
  calculateHideCost: (state: GameState) => number;
  calculateLeatherCost: (state: GameState) => number;
}>({
  upgrade: Upgrades.HUNTER_STRONG_ARMOR,
  title: "Strong Bone Armor",
  infoKey: DetailedInfoKeys.NO_INFO,
  details: "Protect hunters with armor made of the bone and hide of dragons",
  calculateBoneCost() {
    const baseCost = 5;
    return baseCost;
  },
  calculateHideCost() {
    const baseCost = 5;
    return baseCost;
  },
  calculateLeatherCost() {
    const baseCost = 5;
    return baseCost;
  },
  getCost(state: GameState) {
    return new Map([
      [ResourceTypes.DRAGON_BONE, this.calculateBoneCost(state)],
      [ResourceTypes.DRAGON_HIDE, this.calculateHideCost(state)],
      [ResourceTypes.DRAGON_LEATHER, this.calculateLeatherCost(state)],
    ]);
  },
  parents: [Upgrades.HUNTER_NORMAL_ARMOR],
});

const HunterArmorSpikes = MakeUpgradeDisplayDef<{
  calculateBoneCost: (state: GameState) => number;
}>({
  upgrade: Upgrades.HUNTER_ARMOR_SPIKES,
  title: "Armor Spikes",
  infoKey: DetailedInfoKeys.NO_INFO,
  details: "Allows hunters to add defensive spikes to their armor",
  calculateBoneCost() {
    const baseCost = 5;
    return baseCost;
  },
  getCost(state: GameState) {
    return new Map([[ResourceTypes.WYVERN_BONE, this.calculateBoneCost(state)]]);
  },
  parents: [Upgrades.HUNTER_NORMAL_ARMOR],
});

const upgrades = [
  HunterWeakBoneBlades,
  HunterNormalBoneBlades,
  HunterStrongBoneBlades,
  HunterWeakBoneBow,
  HunterNormalBoneBow,
  HunterStrongBoneBow,
  HunterBabyWyvernGrips,
  HunterWyvernGrips,
  HunterDragonGrips,
  HunterWeakArmor,
  HunterNormalArmor,
  HunterStrongArmor,
  HunterArmorSpikes,
];
export { upgrades };
