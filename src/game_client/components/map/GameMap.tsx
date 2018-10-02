import * as React from "react";
import { DragHandler } from "./DragHandler";

const MAP_RENDER_X = 500;
const MAP_RENDER_Y = 500;
const GRID_NUM_TILES_X = 10;
const GRID_NUM_TILES_Y = 10;
const GRID_TILE_X = 60;
const GRID_TILE_Y = 60;
const GRID_SIZE_X = GRID_NUM_TILES_X * GRID_TILE_X;
const GRID_SIZE_Y = GRID_NUM_TILES_Y * GRID_TILE_Y;
const MAX_OFFSET_X = Math.trunc(MAP_RENDER_X / 2);
const MAX_OFFSET_Y = Math.trunc(MAP_RENDER_Y / 2);

// Limits assumes GRID_SIZEs are greater than the render size
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

// Multiplier to distance covered by drag
const DRAG_RATE = 1.5;
// Number of pixels under which a drag does not count as significant
const DRAG_THRESHOLD = 5;

export interface GameMapTile {
  x: number;
  y: number;
}

interface GameMapOffset {
  x: number;
  y: number;
}

interface GameMapProps {
  ownedTiles: boolean[][];
}

interface GameMapState {
  persistentOffset: GameMapOffset;
}

export class GameMap extends React.PureComponent<GameMapProps, GameMapState> {
  private canvasRef: React.RefObject<HTMLCanvasElement>;
  private get drawingContext(): CanvasRenderingContext2D {
    // this.canvasRef.current must be set by React before the context is accessed
    // We are also not supporting browsers where 2d context is not supported
    return this.canvasRef.current!.getContext("2d")!;
  }
  private isDragging: boolean = false;
  private dragHandler?: DragHandler;
  constructor(props: GameMapProps) {
    super(props);
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
    this.renderMapWithOffset(this.drawingContext, this.state.persistentOffset);
  }

  private renderMapWithOffset(ctx: CanvasRenderingContext2D, offset: GameMapOffset) {
    ctx.setTransform(1, 0, 0, 1, 0, 0);

    // Clear assuming  are greater than the render size
    ctx.clearRect(0, 0, GRID_SIZE_X, GRID_SIZE_Y);
    ctx.beginPath();

    ctx.translate(offset.x, offset.y);
    this.renderMap(ctx);
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

  private handleMouseDown(e: React.MouseEvent) {
    this.isDragging = true;
    this.dragHandler = new DragHandler(
      {
        x: e.clientX,
        y: e.clientY
      },
      DRAG_RATE,
      DRAG_THRESHOLD
    );
  }

  private handleMouseMove(e: React.MouseEvent) {
    if (!this.isDragging) {
      return;
    }
    this.dragHandler!.update({
      x: e.clientX,
      y: e.clientY
    });

    window.requestAnimationFrame(() => {
      if (!this.isDragging) {
        return;
      }
      this.renderMapWithOffset(
        this.drawingContext,
        this.dragHandler!.calculateOffset(this.state.persistentOffset, GRID_OFFSET_LIMITS)
      );
    });
  }

  private handleMouseOut(e: React.MouseEvent) {
    if (this.isDragging && this.dragHandler!.isSignificantDrag) {
      this.dragHandler!.update({
        x: e.clientX,
        y: e.clientY
      });
      this.persistDrag(
        this.dragHandler!.calculateOffset(this.state.persistentOffset, GRID_OFFSET_LIMITS)
      );
    }

    this.isDragging = false;
    this.dragHandler = undefined;
  }

  private handleMouseUp(e: React.MouseEvent) {
    if (this.isDragging && this.dragHandler!.isSignificantDrag) {
      this.dragHandler!.update({
        x: e.clientX,
        y: e.clientY
      });
      this.persistDrag(
        this.dragHandler!.calculateOffset(this.state.persistentOffset, GRID_OFFSET_LIMITS)
      );
    } else {
      this.getTileClicked(e);
      // TODO: Handle real clicks
    }

    this.isDragging = false;
    this.dragHandler = undefined;
  }

  private persistDrag(offset: GameMapOffset) {
    this.setState({
      persistentOffset: {
        x: offset.x,
        y: offset.y
      }
    });
  }

  private getTileClicked(e: React.MouseEvent): GameMapTile {
    const rect = this.canvasRef.current!.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const xInCanvas = x - this.state.persistentOffset.x;
    const yInCanvas = y - this.state.persistentOffset.y;

    return {
      x: Math.floor(xInCanvas / GRID_TILE_X),
      y: Math.floor(yInCanvas / GRID_TILE_Y)
    };
  }
}
