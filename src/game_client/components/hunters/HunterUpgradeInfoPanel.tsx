import * as React from "react";
import { GameEvent } from "../../../common/events/GameEvents";
import { GameState } from "../../../common/GameState";
import { Upgrades } from "../../../common/Upgrades";
import { HunterUpgradeDefinitions } from "../../client_elements/HunterUpgradeLibrary";
import { ButtonWithInfo } from "../common/ButtonWithInfo";
import { ResourceList } from "../ResourceList";

interface HunterUpgradeInfoPanelProps {
  selectedUpgrade?: Upgrades;
  gameState: GameState;
  sendGameEvents: (e: GameEvent[]) => void;
}

interface CachedProperties {
  onClick: () => void;
  isVisible: () => boolean;
  isDisabled: () => boolean;
}

export class HunterUpgradeInfoPanel extends React.Component<HunterUpgradeInfoPanelProps, {}> {
  // We cache functions for a given button def so we don't recreate functions every time we render
  private cachedButtonProperties = new Map<Upgrades, CachedProperties>();

  public render() {
    if (this.props.selectedUpgrade === undefined) {
      return (
        <div className="hunter-upgrade-info-panel">
          <div className="hunter-upgrade-title-wrapper">
            <div className="hunter-upgrade-title">No Upgrade Selected</div>
          </div>
        </div>
      );
    }

    const upgradeDefinition = HunterUpgradeDefinitions.get(this.props.selectedUpgrade)!;

    let cached: CachedProperties;
    if (!this.cachedButtonProperties.has(this.props.selectedUpgrade)) {
      const propsCapturingThis = {
        isVisible: () => true,
        isDisabled: () => !upgradeDefinition.isPurchaseable(this.props.gameState),
        onClick: () => this.props.sendGameEvents(upgradeDefinition.purchase(this.props.gameState))
      };
      cached = propsCapturingThis;
    } else {
      cached = this.cachedButtonProperties.get(this.props.selectedUpgrade)!;
    }

    return (
      <div className="hunter-upgrade-info-panel">
        <div className="hunter-upgrade-title-wrapper">
          <div className="hunter-upgrade-title">{upgradeDefinition.title}</div>
        </div>
        <div className="hunter-upgrade-content-wrapper">
          <div className="hunter-upgrade-content">
            <div className="hunter-upgrade-details">{upgradeDefinition.details}</div>
            <ButtonWithInfo
              {...cached}
              title={"Purchase upgrade: " + upgradeDefinition.title}
              sendGameEvents={this.props.sendGameEvents}
            />
          </div>
          <div className="hunter-upgrade-cost">
            <div className="hunter-upgrade-cost-title">Cost</div>
            <ResourceList resources={upgradeDefinition.getCost(this.props.gameState)} />
          </div>
        </div>
      </div>
    );
  }
}
