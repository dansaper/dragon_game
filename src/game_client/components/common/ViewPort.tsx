import * as React from "react";
import { DragHandler } from "./DragHandler";
import { ZoomControl } from "./ZoomControl";

const ALLOWED_ZOOMS: ReadonlyArray<number> = [1 / 16, 1 / 8, 1 / 4, 1 / 2, 1, 1.5, 3, 6, 12];
const BASE_ZOOM_INDEX = 4;

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
  zoomIndex: number;
}

type ViewPortState = DraggableState & ZoomableState;

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

function getDragHandler(
  state: ViewPortState,
  props: ViewPortProps,
  startLocation: { x: number; y: number } = { x: 0, y: 0 }
) {
  const dragBoundaries = computeDragBoundaries(
    props.visibleDimensions,
    props.contentDimensions,
    ALLOWED_ZOOMS[state.zoomIndex]
  );

  return new DragHandler(
    {
      x: startLocation.x,
      y: startLocation.y
    },
    state.offset,
    dragBoundaries,
    props.dragRate,
    props.dragThreshold
  );
}

export class ViewPort extends React.Component<ViewPortProps, ViewPortState> {
  private dragHandler?: DragHandler;
  constructor(props: ViewPortProps) {
    super(props);

    this.state = {
      offset: {
        x: 0,
        y: 0
      },
      zoomIndex: BASE_ZOOM_INDEX
    };

    this.startDrag = this.startDrag.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.endDrag = this.endDrag.bind(this);
    this.zoomIn = this.zoomIn.bind(this);
    this.zoomOut = this.zoomOut.bind(this);
    this.clearTransforms = this.clearTransforms.bind(this);
  }

  public render() {
    const xTranslate = this.state.offset.x;
    const yTranslate = this.state.offset.y;
    const zoom = ALLOWED_ZOOMS[this.state.zoomIndex];
    const scaleTransform = `scale(${zoom})`;
    const translateTransform = `translate(${xTranslate}px, ${yTranslate}px)`;
    return (
      <div
        className="viewport-container"
        onMouseDown={this.startDrag}
        onMouseMove={this.handleMouseMove}
        onMouseLeave={this.endDrag}
        onMouseUpCapture={this.endDrag}
      >
        <ZoomControl zoomIn={this.zoomIn} zoomOut={this.zoomOut} clear={this.clearTransforms} />
        <div
          className="viewport-wrapper"
          data-testid="viewport-contents"
          style={{
            transform: `${translateTransform} ${scaleTransform}`,
            transformOrigin: "top left"
          }}
        >
          {this.props.children}
        </div>
      </div>
    );
  }

  private startDrag(e: React.MouseEvent) {
    this.dragHandler = getDragHandler(this.state, this.props, { x: e.clientX, y: e.clientY });
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

  private zoomIn() {
    this.setState((state, props) => {
      const newIndex = Math.min(ALLOWED_ZOOMS.length - 1, state.zoomIndex + 1);
      return {
        zoomIndex: newIndex,
        offset: getDragHandler({ ...state, zoomIndex: newIndex }, props).getTotalOffset()
      };
    });
  }

  private zoomOut() {
    this.setState((state, props) => {
      const newIndex = Math.max(0, state.zoomIndex - 1);
      return {
        zoomIndex: newIndex,
        offset: getDragHandler({ ...state, zoomIndex: newIndex }, props).getTotalOffset()
      };
    });
  }

  private clearTransforms() {
    this.setState({
      offset: {
        x: 0,
        y: 0
      },
      zoomIndex: BASE_ZOOM_INDEX
    });
  }
}
