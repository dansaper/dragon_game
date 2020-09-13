import * as React from "react";
import { ResourceCategoriesMap, ResourceTypes } from "../../common/Resources";
import { ResourceList } from "./ResourceList";

interface ResoucePaneProps {
  resources: Map<ResourceTypes, number>;
}

export class ResourcePane extends React.Component<ResoucePaneProps> {
  public render() {
    const resources = this.props.resources;
    return (
      <div className="resource-pane">
        <div className="resource-pane-title" data-testid="resource-pane-title">
          Resources
        </div>
        <div className="resource-pane-categories">
          {[...ResourceCategoriesMap.entries()].map(([category, resourceKeys]) => {
            const categoryResources = new Map(
              resourceKeys
                .filter((key) => resources.has(key))
                .map((key) => [key, resources.get(key)!] as [ResourceTypes, number])
            );
            if (categoryResources.size === 0) {
              return null;
            }
            return (
              <div
                className="resource-category-section"
                data-testid="resource-category-section"
                key={category}
              >
                <div
                  className="resource-category-section-title"
                  data-testid="resource-category-section-title"
                >
                  {category}
                </div>
                <div
                  className="resource-category-section-list"
                  data-testid="resource-category-section-list"
                >
                  <ResourceList resources={categoryResources} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
