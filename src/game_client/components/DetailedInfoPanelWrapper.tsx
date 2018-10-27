import * as React from "react";
import { DetailedInfoKeys } from "../../common/DetailedInfo";
import { DetailedInfoPanelContent } from "./DetailedInfoPanelContent";

interface DetailedInfoPanelWrapperProps {
  isPanelOpen: boolean;
  togglePanel: () => void;
  info?: DetailedInfoKeys;
}

export class DetailedInfoPanelWrapper extends React.Component<DetailedInfoPanelWrapperProps, {}> {
  public constructor(props: DetailedInfoPanelWrapperProps) {
    super(props);
  }

  public render() {
    const indicatorClass = this.props.isPanelOpen
      ? "detailed_info_panel_open_indicator"
      : "detailed_info_panel_closed_indicator";

    return (
      <>
        <div
          onClick={this.props.togglePanel}
          className={`detailed_info_toggle_bar_toggle ${indicatorClass}`}
        />
        <div className={`detailed_info_panel ${indicatorClass}`}>
          <DetailedInfoPanelContent info={this.props.info} />
        </div>
      </>
    );
  }
}
