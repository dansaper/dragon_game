import * as GeneralHunterUpgrades from "./upgrade_definitions/GeneralHunterUpgrades";
import * as PlainsHunterUpgrades from "./upgrade_definitions/PlainsHunterUpgrades";

import { Upgrade } from "../../common/Upgrades";
import { ClientUpgradeButtonDefinition } from "./ClientUpgradeButtonDefinition";

const ClientUpgradeDefinitionsMap = new Map<Upgrade, ClientUpgradeButtonDefinition>();
const addUpgradeDef = (upgradeDef: ClientUpgradeButtonDefinition) => {
  ClientUpgradeDefinitionsMap.set(upgradeDef.upgrade, upgradeDef);
};

addUpgradeDef(GeneralHunterUpgrades.HunterArmorSpikes);
addUpgradeDef(GeneralHunterUpgrades.HunterBabyWyvernGrips);
addUpgradeDef(GeneralHunterUpgrades.HunterDragonGrips);
addUpgradeDef(GeneralHunterUpgrades.HunterNormalArmor);
addUpgradeDef(GeneralHunterUpgrades.HunterNormalBoneBlades);
addUpgradeDef(GeneralHunterUpgrades.HunterNormalBoneBow);
addUpgradeDef(GeneralHunterUpgrades.HunterStrongArmor);
addUpgradeDef(GeneralHunterUpgrades.HunterStrongBoneBlades);
addUpgradeDef(GeneralHunterUpgrades.HunterStrongBoneBow);
addUpgradeDef(GeneralHunterUpgrades.HunterWeakArmor);
addUpgradeDef(GeneralHunterUpgrades.HunterWeakBoneBlades);
addUpgradeDef(GeneralHunterUpgrades.HunterWeakBoneBow);
addUpgradeDef(GeneralHunterUpgrades.HunterWyvernGrips);

addUpgradeDef(PlainsHunterUpgrades.PlainsHunterWeakLeatherBoots);

export { ClientUpgradeDefinitionsMap };
