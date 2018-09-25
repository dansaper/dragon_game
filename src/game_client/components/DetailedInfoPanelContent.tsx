import * as React from "react";
import { DetailedInfo, DetailedInfoKeys, DetailedInfoKeysMap } from "../DetailedInfo";

interface IDetailedInfoPanelContent {
  info?: DetailedInfoKeys;
}

export class DetailedInfoPanelContent extends React.PureComponent<IDetailedInfoPanelContent, {}> {
  private detailedInfo?: DetailedInfo;
  constructor(props: IDetailedInfoPanelContent) {
    super(props);
    if (props.info !== undefined) {
      this.detailedInfo = DetailedInfoKeysMap.get(props.info);
    }
  }

  public render() {
    let content: JSX.Element;
    if (this.detailedInfo !== undefined) {
      content = (
        <>
          <h2>{this.detailedInfo.title}</h2>
          <div>{this.detailedInfo.content}</div>
        </>
      );
    } else {
      content = <div>Nothing selected!</div>;
    }

    return <div className="detailed-info-body">{content}</div>;
  }
}
