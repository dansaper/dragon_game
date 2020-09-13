import * as React from "react";
import { GameEvent, GameEventTypes } from "../../common/GameEvents";
import { ResourceTypes } from "../../common/Resources";
import { PauseButton } from "./PauseButton";
import { GameClient } from "../GameClient";

interface GameMenuProps {
  onPause: () => void;
  onUnpause: () => void;
  isPaused: boolean;
}

export class GameMenu extends React.Component<GameMenuProps> {
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
    const makeEvent = (resourceType: ResourceTypes, amount: number): GameEvent => {
      return {
        eventType: GameEventTypes.MODIFY_RESOURCE,
        resourceType: resourceType,
        modification: amount,
      };
    };

    const events = [
      makeEvent(ResourceTypes.BABY_WYVERN_BONE, 1000),
      makeEvent(ResourceTypes.BABY_WYVERN_HIDE, 1000),
      makeEvent(ResourceTypes.BABY_WYVERN_LEATHER, 1000),
      makeEvent(ResourceTypes.PLAINS_HUNTER, 1000),
    ];
    GameClient.sendGameEvents(events);
  }
}
