import { Upgrades } from "../../common/Upgrades";
import { UpgradeDisplayDefinition } from "./GameElementDefinitions";
import { upgrades as GeneralHunterUpgrades } from "./GeneralHunterUpgrades";
import { upgrades as PlainsHunterUpgrades } from "./PlainsHunterUpgrades";

export const HunterUpgradeDefinitions: Map<Upgrades, UpgradeDisplayDefinition> = new Map();

for (const upgradeEntries of [GeneralHunterUpgrades, PlainsHunterUpgrades]) {
  for (const upgradeEntry of upgradeEntries) {
    HunterUpgradeDefinitions.set(upgradeEntry.upgrade, upgradeEntry);
  }
}
