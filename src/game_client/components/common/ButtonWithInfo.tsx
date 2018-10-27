import * as React from "react";
import { DetailedInfoKeys } from "../../../common/DetailedInfo";
import { GameEvent } from "../../../common/events/GameEvents";
import { ToggleDetailedInfoPanelEvent } from "../../../common/events/ToggleDetailedInfoPanelEvent";
import { UpdateDetailedInfoPanelEvent } from "../../../common/events/UpdateDetailedInfoPanelEvent";

interface ButtonWithInfoProps {
  onClick: () => void;
  isVisible: () => boolean;
  isDisabled: () => boolean;
  title: string;
  infoKey: DetailedInfoKeys;
  sendGameEvents: (e: GameEvent[]) => void;
}

export class ButtonWithInfo extends React.Component<ButtonWithInfoProps, {}> {
  constructor(props: ButtonWithInfoProps) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.selectInfo = this.selectInfo.bind(this);
  }

  public render() {
    const topLevelClasses = `button-with-info ${
      !this.props.isVisible() ? "button-with-info-hidden" : ""
    }`;
    const textButtonClasses = `button-with-info-text ${
      this.props.isDisabled() ? "button-with-info-disabled" : ""
    }`;
    return (
      <div className={topLevelClasses} onClick={this.onClick}>
        <div className={textButtonClasses}>{this.props.title}</div>
        <div className="button-info-button" onClick={this.selectInfo}>
          i
        </div>
      </div>
    );
  }

  private onClick() {
    if (!this.props.isDisabled()) {
      this.props.onClick();
    }
  }

  private selectInfo(e: React.MouseEvent) {
    this.props.sendGameEvents([
      new UpdateDetailedInfoPanelEvent(this.props.infoKey),
      new ToggleDetailedInfoPanelEvent(true)
    ]);
    e.stopPropagation();
  }
}
