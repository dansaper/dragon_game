interface DragPoint {
  x: number;
  y: number;
}

interface DragOffset {
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
  private isSignificantDrag: boolean = false;

  private readonly dragRate: number;
  private readonly dragThreshold: number;
  private readonly startLocation: DragPoint;
  private readonly initialOffset: DragOffset;
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
    initialOffset: DragOffset,
    dragBoundries: DragBoundaries,
    dragRate = 1,
    dragThreshold = 5
  ) {
    this.startLocation = this.currentLocation = startLocation;
    this.initialOffset = initialOffset;
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

  public getTotalOffset(): DragOffset {
    if (!this.isSignificantDrag) {
      return this.limitDragOffsetToBoundaries(this.initialOffset);
    }

    const offset = this.currentOffset;
    const combinedOffset = {
      x: this.initialOffset.x + offset.x,
      y: this.initialOffset.y + offset.y
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

// TODO - ADD TESTS FOR THIS
export function computeDragBoundaries(
  visibleSize: {
    width: number;
    height: number;
  },
  contentSize: {
    width: number;
    height: number;
  }
): DragBoundaries {
  // Calculations:
  // Typically:
  //  Wv (width of visible)
  // |----------|
  //  Wc (width of content)
  // |---------------------|
  // Min:
  //            |----------|
  // |---------------| (Offset by -Wc + wv/2)
  // Max:
  // |----------|
  //       |-----------------------| (Offset by wv/2)
  //
  // When zoomed far out
  //  Wv (width of visible)
  // |----------|
  //  Wc (width of content)
  // |-| (Offset by 0)
  // Min:
  // |----------|
  // |-|
  // Max:
  // |----------|
  //          |-| (Offset by wv/2 + (wv/2 - wc))
  //
  // Max:
  //  Move half of visible, and add enough so that there is no whitespace at far edge
  const maxOffsetX = Math.trunc(visibleSize.width / 2);
  const maxOffsetY = Math.trunc(visibleSize.height / 2);
  const dragBoundaries = {
    x: {
      min: Math.min(-contentSize.width + maxOffsetX, 0),
      max: maxOffsetX + Math.max(0, maxOffsetX - contentSize.width)
    },
    y: {
      min: Math.min(-contentSize.height + maxOffsetY, 0),
      max: maxOffsetY + Math.max(0, maxOffsetY - contentSize.height)
    }
  };
  return dragBoundaries;
}
