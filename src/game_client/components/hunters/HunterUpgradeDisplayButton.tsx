import * as React from "react";
import { GameState } from "../../../common/GameState";
import { Upgrades } from "../../../common/Upgrades";
import { HunterUpgradeDefinitions } from "../../client_elements/HunterUpgradeLibrary";
import { ButtonWithInfo } from "../common/ButtonWithInfo";
import { PropertyCache } from "../common/PropertyCache";

interface HunterUpgradeDisplayButtonProps {
  upgrade: Upgrades;
  onClick: () => void;
  gameState: GameState;
}

interface CachedProperties {
  isVisible: () => boolean;
  isDisabled: () => boolean;
  renderContent: () => JSX.Element;
}

export class HunterUpgradeDisplayButton extends React.Component<HunterUpgradeDisplayButtonProps> {
  private cachedButtonProperties = new PropertyCache<Upgrades, CachedProperties>();

  public render() {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const upgradeDefinition = HunterUpgradeDefinitions.get(this.props.upgrade)!;

    const propsCapturingThis = {
      isVisible: () => upgradeDefinition.isVisible(this.props.gameState),
      isDisabled: () => !upgradeDefinition.isViewable(this.props.gameState),
      renderContent: () => {
        const ownsUpgrade = this.props.gameState.upgrades.has(this.props.upgrade);
        return (
          <div className="upgrade-ownership-indicator">
            <div
              className={ownsUpgrade ? "owned-upgrade-indicator" : "unowned-upgrade-indicator"}
            />
          </div>
        );
      },
    };
    const cached = this.cachedButtonProperties.getOrSet(this.props.upgrade, propsCapturingThis);

    return (
      <ButtonWithInfo
        {...cached}
        disabledInfoButtonOnDisable={true}
        onClick={this.props.onClick}
        title={upgradeDefinition.title}
        infoKey={upgradeDefinition.infoKey}
      />
    );
  }
}
