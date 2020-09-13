import * as React from "react";

interface PauseButtonProps {
  isPaused: boolean;
  pause: () => void;
  unpause: () => void;
}

export class PauseButton extends React.Component<PauseButtonProps> {
  constructor(props: PauseButtonProps) {
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
