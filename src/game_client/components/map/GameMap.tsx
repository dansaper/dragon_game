import * as React from "react";
import { ViewPort } from "../common/ViewPort";
import { MainMap } from "./MainMap";

const VIEWPORT_WIDTH = 500;
const VIEWPORT_HEIGHT = 500;
const CONTENT_WIDTH = 2000;
const CONTENT_HEIGHT = 2000;

const GRID_NUM_TILES_X = 20;
const GRID_NUM_TILES_Y = 20;
const GRID_TILE_X = 100;
const GRID_TILE_Y = 100;

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
  constructor(props: GameMapProps) {
    super(props);
  }

  public render() {
    return (
      <div className="game-map">
        <ViewPort
          visibleDimensions={{ width: VIEWPORT_WIDTH, height: VIEWPORT_HEIGHT }}
          contentDimensions={{ width: CONTENT_WIDTH, height: CONTENT_HEIGHT }}
          dragRate={DRAG_RATE}
          dragThreshold={DRAG_THRESHOLD}
        >
          <div className="game-map-content-wrapper">
            <svg className="game-map-content" viewBox={`0 0 ${CONTENT_WIDTH} ${CONTENT_HEIGHT}`}>
              {this.buildGrid()}
              {this.drawMap()}
            </svg>
          </div>
        </ViewPort>
      </div>
    );
  }

  private buildGrid() {
    const tiles = [];
    for (let x = 0; x < GRID_NUM_TILES_X; ++x) {
      for (let y = 0; y <= GRID_NUM_TILES_Y; ++y) {
        tiles.push(
          <rect
            key={`(${x},${y})`}
            fill="white"
            x={x * GRID_TILE_X}
            y={y * GRID_TILE_Y}
            width={GRID_TILE_X}
            height={GRID_TILE_Y}
          />
        );
      }
    }

    return <g stroke="black">{...tiles}</g>;
  }

  private drawMap() {
    return <g>{MainMap}</g>;
  }
}
