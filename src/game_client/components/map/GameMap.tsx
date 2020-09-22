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

const buildGrid = () => {
  const tiles = [];
  for (let x = 0; x < GRID_NUM_TILES_X; ++x) {
    for (let y = 0; y < GRID_NUM_TILES_Y; ++y) {
      tiles.push(
        <g key={`(${x},${y})`}>
          <rect
            fill="white"
            x={x * GRID_TILE_X}
            y={y * GRID_TILE_Y}
            width={GRID_TILE_X}
            height={GRID_TILE_Y}
          />
          <circle
            cx={(x + 0.5) * GRID_TILE_X}
            cy={(y + 0.5) * GRID_TILE_Y}
            r="2"
            fill="red"
          ></circle>
          <text x={(x + 0.75) * GRID_TILE_X} y={(y + 0.75) * GRID_TILE_Y}>
            {x},{y}
          </text>
        </g>
      );
    }
  }

  return <g stroke="black">{...tiles}</g>;
};

const drawMap = () => {
  return <g>{MainMap}</g>;
};

export const GameMap: React.FunctionComponent<GameMapProps> = (_props) => {
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
            {buildGrid()}
            {drawMap()}
          </svg>
        </div>
      </ViewPort>
    </div>
  );
};
