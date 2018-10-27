import * as React from "react";

export class ResourceLine extends React.Component<{ name: string; value: number }, {}> {
  public render() {
    return (
      <li className="resource_line">
        <div className="resource_line_entry_name">{this.props.name}</div>
        <div className="resource_line_count">{this.props.value.toString()}</div>
      </li>
    );
  }
}
