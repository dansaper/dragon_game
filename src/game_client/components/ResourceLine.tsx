import * as React from "react";

interface ResourceLineProps {
  name: string;
  value: number | string;
}

export const ResourceLine: React.FunctionComponent<ResourceLineProps> = (props) => {
  return (
    <li className="resource-line" data-testid="resource-line">
      <div className="resource-line-entry-name">{props.name}</div>
      <div className="resource-line-count">{props.value.toString()}</div>
    </li>
  );
};
