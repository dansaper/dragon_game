import * as React from "react";
import { UpgradeCategories } from "../../../common/Upgrades";

interface HunterUpgradeCategorySelectorProps {
  categories: UpgradeCategories[];
  currentCategory: UpgradeCategories;
  selectCategory: (category: UpgradeCategories) => void;
}

const categoryNames: Map<UpgradeCategories, string> = new Map([
  [UpgradeCategories.PLAIN_HUNTER_UPGRADES, "Plains Hunter"],
  [UpgradeCategories.GENERAL_HUNTER_UPGRADES, "General"]
]);

export class HunterUpgradeCategorySelector extends React.Component<
  HunterUpgradeCategorySelectorProps,
  {}
> {
  constructor(props: HunterUpgradeCategorySelectorProps) {
    super(props);

    this.selectPrevCategory = this.selectPrevCategory.bind(this);
    this.selectNextCategory = this.selectNextCategory.bind(this);
  }

  public render() {
    return (
      <div className="hunter-upgrade-category-selector">
        <div className="prev-hunter-upgrade-category" onClick={this.selectPrevCategory}>
          &lt;
        </div>
        <div className="current-hunter-upgrade-category">
          {categoryNames.get(this.props.currentCategory)}
        </div>
        <div className="next-hunter-upgrade-category" onClick={this.selectNextCategory}>
          &gt;
        </div>
      </div>
    );
  }

  private selectPrevCategory() {
    const curIndex = this.props.categories.indexOf(this.props.currentCategory);
    if (curIndex <= 0) {
      this.props.selectCategory(this.props.categories[this.props.categories.length - 1]);
    } else {
      this.props.selectCategory(this.props.categories[curIndex - 1]);
    }
  }

  private selectNextCategory() {
    const curIndex = this.props.categories.indexOf(this.props.currentCategory);
    if (curIndex === -1 || curIndex === this.props.categories.length - 1) {
      this.props.selectCategory(this.props.categories[0]);
    } else {
      this.props.selectCategory(this.props.categories[curIndex + 1]);
    }
  }
}
