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
}

const getDragHandler = (
  props: ViewPortProps,
  offset: { x: number; y: number },
  zoomIndex: number,
  startLocation: { x: number; y: number } = { x: 0, y: 0 }
) => {
  const dragBoundaries = computeDragBoundaries(props.visibleDimensions, props.contentDimensions);

  const zoom = ALLOWED_ZOOMS[zoomIndex];

  return new DragHandler(
    {
      x: startLocation.x,
      y: startLocation.y,
    },
    offset,
    dragBoundaries,
    props.dragRate ? props.dragRate / (zoom * zoom) : undefined, // Drag faster when zoomed out
    props.dragThreshold ? props.dragThreshold * zoom : undefined // Adjust threshold so it doesn't take zoom into account
  );
};

const getAdjustedEventPosition = (
  e: React.MouseEvent,
  zoomIndex: number
): { x: number; y: number } => {
  const zoom = ALLOWED_ZOOMS[zoomIndex];
  return {
    x: e.clientX * zoom,
    y: e.clientY * zoom,
  };
};

const getDebugElement = (visibleDimensions: Dimensions) => {
  return (
    <div className="viewport-debug">
      <svg viewBox={`0 0 ${visibleDimensions.width} ${visibleDimensions.height}`}>
        <g stroke="black">
          <line
            x1={visibleDimensions.width / 2}
            y1={0}
            x2={visibleDimensions.width / 2}
            y2={visibleDimensions.height}
            stroke="green"
          ></line>
          <line
            x1={0}
            y1={visibleDimensions.height / 2}
            x2={visibleDimensions.width}
            y2={visibleDimensions.height / 2}
            stroke="green"
          ></line>
        </g>
      </svg>{" "}
    </div>
  );
};

interface DraggableState {
  offset: { x: number; y: number };
}

interface ZoomableState {
  zoomIndex: number;
}

type ViewPortState = DraggableState & ZoomableState;

type ZoomAction = {
  type: "zoomIn" | "zoomOut";
};
type OffsetAction = {
  type: "offset";
  newOffset: { x: number; y: number };
};
type ClearTransformAction = {
  type: "clearTransform";
};

type StateReducerActionTypes = ZoomAction | OffsetAction | ClearTransformAction;

const stateReducer = (
  props: ViewPortProps,
  state: ViewPortState,
  action: StateReducerActionTypes
): ViewPortState => {
  switch (action.type) {
    case "zoomIn": {
      const newIndex = Math.min(ALLOWED_ZOOMS.length - 1, state.zoomIndex + 1);
      return {
        ...state,
        offset: getDragHandler(props, state.offset, newIndex).getTotalOffset(),
        zoomIndex: newIndex,
      };
    }
    case "zoomOut": {
      const newIndex = Math.max(0, state.zoomIndex - 1);
      return {
        ...state,
        offset: getDragHandler(props, state.offset, newIndex).getTotalOffset(),
        zoomIndex: newIndex,
      };
    }
    case "offset": {
      return {
        ...state,
        offset: action.newOffset,
      };
    }
    case "clearTransform": {
      return {
        ...state,
        offset: {
          x: 0,
          y: 0,
        },
        zoomIndex: BASE_ZOOM_INDEX,
      };
    }
  }
};

export const ViewPort: React.FunctionComponent<ViewPortProps> = (props) => {
  const memoizedStateReducer = React.useCallback(
    (state: ViewPortState, action: StateReducerActionTypes) => stateReducer(props, state, action),
    [props]
  );
  const [{ offset, zoomIndex }, dispatch] = React.useReducer(memoizedStateReducer, {
    offset: {
      x: 0,
      y: 0,
    },
    zoomIndex: BASE_ZOOM_INDEX,
  });

  const containerRef = React.useRef<HTMLDivElement>(null);
  const dragHandler = React.useRef<DragHandler | undefined>();

  React.useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY < 0) {
        dispatch({
          type: "zoomIn",
        });
      } else {
        dispatch({
          type: "zoomOut",
        });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: true });
    }
    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel);
      }
    };
  }, []);

  const startDrag = (e: React.MouseEvent) => {
    dragHandler.current = getDragHandler(
      props,
      offset,
      zoomIndex,
      getAdjustedEventPosition(e, zoomIndex)
    );
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragHandler.current) {
      return;
    }
    dragHandler.current.update(getAdjustedEventPosition(e, zoomIndex));
    window.requestAnimationFrame(() => {
      if (!dragHandler.current) {
        return;
      }
      dispatch({
        type: "offset",
        newOffset: dragHandler.current.getTotalOffset(),
      });
    });
  };

  const endDrag = (e: React.MouseEvent) => {
    if (dragHandler.current) {
      e.stopPropagation();
      dragHandler.current = undefined;
    }
  };

  const zoom = ALLOWED_ZOOMS[zoomIndex];
  const scaleTransform = `scale(${zoom})`;

  // We want the map's centerpoint to stay at the center when we zoom
  //  Figured this out using some kind of matrix math I don't remember
  const xTranslate = offset.x * zoom + ((1 - zoom) * props.visibleDimensions.width) / 2;
  const yTranslate = offset.y * zoom + ((1 - zoom) * props.visibleDimensions.height) / 2;
  const translateTransform = `translate(${xTranslate}px, ${yTranslate}px)`;
  return (
    <div
      className="viewport-container"
      ref={containerRef}
      onMouseDown={startDrag}
      onMouseMove={handleMouseMove}
      onMouseLeave={endDrag}
      onMouseUpCapture={endDrag}
    >
      <ZoomControl
        zoomIn={() => dispatch({ type: "zoomIn" })}
        zoomOut={() => dispatch({ type: "zoomOut" })}
        clear={() => dispatch({ type: "clearTransform" })}
      />
      <div
        className="viewport-wrapper"
        data-testid="viewport-contents"
        style={{
          transform: `${translateTransform} ${scaleTransform}`,
          transformOrigin: "top left",
        }}
      >
        {props.children}
      </div>
      {getDebugElement(props.visibleDimensions)}
    </div>
  );
};
