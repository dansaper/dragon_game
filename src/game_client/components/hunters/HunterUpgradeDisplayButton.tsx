import * as React from "react";
import { GameState } from "../../../common/GameState";
import { Upgrade } from "../../../common/Upgrades";
import { ClientUpgradeDefinitionsMap } from "../../client_elements/ClientUpgradeButtonDefinitionsMap";
import { ButtonWithInfo } from "../common/ButtonWithInfo";

interface HunterUpgradeDisplayButtonProps {
  upgrade: Upgrade;
  onClick: () => void;
  gameState: GameState;
}

export const HunterUpgradeDisplayButton: React.FunctionComponent<HunterUpgradeDisplayButtonProps> = (
  props
) => {
  const cachedProps = React.useMemo(() => {
    const clientDef = ClientUpgradeDefinitionsMap.get(props.upgrade);

    if (!clientDef) {
      throw new Error(`Unable to load definitions for upgrade button: ${props.upgrade}`);
    }

    return {
      isVisible: () => true,
      isDisabled: () => false,
      renderContent: () => {
        const ownsUpgrade = props.gameState.upgrades.has(props.upgrade);
        return (
          <div className="upgrade-ownership-indicator">
            <div
              className={ownsUpgrade ? "owned-upgrade-indicator" : "unowned-upgrade-indicator"}
            />
          </div>
        );
      },
      title: clientDef.title,
      infoKey: clientDef.infoKey,
    };
  }, [props.gameState, props.upgrade]);

  return (
    <ButtonWithInfo {...cachedProps} disabledInfoButtonOnDisable={true} onClick={props.onClick} />
  );
};
