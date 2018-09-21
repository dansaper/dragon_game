import * as React from "react";
import {Resources} from "../game_worker/WorkerGameState";

export class ResourceList extends React.Component<Resources, {}> {
    render() {
        return <ul className="resource_lines">{Array.from(this.props.basic.entries()).map(([resourceType, resource]) => {
            return <li className="resource_line" key={resourceType}>
                <div className="resource_line_entry_name">{resource.displayName}:</div>
                <div className="resource_line_count">{resource.value.toString()}</div>
            </li>
        })}</ul>
    }
}
