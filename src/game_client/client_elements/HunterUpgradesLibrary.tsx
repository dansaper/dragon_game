import { Upgrades } from "../../common/Upgrades";
import { UpgradeDisplayDefinition } from "./GameElementDefinitions";
import * as HunterUpgrades from "./HunterUpgrades";

export enum HunterUpgradeTypes {
  ALL_HUNTER_UPGRADES,
  PLAINS_HUNTER_UPGRADES
}

export const HunterUpgradeDefinitions: Map<
  HunterUpgradeTypes,
  Map<Upgrades, UpgradeDisplayDefinition>
> = new Map();

const plainsHunterUpgrades: Map<Upgrades, UpgradeDisplayDefinition> = new Map();
plainsHunterUpgrades.set(
  Upgrades.PLAINS_HUNTER_BOWS_WEAK_BONE,
  HunterUpgrades.PlainsHunterWeakBoneBow
);

HunterUpgradeDefinitions.set(HunterUpgradeTypes.PLAINS_HUNTER_UPGRADES, plainsHunterUpgrades);
