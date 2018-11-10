import * as React from "react";
import { render } from "react-testing-library";
import { ResourceCategories, ResourceTypes } from "../../../src/common/Resources";
import { ResourcePane } from "../../../src/game_client/components/ResourcePane";

function fuzzyMatch(str: string): RegExp {
  return new RegExp(".*" + str + ".*");
}

describe("Resource Pane rendering", () => {
  it("Should render the title", () => {
    const resources = new Map();
    const { container } = render(<ResourcePane resources={resources} />);

    const title = container.querySelector(".resource_pane_title");
    expect(title).not.toEqual(null);
    expect(title!.textContent).not.toEqual("");
  });

  it("Should render no categories when no resources are present", () => {
    const resources = new Map();
    const { container } = render(<ResourcePane resources={resources} />);

    expect(container.querySelectorAll(".resource_category_section").length).toBe(0);
  });

  it("Should render only categories whose resources are present (even if 0) in correct order", () => {
    const resources = new Map();
    resources.set(ResourceTypes.BABY_WYVERN_BONE, 23);
    resources.set(ResourceTypes.TANNER, 0);
    const { container } = render(<ResourcePane resources={resources} />);
    const sections = container.querySelectorAll(".resource_category_section");

    expect(sections.length).toBe(2);
    expect(sections[0].querySelector(".resource_category_section_title")).toHaveTextContent(
      ResourceCategories.DRAGON_REMAINS
    );
    expect(sections[1].querySelector(".resource_category_section_title")).toHaveTextContent(
      ResourceCategories.WORKERS
    );
  });

  it("Should render multiple resources in a category in the correct order", () => {
    const resources = new Map();
    resources.set(ResourceTypes.BABY_WYVERN_HIDE, 0);
    resources.set(ResourceTypes.BABY_WYVERN_BONE, 23);
    const { container } = render(<ResourcePane resources={resources} />);
    const sections = container.querySelectorAll(".resource_category_section");

    expect(sections.length).toBe(1);
    const sectionLines = sections[0].querySelectorAll(".resource_line");
    expect(sectionLines.length).toBe(2);
    expect(sectionLines[0]).toHaveTextContent(fuzzyMatch(ResourceTypes.BABY_WYVERN_BONE));
    expect(sectionLines[0]).toHaveTextContent(fuzzyMatch("23"));
    expect(sectionLines[1]).toHaveTextContent(fuzzyMatch(ResourceTypes.BABY_WYVERN_HIDE));
    expect(sectionLines[1]).toHaveTextContent(fuzzyMatch("0"));
  });

  it("Should render all categories", () => {
    const resources = new Map<ResourceTypes, number>();
    resources.set(ResourceTypes.BABY_WYVERN_LEATHER, 2);
    resources.set(ResourceTypes.PLAINS_HUNTER, 432);
    resources.set(ResourceTypes.TANNER, 1);
    resources.set(ResourceTypes.BABY_WYVERN_HIDE, 0);

    const { container } = render(<ResourcePane resources={resources} />);
    const sections = container.querySelectorAll(".resource_category_section");

    expect(sections.length).toBe(4);
    const remainsSection = sections[0];
    expect(remainsSection.querySelector(".resource_category_section_title")).toHaveTextContent(
      ResourceCategories.DRAGON_REMAINS
    );
    const remainsLines = remainsSection.querySelectorAll(".resource_line");
    expect(remainsLines.length).toBe(1);
    expect(remainsLines[0]).toHaveTextContent(fuzzyMatch(ResourceTypes.BABY_WYVERN_HIDE));
    expect(remainsLines[0]).toHaveTextContent(fuzzyMatch("0"));

    const craftedSection = sections[1];
    expect(craftedSection.querySelector(".resource_category_section_title")).toHaveTextContent(
      ResourceCategories.CRAFTED
    );
    const craftedLines = craftedSection.querySelectorAll(".resource_line");
    expect(craftedLines.length).toBe(1);
    expect(craftedLines[0]).toHaveTextContent(fuzzyMatch(ResourceTypes.BABY_WYVERN_LEATHER));
    expect(craftedLines[0]).toHaveTextContent(fuzzyMatch("2"));

    const huntersSection = sections[2];
    expect(huntersSection.querySelector(".resource_category_section_title")).toHaveTextContent(
      ResourceCategories.HUNTERS
    );
    const hunterLines = huntersSection.querySelectorAll(".resource_line");
    expect(hunterLines.length).toBe(1);
    expect(hunterLines[0]).toHaveTextContent(fuzzyMatch(ResourceTypes.PLAINS_HUNTER));
    expect(hunterLines[0]).toHaveTextContent(fuzzyMatch("432"));

    const workersSection = sections[3];
    expect(workersSection.querySelector(".resource_category_section_title")).toHaveTextContent(
      ResourceCategories.WORKERS
    );
    const workerLines = workersSection.querySelectorAll(".resource_line");
    expect(workerLines.length).toBe(1);
    expect(workerLines[0]).toHaveTextContent(fuzzyMatch(ResourceTypes.TANNER));
    expect(workerLines[0]).toHaveTextContent(fuzzyMatch("1"));
  });
});
