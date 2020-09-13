import * as React from "react";
import { computeDragBoundaries, DragHandler } from "./DragHandler";
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

function getDragHandler(
  state: ViewPortState,
  props: ViewPortProps,
  startLocation: { x: number; y: number } = { x: 0, y: 0 }
) {
  const dragBoundaries = computeDragBoundaries(props.visibleDimensions, props.contentDimensions);

  const zoom = ALLOWED_ZOOMS[state.zoomIndex];

  return new DragHandler(
    {
      x: startLocation.x,
      y: startLocation.y,
    },
    state.offset,
    dragBoundaries,
    props.dragRate ? props.dragRate / (zoom * zoom) : undefined, // Drag faster when zoomed out
    props.dragThreshold ? props.dragThreshold * zoom : undefined // Adjust threshold so it doesn't take zoom into account
  );
}

export class ViewPort extends React.Component<ViewPortProps, ViewPortState> {
  private dragHandler?: DragHandler;
  private containerRef: React.RefObject<HTMLDivElement>;
  constructor(props: ViewPortProps) {
    super(props);

    this.state = {
      offset: {
        x: 0,
        y: 0,
      },
      zoomIndex: BASE_ZOOM_INDEX,
    };

    this.containerRef = React.createRef();

    this.startDrag = this.startDrag.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.endDrag = this.endDrag.bind(this);
    this.zoomIn = this.zoomIn.bind(this);
    this.zoomOut = this.zoomOut.bind(this);
    this.handleWheel = this.handleWheel.bind(this);
    this.clearTransforms = this.clearTransforms.bind(this);
  }

  // Workaround React and Chrome not supporting wheel event preventDefault
  public componentDidMount() {
    if (this.containerRef.current) {
      this.containerRef.current.addEventListener("wheel", this.handleWheel, { passive: true });
    }
  }

  public componentWillUnmount() {
    if (this.containerRef.current) {
      this.containerRef.current.removeEventListener("wheel", this.handleWheel);
    }
  }

  public render() {
    const zoom = ALLOWED_ZOOMS[this.state.zoomIndex];
    const scaleTransform = `scale(${zoom})`;

    // We want the map's centerpoint to stay at the center when we zoom
    //  Figured this out using some kind of matrix math I don't remember
    const xTranslate =
      this.state.offset.x * zoom + ((1 - zoom) * this.props.visibleDimensions.width) / 2;
    const yTranslate =
      this.state.offset.y * zoom + ((1 - zoom) * this.props.visibleDimensions.height) / 2;
    const translateTransform = `translate(${xTranslate}px, ${yTranslate}px)`;
    return (
      <div
        className="viewport-container"
        ref={this.containerRef}
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
            transformOrigin: "top left",
          }}
        >
          {this.props.children}
        </div>
        {this.getDebugElement()}
      </div>
    );
  }

  private getDebugElement() {
    return (
      <div className="viewport-debug">
        <svg
          viewBox={`0 0 ${this.props.visibleDimensions.width} ${this.props.visibleDimensions.height}`}
        >
          <g stroke="black">
            <line
              x1={this.props.visibleDimensions.width / 2}
              y1={0}
              x2={this.props.visibleDimensions.width / 2}
              y2={this.props.visibleDimensions.height}
              stroke="green"
            ></line>
            <line
              x1={0}
              y1={this.props.visibleDimensions.height / 2}
              x2={this.props.visibleDimensions.width}
              y2={this.props.visibleDimensions.height / 2}
              stroke="green"
            ></line>
          </g>
        </svg>{" "}
      </div>
    );
  }

  private getAdjustedEventPosition(e: React.MouseEvent): { x: number; y: number } {
    const zoom = ALLOWED_ZOOMS[this.state.zoomIndex];
    return {
      x: e.clientX * zoom,
      y: e.clientY * zoom,
    };
  }

  private startDrag(e: React.MouseEvent) {
    this.dragHandler = getDragHandler(this.state, this.props, this.getAdjustedEventPosition(e));
  }

  private handleMouseMove(e: React.MouseEvent) {
    if (this.dragHandler === undefined) {
      return;
    }
    this.dragHandler.update(this.getAdjustedEventPosition(e));
    window.requestAnimationFrame(() => {
      if (this.dragHandler === undefined) {
        return;
      }
      this.setState({
        offset: this.dragHandler.getTotalOffset(),
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
        offset: getDragHandler({ ...state, zoomIndex: newIndex }, props).getTotalOffset(),
      };
    });
  }

  private zoomOut() {
    this.setState((state, props) => {
      const newIndex = Math.max(0, state.zoomIndex - 1);
      return {
        zoomIndex: newIndex,
        offset: getDragHandler({ ...state, zoomIndex: newIndex }, props).getTotalOffset(),
      };
    });
  }

  private handleWheel(event: WheelEvent) {
    if (event.deltaY < 0) {
      this.zoomIn();
    } else {
      this.zoomOut();
    }
  }

  private clearTransforms() {
    this.setState({
      offset: {
        x: 0,
        y: 0,
      },
      zoomIndex: BASE_ZOOM_INDEX,
    });
  }
}
