import * as React from "react";
import { DetailedInfo, DetailedInfoKeys, DetailedInfoKeysMap } from "../../common/DetailedInfo";

interface DetailedInfoPanelContentProps {
  info?: DetailedInfoKeys;
}

export class DetailedInfoPanelContent extends React.PureComponent<
  DetailedInfoPanelContentProps,
  {}
> {
  private detailedInfo?: DetailedInfo;
  constructor(props: DetailedInfoPanelContentProps) {
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
