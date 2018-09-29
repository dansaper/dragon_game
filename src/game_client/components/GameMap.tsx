import * as React from "react";

const MAP_RENDER_X = 500;
const MAP_RENDER_Y = 500;
const GRID_NUM_TILES_X = 25;
const GRID_NUM_TILES_Y = 25;
const GRID_TILE_X = 60;
const GRID_TILE_Y = 60;
const GRID_SIZE_X = GRID_NUM_TILES_X * GRID_TILE_X;
const GRID_SIZE_Y = GRID_NUM_TILES_Y * GRID_TILE_Y;
const DRAG_THRESHOLD = 3;
const MAX_OFFSET_X = Math.trunc(MAP_RENDER_X / 2);
const MAX_OFFSET_Y = Math.trunc(MAP_RENDER_Y / 2);
const GRID_OFFSET_LIMITS = {
  x: {
    min: -(GRID_SIZE_X - MAP_RENDER_X) - MAX_OFFSET_X,
    max: MAX_OFFSET_X
  },
  y: {
    min: -(GRID_SIZE_Y - MAP_RENDER_Y) - MAX_OFFSET_Y,
    max: MAX_OFFSET_Y
  }
};

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
  isSignificantDrag: boolean;
}

interface IGameMap {
  ownedTiles: IGameMapPoint[];
}

interface IGameMapState {
  persistentOffset: IGameMapOffset;
}

export class GameMap extends React.PureComponent<IGameMap, IGameMapState> {
  private canvasRef: React.RefObject<HTMLCanvasElement>;
  private get drawingContext(): CanvasRenderingContext2D {
    // this.canvasRef.current must be set by React before the context is accessed
    // We are also not supporting browsers where 2d context is not supported
    return this.canvasRef.current!.getContext("2d")!;
  }
  private draggingInfo: IDraggingInfo;
  constructor(props: IGameMap) {
    super(props);
    this.draggingInfo = {
      isDragging: false,
      isSignificantDrag: false
    };
    this.state = {
      persistentOffset: {
        x: 0,
        y: 0
      }
    };

    this.canvasRef = React.createRef<HTMLCanvasElement>();

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
  }

  public render() {
    return (
      <canvas
        ref={this.canvasRef}
        width={MAP_RENDER_X.toString()}
        height={MAP_RENDER_Y.toString()}
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
    // this.canvasRef.current will be set by React before this runs
    // Also not supporting browsers where 2d context is not supported
    this.renderMapWithOffset(this.drawingContext, this.state.persistentOffset);
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
        // We don't have a start location, so something is seriously wrong - stop dragging
        this.endDragging();
        return;
      }

      const mapOffset = this.calculateSignificantDragOffset(
        this.draggingInfo.dragStartLocation,
        clientX,
        clientY
      );

      // If there was a significant offset (caused by moving) at least once, the drag is significant
      if (
        this.state.persistentOffset.x !== mapOffset.x ||
        this.state.persistentOffset.y !== mapOffset.y
      ) {
        this.draggingInfo.isSignificantDrag = true;
      }

      this.renderMapWithOffset(this.drawingContext, mapOffset);
    });
  }

  private handleMouseOut(e: React.MouseEvent) {
    if (
      this.draggingInfo.isDragging &&
      this.draggingInfo.isSignificantDrag &&
      this.draggingInfo.dragStartLocation !== undefined
    ) {
      this.persistDrag(
        this.calculateSignificantDragOffset(
          this.draggingInfo.dragStartLocation,
          e.clientX,
          e.clientY
        )
      );
      this.endDragging();
    } else {
      this.endDragging();
    }
  }

  private handleMouseUp(e: React.MouseEvent) {
    if (
      this.draggingInfo.isDragging &&
      this.draggingInfo.isSignificantDrag &&
      this.draggingInfo.dragStartLocation !== undefined
    ) {
      this.persistDrag(
        this.calculateSignificantDragOffset(
          this.draggingInfo.dragStartLocation,
          e.clientX,
          e.clientY
        )
      );
      this.endDragging();
    } else {
      this.endDragging();
      // TODO: Handle real clicks
    }
  }

  private endDragging() {
    this.draggingInfo = {
      isDragging: false,
      isSignificantDrag: false
    };
  }

  private persistDrag(offset: IGameMapOffset) {
    this.setState({
      persistentOffset: {
        x: offset.x,
        y: offset.y
      }
    });
  }

  private calculateSignificantDragOffset(
    dragStartLocation: IMouseEventPoint,
    clientX: number,
    clientY: number
  ): IGameMapOffset {
    const xDrag = dragStartLocation.x - clientX;
    const yDrag = dragStartLocation.y - clientY;
    if (Math.abs(xDrag) <= DRAG_THRESHOLD && Math.abs(yDrag) <= DRAG_THRESHOLD) {
      return this.state.persistentOffset;
    }

    return this.limitDragOffsetToBoundary({
      x: this.state.persistentOffset.x + xDrag,
      y: this.state.persistentOffset.y + yDrag
    });
  }

  private limitDragOffsetToBoundary(offset: IGameMapOffset): IGameMapOffset {
    const newOffset = {
      x: offset.x,
      y: offset.y
    };

    if (offset.x < GRID_OFFSET_LIMITS.x.min) {
      newOffset.x = GRID_OFFSET_LIMITS.x.min;
    } else if (offset.x > GRID_OFFSET_LIMITS.x.max) {
      newOffset.x = GRID_OFFSET_LIMITS.x.max;
    }

    if (offset.y < GRID_OFFSET_LIMITS.y.min) {
      newOffset.y = GRID_OFFSET_LIMITS.y.min;
    } else if (offset.y > GRID_OFFSET_LIMITS.y.max) {
      newOffset.y = GRID_OFFSET_LIMITS.y.max;
    }

    return newOffset;
  }
}
