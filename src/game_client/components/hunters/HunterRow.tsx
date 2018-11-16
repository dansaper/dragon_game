import * as React from "react";
import { GameEvent } from "../../../common/events/GameEvents";
import { GameState } from "../../../common/GameState";
import { UpgradeCategories } from "../../../common/Upgrades";
import { PurchaseButtonGameElements } from "../../client_elements/PurchaseButtonDefinitionLibrary";
import { PurchaseButton } from "../common/PurchaseButton";

interface HuntersRowProps {
  upgradeCategory: UpgradeCategories;
  gameState: GameState;
  sendGameEvents: (e: GameEvent[]) => void;
  selectCategory: () => void;
}

interface CategoryProperties {
  purchaseKey?: PurchaseButtonGameElements;
  title: string;
}

const categoryPropertiesMap: Map<UpgradeCategories, CategoryProperties> = new Map([
  [
    UpgradeCategories.PLAIN_HUNTER_UPGRADES,
    {
      purchaseKey: PurchaseButtonGameElements.HIRE_PLAINS_HUNTER_BUTTON,
      title: "Plains Hunter Upgrades"
    }
  ],
  [
    UpgradeCategories.GENERAL_HUNTER_UPGRADES,
    {
      title: "General Hunter Upgrades"
    }
  ]
]);

export class HunterRow extends React.Component<HuntersRowProps, {}> {
  constructor(props: HuntersRowProps) {
    super(props);
  }

  public render() {
    const properties = categoryPropertiesMap.get(this.props.upgradeCategory)!;

    let purchaseButton: JSX.Element | undefined;
    if (properties.purchaseKey !== undefined) {
      purchaseButton = (
        <PurchaseButton
          button={properties.purchaseKey}
          gameState={this.props.gameState}
          sendGameEvents={this.props.sendGameEvents}
        />
      );
    }

    return (
      <div className="hunter-row">
        <div className="hunter-row-content">
          <div className="hunter-row-purchase-button">{purchaseButton}</div>
          <div className="hunter-row-title">{properties.title}</div>
        </div>
        <div className="hunter-row-selector" onClick={this.props.selectCategory} />
      </div>
    );
  }
}
