interface DragPoint {
  x: number;
  y: number;
}

export interface DragOffset {
  x: number;
  y: number;
}

interface DragBoundary {
  min: number;
  max: number;
}

interface DragBoundaries {
  x: DragBoundary;
  y: DragBoundary;
}

export class DragHandler {
  public isSignificantDrag: boolean = false;

  private readonly dragRate: number;
  private readonly dragThreshold: number;
  private readonly startLocation: DragPoint;
  private readonly dragBoundaries: DragBoundaries;

  private currentLocation: DragPoint;
  private get currentOffset(): DragOffset {
    return {
      x: Math.trunc(this.dragRate * (this.currentLocation.x - this.startLocation.x)),
      y: Math.trunc(this.dragRate * (this.currentLocation.y - this.startLocation.y))
    };
  }

  constructor(
    startLocation: DragPoint,
    dragBoundries: DragBoundaries,
    dragRate = 1,
    dragThreshold = 5
  ) {
    this.startLocation = this.currentLocation = startLocation;
    this.dragBoundaries = dragBoundries;
    this.dragRate = dragRate;
    this.dragThreshold = dragThreshold;
  }

  public update(draggedTo: DragPoint) {
    this.currentLocation = draggedTo;

    const offset = this.currentOffset;
    if (
      Math.abs(offset.x) > this.dragThreshold * this.dragRate ||
      Math.abs(offset.y) > this.dragThreshold * this.dragRate
    ) {
      this.isSignificantDrag = true;
    }
  }

  public calculateOffset(externalOffset: DragOffset): DragOffset {
    if (!this.isSignificantDrag) {
      return externalOffset;
    }

    const offset = this.currentOffset;
    const combinedOffset = {
      x: externalOffset.x + offset.x,
      y: externalOffset.y + offset.y
    };

    return this.limitDragOffsetToBoundaries(combinedOffset);
  }

  private limitDragOffsetToBoundaries(offset: DragOffset) {
    return {
      x: Math.min(Math.max(offset.x, this.dragBoundaries.x.min), this.dragBoundaries.x.max),
      y: Math.min(Math.max(offset.y, this.dragBoundaries.y.min), this.dragBoundaries.y.max)
    };
  }
}
