import * as React from "react";
import { computeDragBoundaries, DragHandler } from "./DragHandler";

interface Dimensions {
  width: number;
  height: number;
}

interface DraggableProps {
  // Canvas dimensions
  visibleDimensions: Dimensions;

  // Actual content dimensions
  contentDimensions: Dimensions;

  // Multiplier to distance covered by drag
  dragRate?: number;
  // Number of pixels under which a drag does not count as significant
  dragThreshold?: number;

  setIsDragging?: (isDragging: boolean) => void;

  children: React.ReactNode;
}

interface DraggableState {
  offset: { x: number; y: number };
}

export class Draggable extends React.Component<DraggableProps, DraggableState> {
  private dragHandler?: DragHandler;
  constructor(props: DraggableProps) {
    super(props);

    this.state = {
      offset: {
        x: 0,
        y: 0
      }
    };

    this.startDrag = this.startDrag.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.endDrag = this.endDrag.bind(this);
  }

  public render() {
    return (
      <div
        className="draggable-container"
        onMouseDown={this.startDrag}
        onMouseMove={this.handleMouseMove}
        onMouseOut={this.endDrag}
        onMouseUp={this.endDrag}
      >
        <div
          className="draggable-wrapper"
          style={{ left: this.state.offset.x, top: this.state.offset.y }}
        >
          {this.props.children}
        </div>
      </div>
    );
  }

  private startDrag(e: React.MouseEvent) {
    const dragBoundaries = computeDragBoundaries(
      this.props.visibleDimensions,
      this.props.contentDimensions
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
    if (this.props.setIsDragging) {
      this.props.setIsDragging(this.dragHandler.isSignificantDrag);
    }
    window.requestAnimationFrame(() => {
      if (this.dragHandler === undefined) {
        return;
      }
      this.setState({
        offset: this.dragHandler.getTotalOffset()
      });
    });
  }

  private endDrag() {
    if (this.dragHandler === undefined) {
      return;
    }

    if (this.props.setIsDragging) {
      this.props.setIsDragging(false);
    }
    this.dragHandler = undefined;
  }
}
