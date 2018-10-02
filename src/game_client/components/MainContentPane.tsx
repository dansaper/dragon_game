import * as React from "react";
import { GameEvent, ResourceModificationEvent } from "../../common/GameEvents";
import { GameState, ResourceTypes } from "../../common/GameState";
import { IClientEvent } from "../ClientEvents";
import { ClientState } from "../ClientState";
import { DetailedInfoKeys } from "../DetailedInfo";
import { ButtonWithInfo } from "./common/ButtonWithInfo";
import { GameMap } from "./map/GameMap";

interface MainContentPaneProps {
  clientState: ClientState;
  gameState: GameState;
  sendGameEvents: (e: GameEvent[]) => void;
  sendClientEvents: (e: IClientEvent[]) => void;
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
        />
        <GameMap ownedTiles={[]} />
      </div>
    );
  }

  private increment() {
    this.props.sendGameEvents([new ResourceModificationEvent(ResourceTypes.WYVERN_BONE, 3)]);
  }
}
