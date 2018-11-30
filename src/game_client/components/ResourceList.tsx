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

    const resourceLines = orderedResources.map(resourceType => {
      return (
        <ResourceLine
          key={resourceType}
          name={resourceType}
          value={this.props.resources.get(resourceType)!}
        />
      );
    });
    return (
      <ul className="resource-list">
        {resourceLines}
        {this.props.resources.has(ResourceTypes.UNKNOWN_RESOURCE) ? (
          <ResourceLine key={ResourceTypes.UNKNOWN_RESOURCE} name="????" value="????" />
        ) : null}
      </ul>
    );
  }
}
