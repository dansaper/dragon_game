import * as React from "react";
import { PauseButton } from "./PauseButton";

interface GameMenuProps {
  onPause: () => void;
  onUnpause: () => void;
  isPaused: boolean;
}

export class GameMenu extends React.Component<GameMenuProps, {}> {
  public render() {
    return (
      <div className="game_menu">
        <PauseButton
          isPaused={this.props.isPaused}
          pause={this.props.onPause}
          unpause={this.props.onUnpause}
        />
      </div>
    );
  }
}
