import * as React from "react";
import { ResourceCategoriesMap, ResourceTypes } from "../../common/Resources";
import { ResourceList } from "./ResourceList";

interface ResoucePaneProps {
  resources: Map<ResourceTypes, number>;
}

export class ResourcePane extends React.Component<ResoucePaneProps, {}> {
  public render() {
    const resources = this.props.resources;
    return (
      <div className="resource_pane">
        <div className="resource_pane_title">Resources</div>
        <div className="resource_pane_categories">
          {Array.from(ResourceCategoriesMap.entries()).map(([category, resourceKeys]) => {
            const categoryResources = new Map(
              resourceKeys
                .filter(key => resources.has(key))
                .map(key => [key, resources.get(key)!] as [ResourceTypes, number])
            );
            if (categoryResources.size === 0) {
              return null;
            }
            return (
              <div className="resource_category_section" key={category}>
                <div className="resource_category_section_title">{category}</div>
                <div className="resource_category_section_list">
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
