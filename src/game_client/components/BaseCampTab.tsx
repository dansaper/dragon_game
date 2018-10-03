import * as React from "react";
import { DetailedInfoKeys } from "../../common/DetailedInfo";
import { GameEvent } from "../../common/events/GameEvents";
import { ResourceModificationEvent } from "../../common/events/ResourceModificationEvent";
import { GameState, ResourceTypes } from "../../common/GameState";
import { ButtonWithInfo } from "./common/ButtonWithInfo";

interface BaseCampTabProps {
  gameState: GameState;
  sendGameEvents: (e: GameEvent[]) => void;
}

export class BaseCampTab extends React.PureComponent<BaseCampTabProps, {}> {
  constructor(props: BaseCampTabProps) {
    super(props);
    this.increment = this.increment.bind(this);
  }

  public render() {
    return (
      <div>
        <ButtonWithInfo
          onClick={this.increment}
          title="Kill a Wyvern"
          infoKey={DetailedInfoKeys.DEFAULT_INFO}
          sendGameEvents={this.props.sendGameEvents}
        />
      </div>
    );
  }

  private increment() {
    this.props.sendGameEvents([new ResourceModificationEvent(ResourceTypes.WYVERN_BONE, 3)]);
  }
}
