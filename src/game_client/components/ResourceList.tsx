import * as React from "react";
import { Resources } from "../../common/GameStateModels";

export interface IResouceListModel {
  resources: Resources;
}

export class ResourceList extends React.Component<IResouceListModel, {}> {
  public render() {
    return (
      <ul className="resource_lines">
        {Array.from(this.props.resources.entries()).map(
          ([resourceType, resource]) => {
            return (
              <li className="resource_line" key={resourceType}>
                <div className="resource_line_entry_name">{resourceType}:</div>
                <div className="resource_line_count">{resource.toString()}</div>
              </li>
            );
          }
        )}
      </ul>
    );
  }
}
