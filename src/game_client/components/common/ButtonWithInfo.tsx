import * as React from "react";
import { DetailedInfoKeys } from "../../../common/DetailedInfo";
import { GameEvent } from "../../../common/events/GameEvents";
import { HoveringInfoButton } from "./HoveringInfoButton";

interface ButtonWithInfoProps {
  onClick: () => void;
  isVisible: () => boolean;
  isDisabled: () => boolean;
  title: string;
  infoKey?: DetailedInfoKeys;
  sendGameEvents: (e: GameEvent[]) => void;
  renderContent?: () => JSX.Element;
  disabledInfoButtonOnDisable?: boolean;
}

export class ButtonWithInfo extends React.Component<ButtonWithInfoProps, {}> {
  constructor(props: ButtonWithInfoProps) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  public render() {
    const topLevelClasses = `button-with-info ${
      !this.props.isVisible() ? "button-with-info-hidden" : ""
    } ${this.props.isDisabled() ? "button-with-info-disabled" : ""}`;
    return (
      <div className={topLevelClasses} onClick={this.onClick}>
        <div className={"button-with-info-text"}>{this.props.title}</div>
        <div className={"button-with-info-content"}>
          {this.props.renderContent ? this.props.renderContent() : null}
        </div>
        {this.props.infoKey === undefined ? (
          undefined
        ) : (
          <HoveringInfoButton
            isDisabled={
              this.props.disabledInfoButtonOnDisable !== undefined &&
              this.props.disabledInfoButtonOnDisable &&
              this.props.isDisabled()
            }
            sendGameEvents={this.props.sendGameEvents}
            infoKey={this.props.infoKey}
          />
        )}
      </div>
    );
  }

  private onClick() {
    if (!this.props.isDisabled()) {
      this.props.onClick();
    }
  }
}
