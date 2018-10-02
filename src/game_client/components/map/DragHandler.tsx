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
  private dragRate: number;
  private dragThreshold: number;

  private readonly startLocation: Point;
  private currentLocation: Point;
  private get currentOffset(): DragOffset {
    return {
      x: Math.trunc(this.dragRate * (this.currentLocation.x - this.startLocation.x)),
      y: Math.trunc(this.dragRate * (this.currentLocation.y - this.startLocation.y))
    };
  }

  constructor(startLocation: Point, dragRate = 1, dragThreshold = 5) {
    this.startLocation = this.currentLocation = startLocation;
    this.dragRate = dragRate;
    this.dragThreshold = dragThreshold;
  }

  public update(draggedTo: Point) {
    this.currentLocation = draggedTo;

    const offset = this.currentOffset;
    if (
      Math.abs(offset.x) > this.dragThreshold * this.dragRate ||
      Math.abs(offset.y) > this.dragThreshold * this.dragRate
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
