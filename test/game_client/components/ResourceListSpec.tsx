import { render } from "@testing-library/react";
import * as React from "react";
import { ResourceTypes } from "../../../src/common/Resources";
import { ResourceList } from "../../../src/game_client/components/ResourceList";
import * as Utils from "../../TestUtilities";

describe("Standalone Resource List", () => {
  it("Should not render unknown if no unknown resources", () => {
    const resources = new Map();
    resources.set(ResourceTypes.BABY_WYVERN_BONE, 23);
    const { getAllByTestId, getByTestId } = render(<ResourceList resources={resources} />);

    expect(getAllByTestId("resource-line").length).toBe(1);
    expect(getByTestId("resource-line")).not.toHaveTextContent(Utils.fuzzyMatch(/\?\?\?\?/));
  });

  it("Should render unknown item at the end of the list if unknown resource is present", () => {
    const resources = new Map();
    resources.set(ResourceTypes.UNKNOWN_RESOURCE, 0);
    resources.set(ResourceTypes.BABY_WYVERN_BONE, 23);
    const { getAllByTestId } = render(<ResourceList resources={resources} />);

    expect(getAllByTestId("resource-line").length).toBe(2);
    expect(getAllByTestId("resource-line")[1]).toHaveTextContent(Utils.fuzzyMatch(/\?\?\?\?/));
  });
});
