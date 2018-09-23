import * as React from "react";
import { Resources } from "../../common/GameStateModels";
import { ResourceLine } from "./ResourceLine";

export interface IResouceListModel {
  resources: Resources;
}

export class ResourceList extends React.PureComponent<IResouceListModel, {}> {
  public render() {
    return (
      <ul className="resource_lines">
        {Array.from(this.props.resources.entries()).map(([resourceType, resource]) => {
          return <ResourceLine name={resourceType} value={resource} />;
        })}
      </ul>
    );
  }
}
