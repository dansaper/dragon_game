import * as React from "react";
import { GameEvent } from "../../common/events/GameEvents";
import { ResourceModificationEvent } from "../../common/events/ResourceModificationEvent";
import { ResourceTypes } from "../../common/Resources";
import { PauseButton } from "./PauseButton";

interface GameMenuProps {
  onPause: () => void;
  onUnpause: () => void;
  isPaused: boolean;
  sendGameEvents: (e: GameEvent[]) => void;
}

export class GameMenu extends React.Component<GameMenuProps, {}> {
  constructor(props: GameMenuProps) {
    super(props);
    this.giveResources = this.giveResources.bind(this);
  }

  public render() {
    return (
      <div className="game-menu">
        <PauseButton
          isPaused={this.props.isPaused}
          pause={this.props.onPause}
          unpause={this.props.onUnpause}
        />
        <button onClick={this.giveResources}>Give Resources</button>
      </div>
    );
  }

  private giveResources() {
    const events = [
      new ResourceModificationEvent(ResourceTypes.BABY_WYVERN_BONE, 1000),
      new ResourceModificationEvent(ResourceTypes.BABY_WYVERN_HIDE, 1000),
      new ResourceModificationEvent(ResourceTypes.BABY_WYVERN_LEATHER, 1000),
      new ResourceModificationEvent(ResourceTypes.PLAINS_HUNTER, 1000)
    ];
    this.props.sendGameEvents(events);
  }
}
