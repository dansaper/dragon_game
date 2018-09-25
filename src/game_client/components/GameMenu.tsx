import * as React from "react";
import { PauseButton } from "./PauseButton";

interface IGameMenu {
  onPause: () => void;
  onUnpause: () => void;
  isPaused: boolean;
}

export class GameMenu extends React.PureComponent<IGameMenu, {}> {
  public render() {
    return (
      <div className="game_menu">
        <PauseButton
          isPaused={this.props.isPaused}
          pause={() => this.props.onPause()}
          unpause={() => this.props.onUnpause()}
        />
      </div>
    );
  }
}
