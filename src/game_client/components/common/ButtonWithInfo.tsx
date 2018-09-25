import * as React from "react";
import { DetailedInfoKeys } from "../../DetailedInfo";

interface IButtonWithInfo {
  onClick: () => void;
  title: string;
  infoKey: DetailedInfoKeys;
}

export class ButtonWithInfo extends React.PureComponent<IButtonWithInfo, {}> {
  constructor(props: IButtonWithInfo) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  public render() {
    return (
      <div className="button-with-info">
        <div className="button-with-info-text" onClick={this.onClick}>
          {this.props.title}
        </div>
        <div className="button-info-button">i</div>
      </div>
    );
  }

  private onClick() {
    this.props.onClick();
  }
}
