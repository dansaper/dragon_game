import * as React from "react";
import { checkGameEventPrerequisites } from "../../../common/GameEventPrerequisites";
import { GameState } from "../../../common/GameState";
import { UpgradeDefinitionsMap } from "../../../common/UpgradeDefinitionsMap";
import { Upgrade, UpgradeCategoriesMap, UpgradeCategory } from "../../../common/Upgrades";
import { UpgradeDefinition } from "../../../common/upgrade_definitions/UpgradeDefinition";
import { ViewPort } from "../common/ViewPort";
import { HunterUpgradeButtonLayout } from "./HunterUpgradeButttonLayout";
import { HunterUpgradeDisplayButton } from "./HunterUpgradeDisplayButton";

const VIEWPORT_WIDTH = 500;
const VIEWPORT_HEIGHT = 700;
const CONTENT_WIDTH = 600;
const CONTENT_HEIGHT = 1200;

const DRAG_RATE = 1.5;
const DRAG_THRESHOLD = 5;

const BUTTON_WIDTH = 118;
const BUTTON_HEIGHT = 78;

interface HunterUpgradeCanvasProps {
  gameState: GameState;
  category: UpgradeCategory;
  onClick: (upgrade: Upgrade) => void;
}

interface AugmentedUpgrade {
  upgrade: Upgrade;
  definition: UpgradeDefinition;
  parentUpgrades: Upgrade[];
}

/**
 * Preprocessed list of upgrades for each category
 */
const UpgradesWithReleventParents = new Map<UpgradeCategory, AugmentedUpgrade[]>();
UpgradeCategoriesMap.forEach((upgradesInCategory, category) => {
  const augmentedUpgrades = [...upgradesInCategory]
    .map((upgrade) => {
      const upgradeDefinition = UpgradeDefinitionsMap.get(upgrade);
      if (!upgradeDefinition) {
        return;
      }

      const relevantParents =
        upgradeDefinition.prerequisites?.upgrades?.filter((parent) =>
          upgradesInCategory.has(parent)
        ) || [];

      return {
        upgrade: upgrade,
        definition: upgradeDefinition,
        parentUpgrades: relevantParents,
      };
    })
    .filter((augmentedUpgrade) => !!augmentedUpgrade) as AugmentedUpgrade[];

  UpgradesWithReleventParents.set(category, augmentedUpgrades);
});

const generateLines = (
  upgrades: AugmentedUpgrade[]
): ReadonlyArray<{
  from: { x: number; y: number };
  to: { x: number; y: number };
}> => {
  const lines = [];
  for (const { upgrade, parentUpgrades } of upgrades) {
    const upgradeLocation = HunterUpgradeButtonLayout.get(upgrade);
    if (upgradeLocation === undefined) {
      continue;
    }

    for (const parent of parentUpgrades) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const parentLocation = HunterUpgradeButtonLayout.get(parent)!;
      lines.push({
        from: {
          x: parentLocation.x + Math.trunc(BUTTON_WIDTH / 2),
          y: parentLocation.y + Math.trunc(BUTTON_HEIGHT / 2),
        },
        to: {
          x: upgradeLocation.x + Math.trunc(BUTTON_WIDTH / 2),
          y: upgradeLocation.y + Math.trunc(BUTTON_HEIGHT / 2),
        },
      });
    }
  }

  return lines;
};

export const HunterUpgradeTreeView: React.FunctionComponent<HunterUpgradeCanvasProps> = (props) => {
  const visibleUpgrades = React.useMemo(() => {
    return (
      UpgradesWithReleventParents.get(props.category)?.filter(({ definition }) => {
        return definition.prerequisites
          ? checkGameEventPrerequisites(props.gameState, definition.prerequisites).valid
          : true;
      }) ?? []
    );
  }, [props.gameState, props.category]);

  const lines = React.useMemo(() => {
    return generateLines(visibleUpgrades);
  }, [visibleUpgrades]);

  const getUpgradeButton = (upgrade: Upgrade) => {
    const upgradeLocation = HunterUpgradeButtonLayout.get(upgrade);
    if (upgradeLocation === undefined) {
      return null;
    }
    return (
      <div
        key={upgrade}
        style={{ left: upgradeLocation.x, top: upgradeLocation.y }}
        className="hunter-upgrade-tree-button"
      >
        <HunterUpgradeDisplayButton
          upgrade={upgrade}
          onClick={() => props.onClick(upgrade)}
          gameState={props.gameState}
        />
      </div>
    );
  };

  return (
    <div className="hunter-upgrade-tree-view">
      <ViewPort
        visibleDimensions={{ width: VIEWPORT_WIDTH, height: VIEWPORT_HEIGHT }}
        contentDimensions={{ width: CONTENT_WIDTH, height: CONTENT_HEIGHT }}
        dragRate={DRAG_RATE}
        dragThreshold={DRAG_THRESHOLD}
      >
        <div className="hunter-upgrade-tree-content">
          <svg
            className="hunter-upgrade-tree-connections"
            viewBox={`0 0 ${CONTENT_WIDTH} ${CONTENT_HEIGHT}`}
          >
            {lines.map((l, index) => (
              <line
                key={index}
                x1={l.from.x}
                y1={l.from.y}
                x2={l.to.x}
                y2={l.to.y}
                stroke="black"
              />
            ))}
          </svg>
          <div className="hunter-upgrade-tree-buttons">
            {visibleUpgrades.map((augmented) => augmented.upgrade).map(getUpgradeButton)}
          </div>
        </div>
      </ViewPort>
    </div>
  );
};
