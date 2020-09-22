import * as React from "react";
import { ResourceCategoriesMap, ResourceTypes } from "../../common/Resources";
import { ResourceLine } from "./ResourceLine";

interface ResouceListProps {
  resources: Map<ResourceTypes, number>;
}

export const ResourceList: React.FunctionComponent<ResouceListProps> = (props) => {
  const orderedResources = ([] as ResourceTypes[])
    .concat(...ResourceCategoriesMap.values())
    .filter((resource) => props.resources.has(resource));

  const resourceLines = orderedResources.map((resourceType) => {
    return (
      <ResourceLine
        key={resourceType}
        name={resourceType}
        // We filtered above
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        value={props.resources.get(resourceType)!}
      />
    );
  });
  return (
    <ul className="resource-list">
      {resourceLines}
      {props.resources.has(ResourceTypes.UNKNOWN_RESOURCE) ? (
        <ResourceLine key={ResourceTypes.UNKNOWN_RESOURCE} name="????" value="????" />
      ) : null}
    </ul>
  );
};
