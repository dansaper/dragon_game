import * as React from "react";
import { GameEventTypes } from "../../../common/GameEvents";
import { GameState } from "../../../common/GameState";
import { UpgradeDefinitionsMap } from "../../../common/UpgradeDefinitionsMap";
import { Upgrade } from "../../../common/Upgrades";
import { ClientUpgradeDefinitionsMap } from "../../client_elements/ClientUpgradeButtonDefinitionsMap";
import { GameClient } from "../../GameClient";
import { ButtonWithInfo } from "../common/ButtonWithInfo";
import { ResourceList } from "../ResourceList";
import { canBuyUpgrade } from "../UpgradeUtils";

interface HunterUpgradeInfoPanelProps {
  selectedUpgrade?: Upgrade;
  gameState: GameState;
}

export const HunterUpgradeInfoPanel: React.FunctionComponent<HunterUpgradeInfoPanelProps> = (
  props
) => {
  const upgradeDef = props.selectedUpgrade
    ? UpgradeDefinitionsMap.get(props.selectedUpgrade)
    : undefined;
  const clientDef = props.selectedUpgrade
    ? ClientUpgradeDefinitionsMap.get(props.selectedUpgrade)
    : undefined;

  const cachedButtonProps = React.useMemo(() => {
    if (!props.selectedUpgrade) {
      return undefined;
    } else if (!upgradeDef || !clientDef) {
      throw new Error(
        `Unable to load definitions for upgrade info panel: ${props.selectedUpgrade}`
      );
    }

    const upgrade = props.selectedUpgrade;
    return {
      isVisible: () => !props.gameState.upgrades.has(upgrade),
      isDisabled: () => !canBuyUpgrade(props.gameState, upgradeDef),
      onClick: () =>
        GameClient.sendGameEvents([
          {
            eventType: GameEventTypes.PURCHASE_UPGRADE,
            upgrade: upgrade,
          },
        ]),
      title: "Purchase upgrade: " + clientDef.title,
    };
  }, [props.gameState, props.selectedUpgrade, upgradeDef, clientDef]);

  // Need to check cachedButtonProps to satisfy ts (Rule of Hooks means we can't do this earlier)
  if (!props.selectedUpgrade || !cachedButtonProps) {
    return (
      <div className="hunter-upgrade-info-panel">
        <div className="hunter-upgrade-title-wrapper">
          <div className="hunter-upgrade-title">No Upgrade Selected</div>
        </div>
      </div>
    );
  } else if (!upgradeDef || !clientDef) {
    throw new Error(`Unable to load definitions for upgrade info panel: ${props.selectedUpgrade}`);
  }

  return (
    <div className="hunter-upgrade-info-panel">
      <div className="hunter-upgrade-title-wrapper">
        <div className="hunter-upgrade-title">{clientDef.title}</div>
      </div>
      <div className="hunter-upgrade-content-wrapper">
        <div className="hunter-upgrade-content">
          <div className="hunter-upgrade-details">{clientDef.details}</div>
          <ButtonWithInfo {...cachedButtonProps} />
        </div>
        <div className="hunter-upgrade-cost">
          <div className="hunter-upgrade-cost-title">Cost</div>
          <ResourceList resources={upgradeDef.getCost(props.gameState)} />
        </div>
      </div>
    </div>
  );
};
