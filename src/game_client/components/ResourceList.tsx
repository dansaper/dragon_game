import * as React from "react";
import { ResourceTypes } from "../../common/Resources";
import { ResourceLine } from "./ResourceLine";

interface ResouceListProps {
  resources: Map<ResourceTypes, number>;
}

export class ResourceList extends React.Component<ResouceListProps, {}> {
  public render() {
    return (
      <ul className="resource_list">
        {Array.from(this.props.resources.entries())
          .sort()
          .map(([resourceType, resource]) => {
            return <ResourceLine key={resourceType} name={resourceType} value={resource} />;
          })}
      </ul>
    );
  }
}
