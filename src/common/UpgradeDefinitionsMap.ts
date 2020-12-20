import * as GeneralHunterUpgrades from "./upgrade_definitions/general_hunter_upgrades";
import * as PlainsHunterUpgrades from "./upgrade_definitions/plains_hunter_upgrades";
import { Upgrade } from "./Upgrades";
import { UpgradeDefinition } from "./upgrade_definitions/UpgradeDefinition";

const UpgradeDefinitionsMap = new Map<Upgrade, UpgradeDefinition>();
const addUpgradeDef = (upgradeDef: UpgradeDefinition) => {
  UpgradeDefinitionsMap.set(upgradeDef.upgrade, upgradeDef);
};

addUpgradeDef(GeneralHunterUpgrades.HunterArmorSpikes);
addUpgradeDef(GeneralHunterUpgrades.HunterBabyWyvernGrips);
addUpgradeDef(GeneralHunterUpgrades.HunterDragonGrips);
addUpgradeDef(GeneralHunterUpgrades.HunterNormalArmor);
addUpgradeDef(GeneralHunterUpgrades.HunterNormalBoneBlades);
addUpgradeDef(GeneralHunterUpgrades.HunterNormalBoneBows);
addUpgradeDef(GeneralHunterUpgrades.HunterStrongArmor);
addUpgradeDef(GeneralHunterUpgrades.HunterStrongBoneBlades);
addUpgradeDef(GeneralHunterUpgrades.HunterStrongBoneBows);
addUpgradeDef(GeneralHunterUpgrades.HunterWeakArmor);
addUpgradeDef(GeneralHunterUpgrades.HunterWeakBoneBlades);
addUpgradeDef(GeneralHunterUpgrades.HunterWeakBoneBows);
addUpgradeDef(GeneralHunterUpgrades.HunterWyvernGrips);

addUpgradeDef(PlainsHunterUpgrades.PlainsHunterWeakLeatherBoots);

export { UpgradeDefinitionsMap };
