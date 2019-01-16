import * as React from "react";

interface GameCanvasProps {
  // Canvas dimensions
  canvasWidth: number;
  canvasHeight: number;

  redrawCanvas: (ctx: CanvasRenderingContext2D) => void;
  onPointClicked?: (point: { x: number; y: number }) => void;
}

export class GameCanvas extends React.Component<GameCanvasProps, {}> {
  private canvasRef: React.RefObject<HTMLCanvasElement>;
  private get drawingContext(): CanvasRenderingContext2D {
    // this.canvasRef.current must be set by React before the context is accessed
    // We are also not supporting browsers where 2d context is not supported
    return this.canvasRef.current!.getContext("2d")!;
  }

  constructor(props: GameCanvasProps) {
    super(props);

    this.canvasRef = React.createRef<HTMLCanvasElement>();

    this.onMouseUp = this.onMouseUp.bind(this);
  }

  public render() {
    return (
      <canvas
        className="game-canvas"
        ref={this.canvasRef}
        width={this.props.canvasWidth.toString()}
        height={this.props.canvasHeight.toString()}
        onMouseUp={this.onMouseUp}
      >
        Cannot render canvas
      </canvas>
    );
  }

  public componentDidMount() {
    this.redrawCanvas();
  }

  public componentDidUpdate() {
    this.redrawCanvas();
  }

  private redrawCanvas() {
    const ctx = this.drawingContext;
    ctx.setTransform(1, 0, 0, 1, 0, 0);

    ctx.clearRect(0, 0, this.props.canvasWidth, this.props.canvasHeight);
    ctx.beginPath();

    this.props.redrawCanvas(ctx);
  }

  // Use mouseUp so we fire before any click handlers (e.g Draggable ending siginficant drag)
  private onMouseUp(e: React.MouseEvent) {
    const point = this.getPointClicked(e);
    if (this.props.onPointClicked) {
      this.props.onPointClicked(point);
    }
  }

  private getPointClicked(e: React.MouseEvent) {
    const rect = this.canvasRef.current!.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  }
}
