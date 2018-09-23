import * as React from "react";

interface IPauseButton {
  isPaused: boolean;
  pause: () => void;
  unpause: () => void;
}

export class PauseButton extends React.PureComponent<IPauseButton, {}> {
  public render() {
    return (
      <button
        onClick={() => {
          this.props.isPaused ? this.props.unpause() : this.props.pause();
        }}
      >
        {this.props.isPaused ? "Unpause" : "Pause"}
      </button>
    );
  }
}
