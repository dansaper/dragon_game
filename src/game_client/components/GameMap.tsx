import * as React from "react";

const MAP_RENDER_X = "500";
const MAP_RENDER_Y = "500";
const GRID_SIZE_X = 30;
const GRID_SIZE_Y = 30;
const GRID_TILE_X = 40;
const GRID_TILE_Y = 40;

export interface IGameMapPoint {
  x: number;
  y: number;
}

interface IGameMapOffset {
  x: number;
  y: number;
}

interface IDraggingInfo {
  isDragging: boolean;
  offset: IGameMapOffset;
}

interface IGameMap {
  onSelectValidTile: (tile: IGameMapPoint) => void;
  ownedTiles: IGameMapPoint[];
  canPurchaseTile: (tile: IGameMapPoint) => void;
}

interface IGameMapState {
  persistentOffset: IGameMapOffset;
}

export class GameMap extends React.PureComponent<IGameMap, IGameMapState> {
  private ctx?: CanvasRenderingContext2D;
  private draggingInfo: IDraggingInfo;
  constructor(props: IGameMap) {
    super(props);
    this.draggingInfo = {
      isDragging: false,
      offset: {
        x: 0,
        y: 0
      }
    };
    this.state = {
      persistentOffset: {
        x: 0,
        y: 0
      }
    };
  }

  public render() {
    return (
      <canvas id="game-map-canvas" width={MAP_RENDER_X} height={MAP_RENDER_Y}>
        Cannot render canvas
      </canvas>
    );
  }

  public componentDidMount() {
    const canvas = document.getElementById("game-map-canvas") as HTMLCanvasElement;
    this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    this.renderMap(this.state.persistentOffset);
  }

  public componentDidUpdate(_prevProps: IGameMap, prevState: IGameMapState) {
    const oldOffset = {
      x: prevState.persistentOffset.x,
      y: prevState.persistentOffset.y
    };

    if (
      this.state.persistentOffset.x !== prevState.persistentOffset.x ||
      this.state.persistentOffset.y !== prevState.persistentOffset.y
    ) {
      this.setState({
        persistentOffset: oldOffset
      });
    }

    this.renderMap(oldOffset);
  }

  private renderMap(offset: IGameMapOffset) {
    if (!this.ctx) {
      return;
    }
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.beginPath();
    for (let x = 0; x < GRID_SIZE_X; ++x) {
      this.ctx.moveTo(x * GRID_TILE_X, 0);
      this.ctx.lineTo(x * GRID_TILE_X, GRID_SIZE_Y * GRID_TILE_Y);
    }
    for (let y = 0; y < GRID_SIZE_Y; ++y) {
      this.ctx.moveTo(0, y * GRID_TILE_Y);
      this.ctx.lineTo(GRID_SIZE_X * GRID_TILE_X, y * GRID_TILE_Y);
    }
    this.ctx.stroke();

    return offset;
  }

  private handleMouseDown(e: React.SyntheticEvent) {
    this.draggingInfo.isDragging = true;
  }

  private handleMouseOut(e: React.SyntheticEvent) {
    this.endDragging();
  }

  private handleMouseUp(e: React.SyntheticEvent) {
    if (
      this.draggingInfo.isDragging &&
      (this.draggingInfo.offset.x > 2 || this.draggingInfo.offset.y > 2)
    ) {
      this.endDragging();
    } else {
      this.draggingInfo.isDragging = false;
      //TODO: Handle attempted purchase
    }
  }

  private endDragging() {
    this.draggingInfo.isDragging = false;
    this.setState({
      persistentOffset: {
        x: this.draggingInfo.offset.x,
        y: this.draggingInfo.offset.y
      }
    });
  }
}
