import * as React from "react";
import { IGameEvent, ResourceModificationEvent } from "../../common/GameEvents";
import { ResourceTypes } from "../../common/GameStateModels";

export class MainContentPane extends React.Component<{ sendevent: (e: IGameEvent) => void }, {}> {
  public render() {
    return (
      <button onClick={() => this.props.sendevent(this.buildIncrementEvent())}>Click me!</button>
    );
  }

  private buildIncrementEvent() {
    return new ResourceModificationEvent(ResourceTypes.WYVERN_BONE, 3);
  }
}
