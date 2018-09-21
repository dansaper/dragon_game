import * as React from "react";
import { ClientGame } from "../ClientGame";
import { MainContentPane } from "./MainContentPane";
import { ResourceList } from "./ResourceList";

export interface IGamePane {
  game: ClientGame;
}

export class GamePane extends React.Component<IGamePane, {}> {
  public render() {
    return (
      <div className="game_pane">
        <div className="resource_pane">
          <ResourceList resources={this.props.game.resources} />
        </div>
        <div className="main_content_pane">
          <div>Foo Bar Baz</div>
          <div>Biz Bak Boo</div>
          <MainContentPane
            sendevent={e => {
              this.props.game.sendEvents([e]);
            }}
          />
        </div>
      </div>
    );
  }
}
