import * as React from "react";
import { ClientGameView } from "../ClientGameState";
import { ResourceList } from "./ResourceList";

export class GamePane extends React.Component<ClientGameView, {}> {
  public render() {
    return (
      <div className="game_pane">
        <div className="resource_pane">
          <ResourceList resources={this.props.resources} />
        </div>
        <div className="main_content_pane">
          <div>Foo Bar Baz</div>
          <div>Biz Bak Boo</div>
        </div>
      </div>
    );
  }
}
