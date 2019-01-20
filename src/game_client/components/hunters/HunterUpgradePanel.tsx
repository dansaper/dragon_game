import * as React from "react";
import { GameEvent } from "../../../common/events/GameEvents";
import { GameState } from "../../../common/GameState";
import { UpgradeCategories, Upgrades, UpgradesMap } from "../../../common/Upgrades";
import { HunterUpgradeCategorySelector } from "./HunterUpgradeCategorySelector";
import { HunterUpgradeInfoPanel } from "./HunterUpgradeInfoPanel";
import { HunterUpgradeTreeView } from "./HunterUpgradeTreeView";

interface HunterUpgradePanelProps {
  gameState: GameState;
  sendGameEvents: (e: GameEvent[]) => void;
}

// TODO: Calculate if these are visible
const AVAILABLE_CATEGORIES = [
  UpgradeCategories.GENERAL_HUNTER_UPGRADES,
  UpgradeCategories.PLAIN_HUNTER_UPGRADES
];

interface HunterUpgradePanelState {
  selectedCategory: UpgradeCategories;
  selectedUpgrade?: Upgrades;
}

export class HunterUpgradePanel extends React.Component<
  HunterUpgradePanelProps,
  HunterUpgradePanelState
> {
  constructor(props: HunterUpgradePanelProps) {
    super(props);
    this.state = {
      selectedCategory: AVAILABLE_CATEGORIES[0]
    };

    this.selectUpgrade = this.selectUpgrade.bind(this);
    this.selectCategory = this.selectCategory.bind(this);
  }

  public render() {
    return (
      <div className="hunter-upgrade-panel">
        <div className="hunter-upgrade-tree-wrapper">
          <HunterUpgradeCategorySelector
            categories={AVAILABLE_CATEGORIES}
            currentCategory={this.state.selectedCategory}
            selectCategory={this.selectCategory}
          />
          <HunterUpgradeTreeView
            gameState={this.props.gameState}
            sendGameEvents={this.props.sendGameEvents}
            onClick={this.selectUpgrade}
            upgrades={UpgradesMap.get(this.state.selectedCategory) || []}
          />
        </div>
        <HunterUpgradeInfoPanel
          gameState={this.props.gameState}
          sendGameEvents={this.props.sendGameEvents}
          selectedUpgrade={this.state.selectedUpgrade}
        />
      </div>
    );
  }

  private selectUpgrade(upgrade: Upgrades) {
    this.setState({
      selectedUpgrade: upgrade
    });
  }

  private selectCategory(category: UpgradeCategories) {
    this.setState({
      selectedCategory: category,
      selectedUpgrade: undefined
    });
  }
}
