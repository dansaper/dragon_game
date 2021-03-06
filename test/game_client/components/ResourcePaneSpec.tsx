import { render, within } from "@testing-library/react";
import * as React from "react";
import { ResourceCategories, ResourceTypes } from "../../../src/common/Resources";
import { ResourcePane } from "../../../src/game_client/components/ResourcePane";
import * as Utils from "../../TestUtilities";

describe("Resource Pane rendering", () => {
  it("Should render the title", () => {
    const resources = new Map();
    const { getByTestId } = render(<ResourcePane resources={resources} />);

    const title = getByTestId("resource-pane-title");
    expect(title).toHaveTextContent(/.+/);
  });

  it("Should render no categories when no resources are present", () => {
    const resources = new Map();
    const { queryAllByTestId } = render(<ResourcePane resources={resources} />);

    expect(queryAllByTestId("resource-category-section-title").length).toBe(0);
  });

  it("Should render only categories whose resources are present (even if 0) in correct order", () => {
    const resources = new Map();
    resources.set(ResourceTypes.BABY_WYVERN_BONE, 23);
    resources.set(ResourceTypes.TANNER, 0);
    const { queryAllByTestId } = render(<ResourcePane resources={resources} />);
    const sections = queryAllByTestId("resource-category-section");

    expect(sections.length).toBe(2);
    expect(within(sections[0]).getByTestId("resource-category-section-title")).toHaveTextContent(
      ResourceCategories.DRAGON_REMAINS
    );
    expect(within(sections[1]).getByTestId("resource-category-section-title")).toHaveTextContent(
      ResourceCategories.WORKERS
    );
  });

  it("Should render multiple resources in a category in the correct order", () => {
    const resources = new Map();
    resources.set(ResourceTypes.BABY_WYVERN_HIDE, 0);
    resources.set(ResourceTypes.BABY_WYVERN_BONE, 23);
    const { queryAllByTestId } = render(<ResourcePane resources={resources} />);
    const sections = queryAllByTestId("resource-category-section");

    expect(sections.length).toBe(1);
    const sectionLines = within(sections[0]).queryAllByTestId("resource-line");
    expect(sectionLines.length).toBe(2);
    expect(sectionLines[0]).toHaveTextContent(Utils.fuzzyMatch(ResourceTypes.BABY_WYVERN_BONE));
    expect(sectionLines[0]).toHaveTextContent(Utils.fuzzyMatch("23"));
    expect(sectionLines[1]).toHaveTextContent(Utils.fuzzyMatch(ResourceTypes.BABY_WYVERN_HIDE));
    expect(sectionLines[1]).toHaveTextContent(Utils.fuzzyMatch("0"));
  });

  it("Should render all categories", () => {
    const resources = new Map<ResourceTypes, number>();
    resources.set(ResourceTypes.BABY_WYVERN_LEATHER, 2);
    resources.set(ResourceTypes.PLAINS_HUNTER, 432);
    resources.set(ResourceTypes.TANNER, 1);
    resources.set(ResourceTypes.BABY_WYVERN_HIDE, 0);

    const { queryAllByTestId } = render(<ResourcePane resources={resources} />);
    const sections = queryAllByTestId("resource-category-section");

    expect(sections.length).toBe(4);
    const remainsSection = sections[0];
    expect(
      within(remainsSection).queryByTestId("resource-category-section-title")
    ).toHaveTextContent(ResourceCategories.DRAGON_REMAINS);
    const remainsLines = within(remainsSection).queryAllByTestId("resource-line");
    expect(remainsLines.length).toBe(1);
    expect(remainsLines[0]).toHaveTextContent(Utils.fuzzyMatch(ResourceTypes.BABY_WYVERN_HIDE));
    expect(remainsLines[0]).toHaveTextContent(Utils.fuzzyMatch("0"));

    const craftedSection = sections[1];
    expect(
      within(craftedSection).queryByTestId("resource-category-section-title")
    ).toHaveTextContent(ResourceCategories.CRAFTED);
    const craftedLines = within(craftedSection).queryAllByTestId("resource-line");
    expect(craftedLines.length).toBe(1);
    expect(craftedLines[0]).toHaveTextContent(Utils.fuzzyMatch(ResourceTypes.BABY_WYVERN_LEATHER));
    expect(craftedLines[0]).toHaveTextContent(Utils.fuzzyMatch("2"));

    const huntersSection = sections[2];
    expect(
      within(huntersSection).queryByTestId("resource-category-section-title")
    ).toHaveTextContent(ResourceCategories.HUNTERS);
    const hunterLines = within(huntersSection).queryAllByTestId("resource-line");
    expect(hunterLines.length).toBe(1);
    expect(hunterLines[0]).toHaveTextContent(Utils.fuzzyMatch(ResourceTypes.PLAINS_HUNTER));
    expect(hunterLines[0]).toHaveTextContent(Utils.fuzzyMatch("432"));

    const workersSection = sections[3];
    expect(
      within(workersSection).queryByTestId("resource-category-section-title")
    ).toHaveTextContent(ResourceCategories.WORKERS);
    const workerLines = within(workersSection).queryAllByTestId("resource-line");
    expect(workerLines.length).toBe(1);
    expect(workerLines[0]).toHaveTextContent(Utils.fuzzyMatch(ResourceTypes.TANNER));
    expect(workerLines[0]).toHaveTextContent(Utils.fuzzyMatch("1"));
  });
});
