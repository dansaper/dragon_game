import * as React from "react";
import { GameState } from "../../../common/GameState";
import { Upgrades } from "../../../common/Upgrades";
import { HunterUpgradeDefinitions } from "../../client_elements/HunterUpgradeLibrary";
import { ButtonWithInfo } from "../common/ButtonWithInfo";

interface HunterUpgradeDisplayButtonProps {
  upgrade: Upgrades;
  onClick: () => void;
  gameState: GameState;
}

export const HunterUpgradeDisplayButton: React.FunctionComponent<HunterUpgradeDisplayButtonProps> = (
  props
) => {
  const cachedProps = React.useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const upgradeDefinition = HunterUpgradeDefinitions.get(props.upgrade)!;

    return {
      isVisible: () => upgradeDefinition.isVisible(props.gameState),
      isDisabled: () => !upgradeDefinition.isViewable(props.gameState),
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
      title: upgradeDefinition.title,
      infoKey: upgradeDefinition.infoKey,
    };
  }, [props.gameState, props.upgrade]);

  return (
    <ButtonWithInfo {...cachedProps} disabledInfoButtonOnDisable={true} onClick={props.onClick} />
  );
};
