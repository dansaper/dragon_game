import * as React from "react";
import { GameCanvas } from "../common/GameCanvas";

const MAP_CANVAS_WIDTH = 500;
const MAP_CANVAS_HEIGHT = 500;
const GRID_NUM_TILES_X = 10;
const GRID_NUM_TILES_Y = 10;
const GRID_TILE_X = 60;
const GRID_TILE_Y = 60;
const GRID_SIZE_X = GRID_NUM_TILES_X * GRID_TILE_X;
const GRID_SIZE_Y = GRID_NUM_TILES_Y * GRID_TILE_Y;

// Multiplier to distance covered by drag
const DRAG_RATE = 1.5;
// Number of pixels under which a drag does not count as significant
const DRAG_THRESHOLD = 5;

export interface GameMapTile {
  x: number;
  y: number;
}

interface GameMapProps {
  ownedTiles: boolean[][];
}

export class GameMap extends React.Component<GameMapProps, {}> {
  constructor(props: GameMapProps) {
    super(props);
    this.renderMap = this.renderMap.bind(this);
    this.getTileClicked = this.getTileClicked.bind(this);
  }

  public render() {
    return (
      <GameCanvas
        canvasWidth={MAP_CANVAS_WIDTH}
        canvasHeight={MAP_CANVAS_HEIGHT}
        contentWidth={GRID_SIZE_X}
        contentHeight={GRID_SIZE_Y}
        dragRate={DRAG_RATE}
        dragThreshold={DRAG_THRESHOLD}
        redrawCanvas={this.renderMap}
        onPointClicked={this.getTileClicked}
      />
    );
  }

  private renderMap(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.fillStyle = "white";
    ctx.beginPath();
    for (let x = 0; x < GRID_NUM_TILES_X; ++x) {
      for (let y = 0; y <= GRID_NUM_TILES_Y; ++y) {
        // For crisp lines with width 1, draw at an offset of 0.5
        // See https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Applying_styles_and_colors#A_lineWidth_example
        ctx.rect(x * GRID_TILE_X + 0.5, y * GRID_TILE_Y + 0.5, GRID_TILE_X, GRID_TILE_Y);
      }
    }
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }

  private getTileClicked(point: { x: number; y: number }): GameMapTile {
    return {
      x: Math.floor(point.x / GRID_TILE_X),
      y: Math.floor(point.y / GRID_TILE_Y)
    };
  }
}
