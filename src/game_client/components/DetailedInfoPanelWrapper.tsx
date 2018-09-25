import * as React from "react";
import { DetailedInfoKeys } from "../DetailedInfo";
import { DetailedInfoPanelContent } from "./DetailedInfoPanelContent";

interface IDetailedInfoPanelWrapper {
  isPanelOpen: boolean;
  togglePanel: () => void;
  info?: DetailedInfoKeys;
}

export class DetailedInfoPanelWrapper extends React.PureComponent<IDetailedInfoPanelWrapper, {}> {
  public render() {
    const indicatorClass = this.props.isPanelOpen
      ? "detailed_info_panel_open_indicator"
      : "detailed_info_panel_closed_indicator";

    return (
      <>
        <div
          onClick={() => this.props.togglePanel()}
          className={`detailed_info_toggle_bar_toggle ${indicatorClass}`}
        />
        <div className={`detailed_info_panel ${indicatorClass}`}>
          <DetailedInfoPanelContent info={this.props.info} />
        </div>
      </>
    );
  }
}
