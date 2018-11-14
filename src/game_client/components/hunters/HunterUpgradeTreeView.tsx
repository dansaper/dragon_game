import * as React from "react";
import { GameEvent } from "../../../common/events/GameEvents";
import { GameState } from "../../../common/GameState";
import { Upgrades } from "../../../common/Upgrades";
import { HunterUpgradeDefinitions } from "../../client_elements/HunterUpgradeLibrary";
import { ButtonWithInfo } from "../common/ButtonWithInfo";
import { Draggable } from "../common/Draggable";
import { GameCanvas } from "../common/GameCanvas";
import { HunterUpgradeButtonLayout } from "./HunterUpgradeButttonLayout";

const VIEWPORT_WIDTH = 300;
const VIEWPORT_HEIGHT = 700;
const CONTENT_WIDTH = 600;
const CONTENT_HEIGHT = 1200;

const DRAG_RATE = 1.5;
const DRAG_THRESHOLD = 5;

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
          const upgradeDefinition = HunterUpgradeDefinitions.get(upgrade)!;
          const upgradeLocation = HunterUpgradeButtonLayout.get(upgrade)!;
          return (
            <div
              key={upgrade}
              style={{ left: upgradeLocation.x, top: upgradeLocation.y }}
              className="hunter-upgrade-tree-button"
            >
              <ButtonWithInfo
                isVisible={() => true}
                isDisabled={() => !upgradeDefinition.isEnabled(this.props.gameState)}
                onClick={() => this.props.onClick(upgrade)}
                title={upgradeDefinition.title}
                infoKey={upgradeDefinition.infoKey}
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
    ctx.stroke();
  }
}
