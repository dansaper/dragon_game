import * as React from "react";
import { DetailedInfo } from "../DetailedInfo";

export interface IDetailedInfoPanelWrapper {
  isPanelOpen: boolean;
  togglePanel: () => void;
  info: DetailedInfo | undefined;
}

export class DetailedInfoPanelWrapper extends React.Component<IDetailedInfoPanelWrapper, {}> {
  public render() {
    let panelContent: JSX.Element;
    if (this.props.info !== undefined) {
      panelContent = (
        <>
          <h2>{this.props.info.title}</h2>
          <div>{this.props.info.content}</div>
        </>
      );
    } else {
      panelContent = <div>Nothing selected!</div>;
    }

    const indicatorClass = this.props.isPanelOpen
      ? "detailed_info_panel_open_indicator"
      : "detailed_info_panel_closed_indicator";

    return (
      <>
        <div
          onClick={() => this.props.togglePanel()}
          className={`detailed_info_toggle_bar_toggle ${indicatorClass}`}
        />
        <div className={`detailed_info_panel ${indicatorClass}`}>{panelContent}</div>
      </>
    );
  }
}
