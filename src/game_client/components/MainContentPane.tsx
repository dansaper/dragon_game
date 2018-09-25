import * as React from "react";
import { IGameEvent, ResourceModificationEvent } from "../../common/GameEvents";
import { IGameState, ResourceTypes } from "../../common/GameStateModels";
import { IClientEvent } from "../ClientEvents";
import { DetailedInfoKeys } from "../DetailedInfo";
import { IClientState } from "../GameClient";
import { ButtonWithInfo } from "./common/ButtonWithInfo";

interface IMainContentPane {
  clientState: IClientState;
  gameState: IGameState;
  sendGameEvents: (e: IGameEvent[]) => void;
  sendClientEvents: (e: IClientEvent[]) => void;
}

export class MainContentPane extends React.Component<IMainContentPane, {}> {
  constructor(props: IMainContentPane) {
    super(props);
    this.increment = this.increment.bind(this);
  }

  public render() {
    return (
      <ButtonWithInfo
        onClick={this.increment}
        title="Super Button"
        infoKey={DetailedInfoKeys.DEFAULT_INFO}
      />
    );
  }

  private increment() {
    this.props.sendGameEvents([new ResourceModificationEvent(ResourceTypes.WYVERN_BONE, 3)]);
  }
}
