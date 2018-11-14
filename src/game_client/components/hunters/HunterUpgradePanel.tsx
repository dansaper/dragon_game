import * as React from "react";
import { GameEvent } from "../../../common/events/GameEvents";
import { GameState } from "../../../common/GameState";
import { UpgradeCategories, Upgrades, UpgradesMap } from "../../../common/Upgrades";
import { HunterUpgradeInfoPanel } from "./HunterUpgradeInfoPanel";
import { HunterUpgradeTreeView } from "./HunterUpgradeTreeView";

interface HunterUpgradePanelProps {
  gameState: GameState;
  sendGameEvents: (e: GameEvent[]) => void;
  category: UpgradeCategories;
}

interface HunterUpgradePanelState {
  selectedUpgrade?: Upgrades;
}

export class HunterUpgradePanel extends React.Component<
  HunterUpgradePanelProps,
  HunterUpgradePanelState
> {
  constructor(props: HunterUpgradePanelProps) {
    super(props);
    this.state = {};

    this.selectUpgrade = this.selectUpgrade.bind(this);
  }

  public render() {
    return (
      <div className="hunter-upgrade-panel">
        <HunterUpgradeTreeView
          gameState={this.props.gameState}
          sendGameEvents={this.props.sendGameEvents}
          onClick={this.selectUpgrade}
          upgrades={UpgradesMap.get(this.props.category)!}
        />
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
}
