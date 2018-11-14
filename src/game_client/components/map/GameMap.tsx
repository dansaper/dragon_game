import * as React from "react";
import { Draggable } from "../common/Draggable";
import { GameCanvas } from "../common/GameCanvas";

const MAP_WIDTH = 500;
const MAP_HEIGHT = 500;
const GRID_NUM_TILES_X = 15;
const GRID_NUM_TILES_Y = 15;
const GRID_TILE_X = 60;
const GRID_TILE_Y = 60;
// Give grid a little room to breathe (so end +0.5 doesn't escape)
const GRID_SIZE_X = GRID_NUM_TILES_X * GRID_TILE_X + 2;
const GRID_SIZE_Y = GRID_NUM_TILES_Y * GRID_TILE_Y + 2;

const DRAG_RATE = 1.5;
const DRAG_THRESHOLD = 5;

export interface GameMapTile {
  x: number;
  y: number;
}

interface GameMapProps {
  ownedTiles: boolean[][];
}

export class GameMap extends React.Component<GameMapProps, {}> {
  private isDragging: boolean;
  constructor(props: GameMapProps) {
    super(props);
    this.isDragging = false;

    this.renderMap = this.renderMap.bind(this);
    this.getTileClicked = this.getTileClicked.bind(this);
    this.setIsDragging = this.setIsDragging.bind(this);
  }

  public render() {
    return (
      <div className="game-map">
        <Draggable
          visibleDimensions={{ width: MAP_WIDTH, height: MAP_HEIGHT }}
          contentDimensions={{ width: GRID_SIZE_X, height: GRID_SIZE_Y }}
          dragRate={DRAG_RATE}
          dragThreshold={DRAG_THRESHOLD}
          setIsDragging={this.setIsDragging}
        >
          <GameCanvas
            canvasWidth={GRID_SIZE_X}
            canvasHeight={GRID_SIZE_Y}
            redrawCanvas={this.renderMap}
            onPointClicked={this.getTileClicked}
          />
        </Draggable>
      </div>
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

  // @ts-ignore Once we implement this, remove the ignore
  private handleClick(point: { x: number; y: number }): void {
    if (this.isDragging) {
      return;
    }
    // const tile = this.getTileClicked(point);
  }

  private getTileClicked(point: { x: number; y: number }): GameMapTile {
    const tile: GameMapTile = {
      x: Math.floor(point.x / GRID_TILE_X),
      y: Math.floor(point.y / GRID_TILE_Y)
    };
    return tile;
  }

  private setIsDragging(isDragging: boolean) {
    this.isDragging = isDragging;
  }
}
