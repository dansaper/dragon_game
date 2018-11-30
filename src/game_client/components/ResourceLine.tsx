import * as React from "react";

export class ResourceLine extends React.Component<{ name: string; value: number | string }, {}> {
  public render() {
    return (
      <li className="resource-line">
        <div className="resource-line-entry-name">{this.props.name}</div>
        <div className="resource-line-count">{this.props.value.toString()}</div>
      </li>
    );
  }
}
