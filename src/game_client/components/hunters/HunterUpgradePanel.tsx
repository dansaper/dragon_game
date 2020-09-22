import * as React from "react";
import { GameState } from "../../../common/GameState";
import { UpgradeCategories, Upgrades, UpgradesMap } from "../../../common/Upgrades";
import { HunterUpgradeCategorySelector } from "./HunterUpgradeCategorySelector";
import { HunterUpgradeInfoPanel } from "./HunterUpgradeInfoPanel";
import { HunterUpgradeTreeView } from "./HunterUpgradeTreeView";

interface HunterUpgradePanelProps {
  gameState: GameState;
}

// TODO: Calculate if these are visible
const AVAILABLE_CATEGORIES = [
  UpgradeCategories.GENERAL_HUNTER_UPGRADES,
  UpgradeCategories.PLAIN_HUNTER_UPGRADES,
];

export const HunterUpgradePanel: React.FunctionComponent<HunterUpgradePanelProps> = (props) => {
  const [selectedCategory, setSelectedCategory] = React.useState<UpgradeCategories>(
    AVAILABLE_CATEGORIES[0]
  );
  const [selectedUpgrade, setSelectedUpgrade] = React.useState<Upgrades | undefined>();

  const selectCategory = (category: UpgradeCategories) => {
    setSelectedCategory(category);
    setSelectedUpgrade(undefined);
  };

  const selectUpgrade = (upgrade: Upgrades) => {
    setSelectedUpgrade(upgrade);
  };

  return (
    <div className="hunter-upgrade-panel">
      <div className="hunter-upgrade-tree-wrapper">
        <HunterUpgradeCategorySelector
          categories={AVAILABLE_CATEGORIES}
          currentCategory={selectedCategory}
          selectCategory={selectCategory}
        />
        <HunterUpgradeTreeView
          gameState={props.gameState}
          onClick={selectUpgrade}
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          upgrades={UpgradesMap.get(selectedCategory)!}
        />
      </div>
      <HunterUpgradeInfoPanel gameState={props.gameState} selectedUpgrade={selectedUpgrade} />
    </div>
  );
};
