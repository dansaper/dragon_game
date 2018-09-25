import * as React from "react";

interface IPauseButton {
  isPaused: boolean;
  pause: () => void;
  unpause: () => void;
}

export class PauseButton extends React.PureComponent<IPauseButton, {}> {
  constructor(props: IPauseButton) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  public render() {
    return <button onClick={this.handleClick}>{this.props.isPaused ? "Unpause" : "Pause"}</button>;
  }

  private handleClick() {
    this.props.isPaused ? this.props.unpause() : this.props.pause();
  }
}
