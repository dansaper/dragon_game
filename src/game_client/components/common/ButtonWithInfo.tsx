import * as React from "react";
import { DetailedInfoKeys } from "../../DetailedInfo";
import { HoveringInfoButton } from "./HoveringInfoButton";

interface ButtonWithInfoProps {
  onClick: () => void;
  isVisible: () => boolean;
  isDisabled: () => boolean;
  title: string;
  infoKey?: DetailedInfoKeys;
  renderContent?: () => JSX.Element;
  disabledInfoButtonOnDisable?: boolean;
}

export class ButtonWithInfo extends React.Component<ButtonWithInfoProps> {
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
          {this.props.renderContent ? this.props.renderContent() : undefined}
        </div>
        {this.props.infoKey === undefined ? undefined : (
          <HoveringInfoButton
            isDisabled={
              this.props.disabledInfoButtonOnDisable !== undefined &&
              this.props.disabledInfoButtonOnDisable &&
              this.props.isDisabled()
            }
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
