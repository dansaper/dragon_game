import * as React from "react";
import { GameState } from "../../../common/GameState";
import { Upgrade, UpgradeCategories, UpgradeCategory } from "../../../common/Upgrades";
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
  const [selectedCategory, setSelectedCategory] = React.useState<UpgradeCategory>(
    AVAILABLE_CATEGORIES[0]
  );
  const [selectedUpgrade, setSelectedUpgrade] = React.useState<Upgrade | undefined>();

  const selectCategory = (category: UpgradeCategory) => {
    setSelectedCategory(category);
    setSelectedUpgrade(undefined);
  };

  const selectUpgrade = (upgrade: Upgrade) => {
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
          category={selectedCategory}
        />
      </div>
      <HunterUpgradeInfoPanel gameState={props.gameState} selectedUpgrade={selectedUpgrade} />
    </div>
  );
};
