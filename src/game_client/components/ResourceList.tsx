import * as React from "react";
import { ResourceCategoriesMap, ResourceTypes } from "../../common/Resources";
import { ResourceLine } from "./ResourceLine";

interface ResouceListProps {
  resources: Map<ResourceTypes, number>;
}

export class ResourceList extends React.Component<ResouceListProps, {}> {
  public render() {
    const orderedResources = ([] as ResourceTypes[])
      .concat(...ResourceCategoriesMap.values())
      .filter(resource => this.props.resources.has(resource));
    return (
      <ul className="resource_list">
        {orderedResources.map(resourceType => {
          return (
            <ResourceLine
              key={resourceType}
              name={resourceType}
              value={this.props.resources.get(resourceType)!}
            />
          );
        })}
      </ul>
    );
  }
}
