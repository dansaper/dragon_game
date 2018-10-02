import * as React from "react";
import { ClientState } from "../../common/ClientState";
import { DetailedInfoKeys } from "../../common/DetailedInfo";
import { GameEvent } from "../../common/events/GameEvents";
import { ResourceModificationEvent } from "../../common/events/ResourceModificationEvent";
import { GameState, ResourceTypes } from "../../common/GameState";
import { ButtonWithInfo } from "./common/ButtonWithInfo";
import { GameMap } from "./map/GameMap";

interface MainContentPaneProps {
  clientState: ClientState;
  gameState: GameState;
  sendGameEvents: (e: GameEvent[]) => void;
}

export class MainContentPane extends React.PureComponent<MainContentPaneProps, {}> {
  constructor(props: MainContentPaneProps) {
    super(props);
    this.increment = this.increment.bind(this);
  }

  public render() {
    return (
      <div>
        <ButtonWithInfo
          onClick={this.increment}
          title="Super Button"
          infoKey={DetailedInfoKeys.DEFAULT_INFO}
          sendGameEvents={this.props.sendGameEvents}
        />
        <GameMap ownedTiles={[]} />
      </div>
    );
  }

  private increment() {
    this.props.sendGameEvents([new ResourceModificationEvent(ResourceTypes.WYVERN_BONE, 3)]);
  }
}
