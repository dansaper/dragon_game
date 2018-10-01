// Number of pixels under which a drag does not count as significant
const DRAG_THRESHOLD = 5;

// Multiplier to distance covered by drag
const DRAG_RATE = 1.5;

interface Point {
  x: number;
  y: number;
}

interface DragOffset {
  x: number;
  y: number;
}

interface Boundary {
  min: number;
  max: number;
}

interface DragBoundries {
  x: Boundary;
  y: Boundary;
}

export class DragHandler {
  public isSignificantDrag: boolean = false;

  private readonly startLocation: Point;
  private currentLocation: Point;
  private get currentOffset(): DragOffset {
    return {
      x: Math.trunc(DRAG_RATE * (this.startLocation.x - this.currentLocation.x)),
      y: Math.trunc(DRAG_RATE * (this.startLocation.y - this.currentLocation.y))
    };
  }

  constructor(startLocation: Point) {
    this.startLocation = this.currentLocation = startLocation;
  }

  public update(draggedTo: Point) {
    this.currentLocation = draggedTo;

    const offset = this.currentOffset;
    if (
      Math.abs(offset.x) > DRAG_THRESHOLD * DRAG_RATE ||
      Math.abs(offset.y) > DRAG_THRESHOLD * DRAG_RATE
    ) {
      this.isSignificantDrag = true;
    }
  }

  public calculateOffset(externalOffset: DragOffset, boundaries: DragBoundries): DragOffset {
    if (!this.isSignificantDrag) {
      return externalOffset;
    }

    const offset = this.currentOffset;
    const combinedOffset = {
      x: externalOffset.x + offset.x,
      y: externalOffset.y + offset.y
    };

    return this.limitDragOffsetToBoundaries(combinedOffset, boundaries);
  }

  private limitDragOffsetToBoundaries(offset: DragOffset, boundaries: DragBoundries) {
    return {
      x: Math.min(Math.max(offset.x, boundaries.x.min), boundaries.x.max),
      y: Math.min(Math.max(offset.y, boundaries.y.min), boundaries.y.max)
    };
  }
}
