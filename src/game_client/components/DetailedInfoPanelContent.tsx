import * as React from "react";
import { DetailedInfo } from "../DetailedInfo";

export class DetailedInfoPanelContent extends React.PureComponent<
  { info: DetailedInfo | undefined },
  {}
> {
  public render() {
    let content: JSX.Element;
    if (this.props.info !== undefined) {
      content = (
        <>
          <h2>{this.props.info.title}</h2>
          <div>{this.props.info.content}</div>
        </>
      );
    } else {
      content = <div>Nothing selected!</div>;
    }

    return <div className="detailed-info-body">{content}</div>;
  }
}
