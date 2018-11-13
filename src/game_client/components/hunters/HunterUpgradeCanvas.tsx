import * as React from "react";
import { GameEvent } from "../../../common/events/GameEvents";
import { GameState } from "../../../common/GameState";
import { Upgrades } from "../../../common/Upgrades";
import { HunterUpgradeDefinitions } from "../../client_elements/HunterUpgradeLibrary";
import { GameCanvas } from "../common/GameCanvas";
import {
  HunterUpgradeButtonDisplayProperties,
  HunterUpgradeButtonLayout
} from "./HunterUpgradeButttonLayout";

const CANVAS_WIDTH = 300;
const CANVAS_HEIGHT = 700;
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

export class HunterUpgradeCanvas extends React.Component<HunterUpgradeCanvasProps, {}> {
  constructor(props: HunterUpgradeCanvasProps) {
    super(props);
    this.drawUpgradeTree = this.drawUpgradeTree.bind(this);
  }

  public render() {
    return (
      <div className="hunter-upgrade-canvas">
        <GameCanvas
          canvasWidth={CANVAS_WIDTH}
          canvasHeight={CANVAS_HEIGHT}
          contentWidth={CONTENT_WIDTH}
          contentHeight={CONTENT_HEIGHT}
          dragRate={DRAG_RATE}
          dragThreshold={DRAG_THRESHOLD}
          redrawCanvas={this.drawUpgradeTree}
        />
      </div>
    );
  }

  private drawUpgradeTree(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    this.drawUpgradeButtons(ctx, this.props.upgrades);
    this.drawConnectingLines(ctx, this.props.upgrades);
    ctx.stroke();
  }

  private drawUpgradeButtons(ctx: CanvasRenderingContext2D, upgrades: Upgrades[]) {
    this.drawUpgradeButtonOutlines(ctx, upgrades);
    this.drawUpgradeButtonTexts(ctx, upgrades);
  }

  private drawUpgradeButtonTexts(ctx: CanvasRenderingContext2D, upgrades: Upgrades[]) {
    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.font = HunterUpgradeButtonDisplayProperties.titleFont;
    ctx.textAlign = "center";
    for (const upgrade of upgrades) {
      this.drawButtonText(ctx, upgrade);
    }
    ctx.stroke();
  }

  private drawButtonText(ctx: CanvasRenderingContext2D, upgrade: Upgrades) {
    const definition = HunterUpgradeDefinitions.get(upgrade)!;
    const location = HunterUpgradeButtonLayout.get(upgrade)!;

    ctx.fillText(
      definition.title,
      location.center.x,
      location.center.y,
      HunterUpgradeButtonDisplayProperties.maxTextWidth
    );
  }

  private drawUpgradeButtonOutlines(ctx: CanvasRenderingContext2D, upgrades: Upgrades[]) {
    ctx.beginPath();
    ctx.strokeStyle = "darkgray";
    for (const upgrade of upgrades) {
      this.drawButtonOutline(ctx, upgrade);
    }
    ctx.stroke();
  }

  private drawButtonOutline(ctx: CanvasRenderingContext2D, upgrade: Upgrades) {
    const location = HunterUpgradeButtonLayout.get(upgrade)!;
    // For crisp lines with width 1, draw at an offset of 0.5
    // See https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Applying_styles_and_colors#A_lineWidth_example

    // Moving from top left line start clockwise:
    ctx.moveTo(location.top.start.x, location.top.start.y + 0.5);

    ctx.lineTo(location.top.end.x, location.top.end.y + 0.5);
    ctx.arcTo(
      location.upperRight.x,
      location.upperRight.y + 0.5,
      location.right.start.x + 0.5,
      location.right.start.y,
      HunterUpgradeButtonDisplayProperties.borderRadius
    );
    ctx.lineTo(location.right.end.x + 0.5, location.right.end.y);
    ctx.arcTo(
      location.lowerRight.x + 0.5,
      location.lowerRight.y,
      location.bottom.start.x,
      location.bottom.start.y + 0.5,
      HunterUpgradeButtonDisplayProperties.borderRadius
    );
    ctx.lineTo(location.bottom.end.x, location.bottom.end.y + 0.5);
    ctx.arcTo(
      location.lowerLeft.x,
      location.lowerLeft.y + 0.5,
      location.left.start.x + 0.5,
      location.left.start.y,
      HunterUpgradeButtonDisplayProperties.borderRadius
    );
    ctx.lineTo(location.left.end.x + 0.5, location.left.end.y);
    ctx.arcTo(
      location.upperLeft.x + 0.5,
      location.upperLeft.y,
      location.top.start.x,
      location.top.start.y + 0.5,
      HunterUpgradeButtonDisplayProperties.borderRadius
    );
  }

  private drawConnectingLines(ctx: CanvasRenderingContext2D, upgrades: Upgrades[]) {
    ctx.beginPath();
    ctx.strokeStyle = "darkgray";
    for (const upgrade of upgrades) {
      this.drawLinesToParents(ctx, upgrade);
    }
    ctx.stroke();
  }

  private drawLinesToParents(ctx: CanvasRenderingContext2D, upgrade: Upgrades) {
    const upgradeDefinition = HunterUpgradeDefinitions.get(upgrade)!;
    const upgradeLocation = HunterUpgradeButtonLayout.get(upgrade)!;
    if (upgradeDefinition.parents.length > 0) {
      for (const parent of upgradeDefinition.parents) {
        const parentLocation = HunterUpgradeButtonLayout.get(parent)!;
        ctx.moveTo(parentLocation.bottom.midpoint.x, parentLocation.bottom.midpoint.y);
        ctx.lineTo(upgradeLocation.top.midpoint.x, upgradeLocation.top.midpoint.y);
      }
    }
  }
}
