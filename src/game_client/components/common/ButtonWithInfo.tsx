import * as React from "react";
import { DetailedInfoKeys } from "../../../common/DetailedInfo";
import { GameEvent } from "../../../common/events/GameEvents";
import { ToggleDetailedInfoPanelEvent } from "../../../common/events/ToggleDetailedInfoPanelEvent";
import { UpdateDetailedInfoPanelEvent } from "../../../common/events/UpdateDetailedInfoPanelEvent";

interface IButtonWithInfo {
  onClick: () => void;
  title: string;
  infoKey: DetailedInfoKeys;
  sendGameEvents: (e: GameEvent[]) => void;
}

export class ButtonWithInfo extends React.PureComponent<IButtonWithInfo, {}> {
  constructor(props: IButtonWithInfo) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.selectInfo = this.selectInfo.bind(this);
  }

  public render() {
    return (
      <div className="button-with-info" onClick={this.onClick}>
        <div className="button-with-info-text">{this.props.title}</div>
        <div className="button-info-button" onClick={this.selectInfo}>
          i
        </div>
      </div>
    );
  }

  private onClick() {
    this.props.onClick();
  }

  private selectInfo(e: React.MouseEvent) {
    this.props.sendGameEvents([
      new UpdateDetailedInfoPanelEvent(DetailedInfoKeys.DEFAULT_INFO),
      new ToggleDetailedInfoPanelEvent(true)
    ]);
    e.stopPropagation();
  }
}
