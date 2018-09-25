import * as React from "react";

const MAP_RENDER_X = "500";
const MAP_RENDER_Y = "500";
const GRID_NUM_TILES_X = 30;
const GRID_NUM_TILES_Y = 30;
const GRID_TILE_X = 40;
const GRID_TILE_Y = 40;
const GRID_SIZE_X = GRID_NUM_TILES_X * GRID_TILE_X;
const GRID_SIZE_Y = GRID_NUM_TILES_Y * GRID_TILE_Y;

export interface IGameMapPoint {
  x: number;
  y: number;
}

interface IGameMapOffset {
  x: number;
  y: number;
}

interface IMouseEventPoint {
  x: number;
  y: number;
}

interface IDraggingInfo {
  isDragging: boolean;
  dragStartLocation?: IMouseEventPoint;
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
      isDragging: false
    };
    this.state = {
      persistentOffset: {
        x: 0,
        y: 0
      }
    };

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
  }

  public render() {
    return (
      <canvas
        id="game-map-canvas"
        width={MAP_RENDER_X}
        height={MAP_RENDER_Y}
        onMouseDown={this.handleMouseDown}
        onMouseMove={this.handleMouseMove}
        onMouseOut={this.handleMouseOut}
        onMouseUp={this.handleMouseUp}
      >
        Cannot render canvas
      </canvas>
    );
  }

  public componentDidMount() {
    const canvas = document.getElementById("game-map-canvas") as HTMLCanvasElement;
    this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    this.renderMapWithOffset(this.ctx, this.state.persistentOffset);
  }

  private renderMapWithOffset(ctx: CanvasRenderingContext2D, offset: IGameMapOffset) {
    ctx.setTransform(1, 0, 0, 1, 0, 0);

    ctx.clearRect(0, 0, GRID_SIZE_X, GRID_SIZE_Y);
    ctx.beginPath();

    ctx.translate(offset.x, offset.y);
    this.renderMap(ctx);
  }

  private renderMap(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    for (let x = 0; x <= GRID_NUM_TILES_X; ++x) {
      ctx.moveTo(x * GRID_TILE_X, 0);
      ctx.lineTo(x * GRID_TILE_X, GRID_SIZE_Y);
    }
    for (let y = 0; y <= GRID_NUM_TILES_Y; ++y) {
      ctx.moveTo(0, y * GRID_TILE_Y);
      ctx.lineTo(GRID_SIZE_X, y * GRID_TILE_Y);
    }
    ctx.stroke();
  }

  private handleMouseDown(e: React.MouseEvent) {
    this.draggingInfo.isDragging = true;
    this.draggingInfo.dragStartLocation = {
      x: e.clientX,
      y: e.clientY
    };
  }

  private handleMouseMove(e: React.MouseEvent) {
    const clientX = e.clientX;
    const clientY = e.clientY;
    window.requestAnimationFrame(() => {
      if (!this.draggingInfo.isDragging) {
        return;
      }
      if (this.draggingInfo.dragStartLocation === undefined) {
        // We don't have a start location, so Something is wrong - stop dragging
        this.endDragging();
        return;
      }

      const mapOffset = this.calculateTotalDragOffset(
        this.draggingInfo.dragStartLocation,
        clientX,
        clientY
      );
      this.renderMapWithOffset(this.ctx!, mapOffset);
    });
  }

  private handleMouseOut(e: React.MouseEvent) {
    if (this.draggingInfo.isDragging && this.draggingInfo.dragStartLocation !== undefined) {
      this.persistDrag(
        this.calculateTotalDragOffset(this.draggingInfo.dragStartLocation, e.clientX, e.clientY)
      );
      this.endDragging();
    } else {
      this.endDragging();
    }
  }

  private handleMouseUp(e: React.MouseEvent) {
    if (this.draggingInfo.isDragging && this.draggingInfo.dragStartLocation !== undefined) {
      this.persistDrag(
        this.calculateTotalDragOffset(this.draggingInfo.dragStartLocation, e.clientX, e.clientY)
      );
      this.endDragging();
    } else {
      this.endDragging();
      // TODO: Handle real clicks
    }
  }

  private endDragging() {
    this.draggingInfo.isDragging = false;
    this.draggingInfo.dragStartLocation = undefined;
  }

  private persistDrag(offset: IGameMapOffset) {
    this.setState({
      persistentOffset: {
        x: offset.x,
        y: offset.y
      }
    });
  }

  private calculateTotalDragOffset(
    dragStartLocation: IMouseEventPoint,
    clientX: number,
    clientY: number
  ): IGameMapOffset {
    return {
      x: this.state.persistentOffset.x + (dragStartLocation.x - clientX),
      y: this.state.persistentOffset.y + (dragStartLocation.y - clientY)
    };
  }
}
