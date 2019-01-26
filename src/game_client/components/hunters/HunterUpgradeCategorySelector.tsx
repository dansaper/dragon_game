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
    const arrowSvg = (rotate: number) => (
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" transform={`rotate(${rotate})`}>
        <path d="M 0 0 L 50 50 L 0 100" stroke="black" fill="none" strokeWidth="10" />
      </svg>
    );
    return (
      <div className="hunter-upgrade-category-selector">
        <div
          className="hunter-category-selector-arrow prev-hunter-upgrade-category"
          onClick={this.selectPrevCategory}
        >
          {arrowSvg(180)}
        </div>
        <div className="current-hunter-upgrade-category">
          {categoryNames.get(this.props.currentCategory)}
        </div>
        <div
          className="hunter-category-selector-arrow next-hunter-upgrade-category"
          onClick={this.selectNextCategory}
        >
          {arrowSvg(0)}
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
