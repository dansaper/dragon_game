import * as React from "react";
import { fireEvent, render, within } from "react-testing-library";
import { ViewPort } from "../../../../src/game_client/components/common/ViewPort";

describe("ViewPort", () => {
  const renderViewport = () => {
    const dimensions = {
      width: 10,
      height: 10
    };
    return render(
      <ViewPort visibleDimensions={dimensions} contentDimensions={dimensions}>
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
  });

  it("Should zoom the map in and out using the zoom buttons", () => {
    const viewport = renderViewport();
    const zoomControl = viewport.getByTestId("zoom-control");
    fireEvent.click(within(zoomControl).getByTestId("zoom-in"));
    expect(viewport.getByTestId("viewport-contents")).toHaveStyle(
      "transform: translate(0px, 0px) scale(1.5)"
    );
    fireEvent.click(within(zoomControl).getByTestId("zoom-out"));
    expect(viewport.getByTestId("viewport-contents")).toHaveStyle(
      "transform: translate(0px, 0px) scale(1)"
    );
    fireEvent.click(within(zoomControl).getByTestId("zoom-out"));
    expect(viewport.getByTestId("viewport-contents")).toHaveStyle(
      "transform: translate(0px, 0px) scale(0.5)"
    );
  });

  it("Should clear zoom when clicking clear", () => {
    const viewport = renderViewport();
    const zoomControl = viewport.getByTestId("zoom-control");
    for (let i = 0; i < 10; ++i) {
      fireEvent.click(within(zoomControl).getByTestId("zoom-in"));
    }
    expect(viewport.getByTestId("viewport-contents")).not.toHaveStyle(
      "transform: translate(0px, 0px) scale(1)"
    );
    fireEvent.click(within(zoomControl).getByTestId("zoom-clear"));
    expect(viewport.getByTestId("viewport-contents")).toHaveStyle(
      "transform: translate(0px, 0px) scale(1)"
    );
  });
});
