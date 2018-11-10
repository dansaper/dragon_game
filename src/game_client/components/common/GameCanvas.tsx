import * as React from "react";
import { DragHandler, DragOffset } from "./DragHandler";

interface GameCanvasProps {
  // Canvas dimensions
  canvasWidth: number;
  canvasHeight: number;

  // Actual content dimensions
  contentWidth: number;
  contentHeight: number;

  // Multiplier to distance covered by drag
  dragRate?: number;
  // Number of pixels under which a drag does not count as significant
  dragThreshold?: number;

  redrawCanvas: (ctx: CanvasRenderingContext2D) => void;
  onPointClicked?: (point: { x: number; y: number }) => void;
}

interface GameCanvasState {
  persistentOffset: { x: number; y: number };
}

export class GameCanvas extends React.Component<GameCanvasProps, GameCanvasState> {
  private canvasRef: React.RefObject<HTMLCanvasElement>;
  private get drawingContext(): CanvasRenderingContext2D {
    // this.canvasRef.current must be set by React before the context is accessed
    // We are also not supporting browsers where 2d context is not supported
    return this.canvasRef.current!.getContext("2d")!;
  }

  private dragHandler?: DragHandler;
  constructor(props: GameCanvasProps) {
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
        className="game-canvas"
        ref={this.canvasRef}
        width={this.props.canvasWidth.toString()}
        height={this.props.canvasHeight.toString()}
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
    this.redrawCanvas();
  }

  private redrawCanvas() {
    const ctx = this.drawingContext;
    ctx.setTransform(1, 0, 0, 1, 0, 0);

    ctx.clearRect(0, 0, this.props.canvasWidth, this.props.canvasHeight);
    ctx.beginPath();

    const offset =
      this.dragHandler !== undefined
        ? this.dragHandler.calculateOffset(this.state.persistentOffset)
        : this.state.persistentOffset;

    ctx.translate(offset.x, offset.y);
    this.props.redrawCanvas(ctx);
  }

  private handleMouseDown(e: React.MouseEvent) {
    const { canvasWidth, canvasHeight, contentWidth, contentHeight } = this.props;

    const maxOffsetX = Math.trunc(canvasWidth / 2);
    const maxOffsetY = Math.trunc(canvasHeight / 2);
    const dragBoundaries = {
      x: {
        min: -(Math.max(canvasWidth, contentWidth) - maxOffsetX),
        max: maxOffsetX
      },
      y: {
        min: -(Math.max(canvasHeight, contentHeight) - maxOffsetY),
        max: maxOffsetY
      }
    };

    this.dragHandler = new DragHandler(
      {
        x: e.clientX,
        y: e.clientY
      },
      dragBoundaries,
      this.props.dragRate,
      this.props.dragThreshold
    );
  }

  private handleMouseMove(e: React.MouseEvent) {
    if (this.dragHandler === undefined) {
      return;
    }
    this.dragHandler.update({
      x: e.clientX,
      y: e.clientY
    });

    window.requestAnimationFrame(() => {
      this.redrawCanvas();
    });
  }

  private handleMouseOut(e: React.MouseEvent) {
    if (this.dragHandler === undefined) {
      return;
    }

    if (this.dragHandler.isSignificantDrag) {
      this.dragHandler.update({
        x: e.clientX,
        y: e.clientY
      });
      this.persistDrag(this.dragHandler.calculateOffset(this.state.persistentOffset));
    }

    this.dragHandler = undefined;
  }

  private handleMouseUp(e: React.MouseEvent) {
    if (this.dragHandler !== undefined && this.dragHandler.isSignificantDrag) {
      this.dragHandler.update({
        x: e.clientX,
        y: e.clientY
      });
      this.persistDrag(this.dragHandler.calculateOffset(this.state.persistentOffset));
    } else {
      const point = this.getPointClicked(e);
      if (this.props.onPointClicked) {
        this.props.onPointClicked(point);
      }
    }

    this.dragHandler = undefined;
  }

  private persistDrag(offset: DragOffset) {
    this.setState({
      persistentOffset: {
        x: offset.x,
        y: offset.y
      }
    });
  }

  private getPointClicked(e: React.MouseEvent) {
    const rect = this.canvasRef.current!.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const xInCanvas = x - this.state.persistentOffset.x;
    const yInCanvas = y - this.state.persistentOffset.y;

    return {
      x: xInCanvas,
      y: yInCanvas
    };
  }
}
