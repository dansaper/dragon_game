import * as React from "react";
import { GameEvent } from "../../../common/events/GameEvents";
import { GameState } from "../../../common/GameState";
import { UpgradeCategories } from "../../../common/Upgrades";
import { HunterRow } from "./HunterRow";
import { HunterUpgradePanel } from "./HunterUpgradePanel";

interface HuntersTabProps {
  gameState: GameState;
  sendGameEvents: (e: GameEvent[]) => void;
}

interface HuntersTabState {
  selectedCategory: UpgradeCategories;
}

const hunterUpgradeCategories: UpgradeCategories[] = [
  UpgradeCategories.GENERAL_HUNTER_UPGRADES,
  UpgradeCategories.PLAIN_HUNTER_UPGRADES
];

export class HuntersTab extends React.Component<HuntersTabProps, HuntersTabState> {
  private readonly cachedCategorySelectors: Map<UpgradeCategories, () => void>;

  constructor(props: HuntersTabProps) {
    super(props);

    this.state = {
      selectedCategory: UpgradeCategories.GENERAL_HUNTER_UPGRADES
    };

    const categorySelector = (category: UpgradeCategories) => {
      return () => {
        this.setState({
          selectedCategory: category
        });
      };
    };

    this.cachedCategorySelectors = new Map();
    hunterUpgradeCategories.forEach(c => {
      this.cachedCategorySelectors.set(c, categorySelector(c));
    });

    this.selectCategory = this.selectCategory.bind(this);
  }

  public render() {
    return (
      <div className="hunters-tab">
        <div className="hunter-rows">
          {hunterUpgradeCategories.map(c => {
            return (
              <HunterRow
                key={c}
                upgradeCategory={c}
                gameState={this.props.gameState}
                sendGameEvents={this.props.sendGameEvents}
                selectCategory={this.cachedCategorySelectors.get(c)!}
              />
            );
          })}
        </div>
        <HunterUpgradePanel
          gameState={this.props.gameState}
          sendGameEvents={this.props.sendGameEvents}
          category={UpgradeCategories.PLAIN_HUNTER_UPGRADES}
        />
      </div>
    );
  }

  private selectCategory(category: UpgradeCategories) {
    this.setState({
      selectedCategory: category
    });
  }
}
