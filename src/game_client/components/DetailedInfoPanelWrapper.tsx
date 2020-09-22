import * as React from "react";
import { DetailedInfoKeys } from "../DetailedInfo";
import { DetailedInfoPanelContent } from "./DetailedInfoPanelContent";

interface DetailedInfoPanelWrapperProps {
  isPanelOpen: boolean;
  togglePanel: () => void;
  info?: DetailedInfoKeys;
}

export const DetailedInfoPanelWrapper: React.FunctionComponent<DetailedInfoPanelWrapperProps> = (
  props
) => {
  const indicatorClass = props.isPanelOpen
    ? "detailed-info-panel-open-indicator"
    : "detailed-info-panel-closed-indicator";

  return (
    <>
      <div
        onClick={props.togglePanel}
        className={`detailed-info-toggle-bar-toggle ${indicatorClass}`}
      />
      <div className={`detailed-info-panel ${indicatorClass}`}>
        <DetailedInfoPanelContent info={props.info} />
      </div>
    </>
  );
};
