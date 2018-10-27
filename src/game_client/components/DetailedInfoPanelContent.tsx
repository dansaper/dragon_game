import * as React from "react";
import { DetailedInfoKeys, DetailedInfoKeysMap } from "../../common/DetailedInfo";

interface DetailedInfoPanelContentProps {
  info?: DetailedInfoKeys;
}

export class DetailedInfoPanelContent extends React.Component<DetailedInfoPanelContentProps, {}> {
  public render() {
    let content: JSX.Element;
    if (this.props.info !== undefined) {
      const detailedInfo = DetailedInfoKeysMap.get(this.props.info);
      if (detailedInfo !== undefined) {
        content = (
          <>
            <h2>{detailedInfo.title}</h2>
            <div>{detailedInfo.content}</div>
          </>
        );
      } else {
        content = <div>Nothing known about this!</div>;
      }
    } else {
      content = <div>Nothing selected!</div>;
    }

    return <div className="detailed-info-body">{content}</div>;
  }
}
