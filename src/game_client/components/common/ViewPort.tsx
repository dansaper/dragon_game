import * as React from "react";
import { DragHandler } from "./DragHandler";

interface Dimensions {
  width: number;
  height: number;
}

interface ViewPortProps {
  // Canvas dimensions
  visibleDimensions: Dimensions;

  // Actual content dimensions
  contentDimensions: Dimensions;

  // Multiplier to distance covered by drag
  dragRate?: number;
  // Number of pixels under which a drag does not count as significant
  dragThreshold?: number;

  children: React.ReactNode;
}

interface DraggableState {
  offset: { x: number; y: number };
}

interface ZoomableState {
  zoom: number;
}

function computeDragBoundaries(
  visibleSize: {
    width: number;
    height: number;
  },
  contentSize: {
    width: number;
    height: number;
  },
  zoom: number
) {
  const maxOffsetX = Math.trunc(visibleSize.width / 2);
  const maxOffsetY = Math.trunc(visibleSize.height / 2);
  const dragBoundaries = {
    x: {
      min: -(Math.max(visibleSize.width, contentSize.width * zoom) - maxOffsetX),
      max: maxOffsetX
    },
    y: {
      min: -(Math.max(visibleSize.height, contentSize.height * zoom) - maxOffsetY),
      max: maxOffsetY
    }
  };
  return dragBoundaries;
}

export class ViewPort extends React.Component<ViewPortProps, DraggableState & ZoomableState> {
  private dragHandler?: DragHandler;
  constructor(props: ViewPortProps) {
    super(props);

    this.state = {
      offset: {
        x: 0,
        y: 0
      },
      zoom: 1
    };

    this.startDrag = this.startDrag.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.endDrag = this.endDrag.bind(this);
  }

  public render() {
    return (
      <div
        className="viewport-container"
        onMouseDown={this.startDrag}
        onMouseMove={this.handleMouseMove}
        onMouseLeave={this.endDrag}
        onMouseUpCapture={this.endDrag}
      >
        <div
          className="viewport-wrapper"
          style={{
            left: this.state.offset.x,
            top: this.state.offset.y,
            transform: `scale(${this.state.zoom})`
          }}
        >
          {this.props.children}
        </div>
      </div>
    );
  }

  private startDrag(e: React.MouseEvent) {
    const dragBoundaries = computeDragBoundaries(
      this.props.visibleDimensions,
      this.props.contentDimensions,
      this.state.zoom
    );

    this.dragHandler = new DragHandler(
      {
        x: e.clientX,
        y: e.clientY
      },
      this.state.offset,
      dragBoundaries,
      this.props.dragRate,
      this.props.dragThreshold
    );
  }

  private handleMouseMove(e: React.MouseEvent) {
    if (this.dragHandler === undefined) {
      return;
    }
    this.dragHandler.update({ x: e.clientX, y: e.clientY });
    window.requestAnimationFrame(() => {
      if (this.dragHandler === undefined) {
        return;
      }
      this.setState({
        offset: this.dragHandler.getTotalOffset()
      });
    });
  }

  private endDrag(e: React.MouseEvent) {
    if (this.dragHandler === undefined) {
      return;
    }

    e.stopPropagation();
    this.dragHandler = undefined;
  }
}
