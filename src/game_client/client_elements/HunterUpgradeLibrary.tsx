import { Upgrades } from "../../common/Upgrades";
import { UpgradeDisplayDefinition } from "./GameElementDefinitions";
import * as HunterUpgrades from "./HunterUpgrades";

export const HunterUpgradeDefinitions: Map<Upgrades, UpgradeDisplayDefinition> = new Map();

HunterUpgradeDefinitions.set(
  Upgrades.PLAINS_HUNTER_WEAK_BONE_BOWS,
  HunterUpgrades.PlainsHunterWeakBoneBow
);
HunterUpgradeDefinitions.set(
  Upgrades.PLAINS_HUNTER_WEAK_LEATHER_BOOTS,
  HunterUpgrades.PlainsHunterWeakLeatherBoots
);
