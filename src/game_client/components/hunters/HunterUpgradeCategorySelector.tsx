import * as React from "react";
import { UpgradeCategories } from "../../../common/Upgrades";

interface HunterUpgradeCategorySelectorProps {
  categories: UpgradeCategories[];
  currentCategory: UpgradeCategories;
  selectCategory: (category: UpgradeCategories) => void;
}

const categoryNames: Map<UpgradeCategories, string> = new Map([
  [UpgradeCategories.PLAIN_HUNTER_UPGRADES, "Plains Hunter"],
  [UpgradeCategories.GENERAL_HUNTER_UPGRADES, "General"],
]);

export const HunterUpgradeCategorySelector: React.FunctionComponent<HunterUpgradeCategorySelectorProps> = (
  props
) => {
  const selectPrevCategory = () => {
    const curIndex = props.categories.indexOf(props.currentCategory);
    if (curIndex <= 0) {
      props.selectCategory(props.categories[props.categories.length - 1]);
    } else {
      props.selectCategory(props.categories[curIndex - 1]);
    }
  };

  const selectNextCategory = () => {
    const curIndex = props.categories.indexOf(props.currentCategory);
    if (curIndex === -1 || curIndex === props.categories.length - 1) {
      props.selectCategory(props.categories[0]);
    } else {
      props.selectCategory(props.categories[curIndex + 1]);
    }
  };

  const arrowSvg = (rotate: number) => (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" transform={`rotate(${rotate})`}>
      <path d="M 0 0 L 50 50 L 0 100" stroke="black" fill="none" strokeWidth="10" />
    </svg>
  );
  return (
    <div className="hunter-upgrade-category-selector">
      <div
        className="hunter-category-selector-arrow prev-hunter-upgrade-category"
        onClick={selectPrevCategory}
      >
        {arrowSvg(180)}
      </div>
      <div className="current-hunter-upgrade-category">
        {categoryNames.get(props.currentCategory)}
      </div>
      <div
        className="hunter-category-selector-arrow next-hunter-upgrade-category"
        onClick={selectNextCategory}
      >
        {arrowSvg(0)}
      </div>
    </div>
  );
};
