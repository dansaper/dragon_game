import * as React from "react";
import { GameEvent } from "../../../common/events/GameEvents";
import { GameState } from "../../../common/GameState";
import { GameCanvas } from "../common/GameCanvas";

const CANVAS_WIDTH = 300;
const CANVAS_HEIGHT = 700;
const CONTENT_WIDTH = 600;
const CONTENT_HEIGHT = 1200;

const DRAG_RATE = 1.5;
const DRAG_THRESHOLD = 5;

const BUTTON_BORDER_RADIUS = 5;
const BUTTON_WIDTH = 118;
const BUTTON_HEIGHT = 78;

interface Point {
  x: number;
  y: number;
}

interface ButtonRect {
  upperLeft: Point;
  upperRight: Point;
  lowerLeft: Point;
  lowerRight: Point;
}

interface Line {
  start: Point;
  end: Point;
}
interface ButtonOutline {
  top: Line;
  bottom: Line;
  left: Line;
  right: Line;
  upperLeft: Point;
  upperRight: Point;
  lowerLeft: Point;
  lowerRight: Point;
}

function buildButtonRect(origin: Point): ButtonRect {
  return {
    upperLeft: { x: origin.x, y: origin.y },
    upperRight: { x: origin.x + BUTTON_WIDTH, y: origin.y },
    lowerLeft: { x: origin.x, y: origin.y + BUTTON_HEIGHT },
    lowerRight: { x: origin.x + BUTTON_WIDTH, y: origin.y + BUTTON_HEIGHT }
  };
}

function buildButtonOutline(rect: ButtonRect): ButtonOutline {
  return {
    top: {
      start: { x: rect.upperLeft.x + BUTTON_BORDER_RADIUS, y: rect.upperLeft.y },
      end: { x: rect.upperRight.x - BUTTON_BORDER_RADIUS, y: rect.upperRight.y }
    },
    bottom: {
      start: { x: rect.lowerRight.x - BUTTON_BORDER_RADIUS, y: rect.lowerRight.y },
      end: { x: rect.lowerLeft.x + BUTTON_BORDER_RADIUS, y: rect.lowerLeft.y }
    },
    left: {
      start: { x: rect.lowerLeft.x, y: rect.lowerLeft.y - BUTTON_BORDER_RADIUS },
      end: { x: rect.upperLeft.x, y: rect.upperLeft.y + BUTTON_BORDER_RADIUS }
    },
    right: {
      start: { x: rect.upperRight.x, y: rect.upperRight.y + BUTTON_BORDER_RADIUS },
      end: { x: rect.lowerRight.x, y: rect.lowerRight.y - BUTTON_BORDER_RADIUS }
    },
    ...rect
  };
}

const buttonA = buildButtonOutline(buildButtonRect({ x: 20, y: 40 }));

interface HunterUpgradeCanvasProps {
  gameState: GameState;
  sendGameEvents: (e: GameEvent[]) => void;
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
    this.drawUpgradeButton(ctx);
    // TODO
  }

  private drawUpgradeButton(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();

    this.drawButtonOutline(ctx, buttonA);

    ctx.stroke();
  }

  private drawButtonOutline(ctx: CanvasRenderingContext2D, outline: ButtonOutline) {
    // For crisp lines with width 1, draw at an offset of 0.5
    // See https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Applying_styles_and_colors#A_lineWidth_example

    ctx.strokeStyle = "darkgray";
    // Moving from top left line start clockwise:
    ctx.moveTo(outline.top.start.x, outline.top.start.y + 0.5);

    ctx.lineTo(outline.top.end.x, outline.top.end.y + 0.5);
    ctx.arcTo(
      outline.upperRight.x,
      outline.upperRight.y + 0.5,
      outline.right.start.x + 0.5,
      outline.right.start.y,
      BUTTON_BORDER_RADIUS
    );
    ctx.lineTo(outline.right.end.x + 0.5, outline.right.end.y);
    ctx.arcTo(
      outline.lowerRight.x + 0.5,
      outline.lowerRight.y,
      outline.bottom.start.x,
      outline.bottom.start.y + 0.5,
      BUTTON_BORDER_RADIUS
    );
    ctx.lineTo(outline.bottom.end.x, outline.bottom.end.y + 0.5);
    ctx.arcTo(
      outline.lowerLeft.x,
      outline.lowerLeft.y + 0.5,
      outline.left.start.x + 0.5,
      outline.left.start.y,
      BUTTON_BORDER_RADIUS
    );
    ctx.lineTo(outline.left.end.x + 0.5, outline.left.end.y);
    ctx.arcTo(
      outline.upperLeft.x + 0.5,
      outline.upperLeft.y,
      outline.top.start.x,
      outline.top.start.y + 0.5,
      BUTTON_BORDER_RADIUS
    );
  }
}
