import * as React from "react";

interface ZoomControlProps {
  zoomIn: () => void;
  zoomOut: () => void;
  clear: () => void;
}

export function ZoomControl(props: ZoomControlProps) {
  return (
    <div className="viewport-zoom-control" data-testid="zoom-control">
      <div
        className="viewport-zoom-in viewport-zoom-button"
        onClick={props.zoomIn}
        data-testid="zoom-in"
      />
      <div
        className="viewport-zoom-clear viewport-zoom-button"
        data-testid="zoom-clear"
        onClick={props.clear}
      />
      <div
        className="viewport-zoom-out viewport-zoom-button"
        onClick={props.zoomOut}
        data-testid="zoom-out"
      />
    </div>
  );
}
