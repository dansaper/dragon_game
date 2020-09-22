import * as React from "react";

interface PauseButtonProps {
  isPaused: boolean;
  pause: () => void;
  unpause: () => void;
}

export const PauseButton: React.FunctionComponent<PauseButtonProps> = (props) => {
  return (
    <button onClick={props.isPaused ? props.unpause : props.pause}>
      {props.isPaused ? "Unpause" : "Pause"}
    </button>
  );
};
