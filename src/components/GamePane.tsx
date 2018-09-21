import * as React from "react";
import {Game} from "../game_worker/WorkerGameState";
import {ResourceList} from "./ResourceList";

export class GamePane extends React.Component<Game, {}> {
    render() {
        return <div className="game_pane">
            <div className="resource_pane">
                <ResourceList {...this.props.state.resources}></ResourceList>
            </div>
            <div className="main_content_pane"><div>Foo Bar Baz</div><div>Biz Bak Boo</div></div>
        </div>
    }
}