import * as React from "react";
import { DetailedInfoKeys } from "../DetailedInfo";
import { DetailedInfoPanelContent } from "./DetailedInfoPanelContent";

interface DetailedInfoPanelWrapperProps {
  isPanelOpen: boolean;
  togglePanel: () => void;
  info?: DetailedInfoKeys;
}

export class DetailedInfoPanelWrapper extends React.Component<DetailedInfoPanelWrapperProps> {
  public constructor(props: DetailedInfoPanelWrapperProps) {
    super(props);
  }

  public render() {
    const indicatorClass = this.props.isPanelOpen
      ? "detailed-info-panel-open-indicator"
      : "detailed-info-panel-closed-indicator";

    return (
      <>
        <div
          onClick={this.props.togglePanel}
          className={`detailed-info-toggle-bar-toggle ${indicatorClass}`}
        />
        <div className={`detailed-info-panel ${indicatorClass}`}>
          <DetailedInfoPanelContent info={this.props.info} />
        </div>
      </>
    );
  }
}
