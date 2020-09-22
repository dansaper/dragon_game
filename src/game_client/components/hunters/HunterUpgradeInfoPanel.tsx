import * as React from "react";
import { GameState } from "../../../common/GameState";
import { Upgrades } from "../../../common/Upgrades";
import { UpgradeDisplayDefinition } from "../../client_elements/GameElementDefinitions";
import { HunterUpgradeDefinitions } from "../../client_elements/HunterUpgradeLibrary";
import { GameClient } from "../../GameClient";
import { ButtonWithInfo } from "../common/ButtonWithInfo";
import { ResourceList } from "../ResourceList";

interface HunterUpgradeInfoPanelProps {
  selectedUpgrade?: Upgrades;
  gameState: GameState;
}

export const HunterUpgradeInfoPanel: React.FunctionComponent<HunterUpgradeInfoPanelProps> = (
  props
) => {
  let upgradeDefinition: UpgradeDisplayDefinition | undefined;
  if (props.selectedUpgrade) {
    upgradeDefinition = HunterUpgradeDefinitions.get(props.selectedUpgrade);
  }

  const cachedButtonProps = React.useMemo(() => {
    if (!upgradeDefinition) {
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const buttonDef = upgradeDefinition!;

    return {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      isVisible: () => !props.gameState.upgrades.has(props.selectedUpgrade!),
      isDisabled: () => !buttonDef.isPurchaseable(props.gameState),
      onClick: () => GameClient.sendGameEvents(buttonDef.purchase(props.gameState)),
      title: "Purchase upgrade: " + upgradeDefinition.title,
    };
  }, [props.gameState, props.selectedUpgrade, upgradeDefinition]);

  if (!upgradeDefinition || !cachedButtonProps) {
    return (
      <div className="hunter-upgrade-info-panel">
        <div className="hunter-upgrade-title-wrapper">
          <div className="hunter-upgrade-title">No Upgrade Selected</div>
        </div>
      </div>
    );
  }

  return (
    <div className="hunter-upgrade-info-panel">
      <div className="hunter-upgrade-title-wrapper">
        <div className="hunter-upgrade-title">{upgradeDefinition.title}</div>
      </div>
      <div className="hunter-upgrade-content-wrapper">
        <div className="hunter-upgrade-content">
          <div className="hunter-upgrade-details">{upgradeDefinition.details}</div>
          <ButtonWithInfo {...cachedButtonProps} />
        </div>
        <div className="hunter-upgrade-cost">
          <div className="hunter-upgrade-cost-title">Cost</div>
          <ResourceList resources={upgradeDefinition.getCost(props.gameState)} />
        </div>
      </div>
    </div>
  );
};
