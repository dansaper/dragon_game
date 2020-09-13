import * as React from "react";
import { ClientEventTypes } from "../../client_events/ClientEvents";
import { DetailedInfoKeys } from "../../DetailedInfo";
import { GameClient } from "../../GameClient";

interface HoveringInfoButtonProps {
  isDisabled: boolean;
  infoKey: DetailedInfoKeys;
}

export class HoveringInfoButton extends React.Component<HoveringInfoButtonProps> {
  constructor(props: HoveringInfoButtonProps) {
    super(props);

    this.selectInfo = this.selectInfo.bind(this);
  }

  public render() {
    return (
      <div className="hovering-info-button" onClick={this.selectInfo}>
        i
      </div>
    );
  }

  private selectInfo(e: React.MouseEvent) {
    if (this.props.isDisabled) {
      return;
    }

    GameClient.sendClientEvents([
      {
        eventType: ClientEventTypes.UPDATE_INFO_PANEL,
        newInfoKey: this.props.infoKey,
      },
    ]);

    e.stopPropagation();
  }
}
