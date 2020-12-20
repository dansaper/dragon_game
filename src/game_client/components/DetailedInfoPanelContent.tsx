import * as React from "react";
import { DetailedInfoKey, DetailedInfoKeysMap } from "../DetailedInfo";

interface DetailedInfoPanelContentProps {
  info?: DetailedInfoKey;
}

export const DetailedInfoPanelContent: React.FunctionComponent<DetailedInfoPanelContentProps> = (
  props
) => {
  let content: JSX.Element;
  if (props.info !== undefined) {
    const detailedInfo = DetailedInfoKeysMap.get(props.info);
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
};
