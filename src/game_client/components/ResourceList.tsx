import * as React from "react";
import { Resources } from "../../common/GameState";
import { ResourceLine } from "./ResourceLine";

export interface ResouceListProps {
  resources: Resources;
}

export class ResourceList extends React.PureComponent<ResouceListProps, {}> {
  public render() {
    return (
      <ul className="resource_lines">
        {Array.from(this.props.resources.entries())
          .sort()
          .map(([resourceType, resource]) => {
            return <ResourceLine key={resourceType} name={resourceType} value={resource} />;
          })}
      </ul>
    );
  }
}
