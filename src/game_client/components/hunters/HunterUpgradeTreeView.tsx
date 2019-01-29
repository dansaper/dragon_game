import * as React from "react";
import { GameEvent } from "../../../common/events/GameEvents";
import { GameState } from "../../../common/GameState";
import { Upgrades } from "../../../common/Upgrades";
import { HunterUpgradeDefinitions } from "../../client_elements/HunterUpgradeLibrary";
import { Draggable } from "../common/Draggable";
import { GameCanvas } from "../common/GameCanvas";
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
  sendGameEvents: (e: GameEvent[]) => void;
  upgrades: Upgrades[];
  onClick: (upgrade: Upgrades) => void;
}

export class HunterUpgradeTreeView extends React.Component<HunterUpgradeCanvasProps, {}> {
  constructor(props: HunterUpgradeCanvasProps) {
    super(props);

    this.drawConnectingLines = this.drawConnectingLines.bind(this);
  }

  public render() {
    return (
      <div className="hunter-upgrade-tree-view">
        <Draggable
          visibleDimensions={{ width: VIEWPORT_WIDTH, height: VIEWPORT_HEIGHT }}
          contentDimensions={{ width: CONTENT_WIDTH, height: CONTENT_HEIGHT }}
          dragRate={DRAG_RATE}
          dragThreshold={DRAG_THRESHOLD}
        >
          <div className="hunter-upgrade-tree-connections">
            <GameCanvas
              canvasWidth={CONTENT_WIDTH}
              canvasHeight={CONTENT_HEIGHT}
              redrawCanvas={this.drawConnectingLines}
            />
          </div>
          <div className="hunter-upgrade-tree-buttons">{this.getUpgradeButtons()}</div>
        </Draggable>
      </div>
    );
  }

  private getUpgradeButtons(): React.ReactNode {
    return (
      <>
        {this.props.upgrades.map(upgrade => {
          const upgradeLocation = HunterUpgradeButtonLayout.get(upgrade);
          if (upgradeLocation === undefined) {
            return;
          }
          return (
            <div
              key={upgrade}
              style={{ left: upgradeLocation.x, top: upgradeLocation.y }}
              className="hunter-upgrade-tree-button"
            >
              <HunterUpgradeDisplayButton
                upgrade={upgrade}
                onClick={() => this.props.onClick(upgrade)}
                gameState={this.props.gameState}
                sendGameEvents={this.props.sendGameEvents}
              />
            </div>
          );
        })}
      </>
    );
  }

  private drawConnectingLines(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    for (const upgrade of this.props.upgrades) {
      const upgradeLocation = HunterUpgradeButtonLayout.get(upgrade);
      if (upgradeLocation === undefined) {
        continue;
      }

      const upgradeDefinition = HunterUpgradeDefinitions.get(upgrade)!;
      if (!upgradeDefinition.isVisible(this.props.gameState)) {
        continue;
      }

      for (const parent of upgradeDefinition.parents) {
        const parentLocation = HunterUpgradeButtonLayout.get(parent)!!;
        ctx.moveTo(
          parentLocation.x + Math.trunc(BUTTON_WIDTH / 2),
          parentLocation.y + Math.trunc(BUTTON_HEIGHT / 2)
        );
        ctx.lineTo(
          upgradeLocation.x + Math.trunc(BUTTON_WIDTH / 2),
          upgradeLocation.y + Math.trunc(BUTTON_HEIGHT / 2)
        );
      }
    }

    ctx.stroke();
  }
}
