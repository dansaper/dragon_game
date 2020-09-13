import { fireEvent, render, within } from "@testing-library/react";
import * as React from "react";
import { ViewPort } from "../../../../src/game_client/components/common/ViewPort";

describe("ViewPort", () => {
  const renderViewport = (
    dimensions = {
      width: 10,
      height: 10,
    },
    dragRate?: number
  ) => {
    return render(
      <ViewPort visibleDimensions={dimensions} contentDimensions={dimensions} dragRate={dragRate}>
        <div>
          <span>FooBar</span>
        </div>
      </ViewPort>
    );
  };

  it("Should render the contents", () => {
    const { getByText } = renderViewport();

    expect(getByText("FooBar")).toBeVisible();
  });

  it("Should render a zoom controller", () => {
    const { getByTestId } = renderViewport();
    expect(getByTestId("zoom-control")).toBeVisible();
    expect(getByTestId("viewport-contents")).toHaveStyle("transform: translate(0px, 0px) scale(1)");
  });

  describe("Zoom", () => {
    it("Should zoom the map in and out using the zoom buttons, up to max values", () => {
      const viewport = renderViewport();
      const zoomControl = viewport.getByTestId("zoom-control");

      // 4 Levels of zoom
      fireEvent.click(within(zoomControl).getByTestId("zoom-in"));
      expect(viewport.getByTestId("viewport-contents")).toHaveStyle(
        "transform: translate(-2.5px, -2.5px) scale(1.5)"
      );
      fireEvent.click(within(zoomControl).getByTestId("zoom-in"));
      expect(viewport.getByTestId("viewport-contents")).toHaveStyle(
        "transform: translate(-10px, -10px) scale(3)"
      );
      fireEvent.click(within(zoomControl).getByTestId("zoom-in"));
      expect(viewport.getByTestId("viewport-contents")).toHaveStyle(
        "transform: translate(-25px, -25px) scale(6)"
      );
      fireEvent.click(within(zoomControl).getByTestId("zoom-in"));
      expect(viewport.getByTestId("viewport-contents")).toHaveStyle(
        "transform: translate(-55px, -55px) scale(12)"
      );
      // Undo zoom in
      fireEvent.click(within(zoomControl).getByTestId("zoom-out"));
      fireEvent.click(within(zoomControl).getByTestId("zoom-out"));
      fireEvent.click(within(zoomControl).getByTestId("zoom-out"));
      fireEvent.click(within(zoomControl).getByTestId("zoom-out"));

      expect(viewport.getByTestId("viewport-contents")).toHaveStyle(
        "transform: translate(0px, 0px) scale(1)"
      );

      fireEvent.click(within(zoomControl).getByTestId("zoom-out"));
      expect(viewport.getByTestId("viewport-contents")).toHaveStyle(
        "transform: translate(2.5px, 2.5px) scale(0.5)"
      );
      fireEvent.click(within(zoomControl).getByTestId("zoom-out"));
      expect(viewport.getByTestId("viewport-contents")).toHaveStyle(
        "transform: translate(3.75px, 3.75px) scale(0.25)"
      );
      fireEvent.click(within(zoomControl).getByTestId("zoom-out"));
      expect(viewport.getByTestId("viewport-contents")).toHaveStyle(
        "transform: translate(4.375px, 4.375px) scale(0.125)"
      );
      fireEvent.click(within(zoomControl).getByTestId("zoom-out"));
      expect(viewport.getByTestId("viewport-contents")).toHaveStyle(
        "transform: translate(4.6875px, 4.6875px) scale(0.0625)"
      );

      // Undo zoom out
      fireEvent.click(within(zoomControl).getByTestId("zoom-in"));
      fireEvent.click(within(zoomControl).getByTestId("zoom-in"));
      fireEvent.click(within(zoomControl).getByTestId("zoom-in"));
      fireEvent.click(within(zoomControl).getByTestId("zoom-in"));

      expect(viewport.getByTestId("viewport-contents")).toHaveStyle(
        "transform: translate(0px, 0px) scale(1)"
      );
    });

    it("Should clear zoom when clicking clear", () => {
      const viewport = renderViewport();
      const zoomControl = viewport.getByTestId("zoom-control");
      fireEvent.click(within(zoomControl).getByTestId("zoom-in"));
      expect(viewport.getByTestId("viewport-contents")).not.toHaveStyle(
        "transform: translate(0px, 0px) scale(1)"
      );
      fireEvent.click(within(zoomControl).getByTestId("zoom-clear"));
      expect(viewport.getByTestId("viewport-contents")).toHaveStyle(
        "transform: translate(0px, 0px) scale(1)"
      );
    });

    it("Should not allow zoom in or out beyond limit", () => {
      const viewport = renderViewport();
      const zoomControl = viewport.getByTestId("zoom-control");

      // 4 is zoom in limit
      fireEvent.click(within(zoomControl).getByTestId("zoom-in"));
      fireEvent.click(within(zoomControl).getByTestId("zoom-in"));
      fireEvent.click(within(zoomControl).getByTestId("zoom-in"));
      fireEvent.click(within(zoomControl).getByTestId("zoom-in"));
      expect(viewport.getByTestId("viewport-contents")).toHaveStyle(
        "transform: translate(-55px, -55px) scale(12)"
      );
      fireEvent.click(within(zoomControl).getByTestId("zoom-in"));
      expect(viewport.getByTestId("viewport-contents")).toHaveStyle(
        "transform: translate(-55px, -55px) scale(12)"
      );

      // Clear zoom
      fireEvent.click(within(zoomControl).getByTestId("zoom-clear"));

      // 4 is zoom out limit
      fireEvent.click(within(zoomControl).getByTestId("zoom-out"));
      fireEvent.click(within(zoomControl).getByTestId("zoom-out"));
      fireEvent.click(within(zoomControl).getByTestId("zoom-out"));
      fireEvent.click(within(zoomControl).getByTestId("zoom-out"));
      expect(viewport.getByTestId("viewport-contents")).toHaveStyle(
        "transform: translate(4.6875px, 4.6875px) scale(0.0625)"
      );

      fireEvent.click(within(zoomControl).getByTestId("zoom-out"));
      expect(viewport.getByTestId("viewport-contents")).toHaveStyle(
        "transform: translate(4.6875px, 4.6875px) scale(0.0625)"
      );
    });
  });

  describe("Drag", () => {
    it("Should drag the container", () => {
      const { getByTestId } = renderViewport({ width: 100, height: 100 }, 3);
      fireEvent.mouseDown(getByTestId("viewport-contents"), { clientX: 2, clientY: 3 });
      // Drag 6 pixels down and 6 right
      fireEvent.mouseMove(getByTestId("viewport-contents"), { clientX: 8, clientY: 3 });
      fireEvent.mouseMove(getByTestId("viewport-contents"), { clientX: 8, clientY: 9 });

      expect(getByTestId("viewport-contents")).toHaveStyle(
        "transform: translate(18px, 18px) scale(1)"
      );

      // Drag up 7 pixels
      fireEvent.mouseMove(getByTestId("viewport-contents"), { clientX: 1, clientY: 9 });
      fireEvent.mouseUp(getByTestId("viewport-contents"), { clientX: 1, clientY: 9 });

      expect(getByTestId("viewport-contents")).toHaveStyle(
        "transform: translate(-3px, 18px) scale(1)"
      );
    });

    it("Should not drag beyond the edges", () => {
      const { getByTestId } = renderViewport({ width: 100, height: 100 }, 1);

      // Right
      fireEvent.mouseDown(getByTestId("viewport-contents"), { clientX: 3, clientY: 3 });
      fireEvent.mouseMove(getByTestId("viewport-contents"), { clientX: 2000, clientY: 3 });
      fireEvent.mouseUp(getByTestId("viewport-contents"), { clientX: 2000, clientY: 3 });

      expect(getByTestId("viewport-contents")).toHaveStyle(
        "transform: translate(50px, 0px) scale(1)"
      );

      // Down
      fireEvent.mouseDown(getByTestId("viewport-contents"), { clientX: 3, clientY: 3 });
      fireEvent.mouseMove(getByTestId("viewport-contents"), { clientX: 3, clientY: 2000 });
      fireEvent.mouseUp(getByTestId("viewport-contents"), { clientX: 3, clientY: 2000 });
      expect(getByTestId("viewport-contents")).toHaveStyle(
        "transform: translate(50px, 50px) scale(1)"
      );

      // Left
      fireEvent.mouseDown(getByTestId("viewport-contents"), { clientX: 3, clientY: 3 });
      fireEvent.mouseMove(getByTestId("viewport-contents"), { clientX: -2000, clientY: 3 });
      fireEvent.mouseUp(getByTestId("viewport-contents"), { clientX: -2000, clientY: 3 });

      expect(getByTestId("viewport-contents")).toHaveStyle(
        "transform: translate(-50px, 50px) scale(1)"
      );

      // Up
      fireEvent.mouseDown(getByTestId("viewport-contents"), { clientX: 3, clientY: 3 });
      fireEvent.mouseMove(getByTestId("viewport-contents"), { clientX: 3, clientY: -2000 });
      fireEvent.mouseUp(getByTestId("viewport-contents"), { clientX: 3, clientY: -2000 });
      expect(getByTestId("viewport-contents")).toHaveStyle(
        "transform: translate(-50px, -50px) scale(1)"
      );
    });
  });

  describe("Drag when zoomed", () => {
    it("Should drag the correct amount", () => {
      const viewport = renderViewport({ width: 100, height: 100 }, 3);
      const zoomControl = viewport.getByTestId("zoom-control");

      fireEvent.click(within(zoomControl).getByTestId("zoom-in"));
      fireEvent.mouseDown(viewport.getByTestId("viewport-contents"), { clientX: 3, clientY: 3 });
      fireEvent.mouseMove(viewport.getByTestId("viewport-contents"), { clientX: 14, clientY: 14 });
      fireEvent.mouseUp(viewport.getByTestId("viewport-contents"), { clientX: 14, clientY: 14 });

      expect(viewport.getByTestId("viewport-contents")).toHaveStyle(
        "transform: translate(8px, 8px) scale(1.5)"
      );
    });
  });
});
