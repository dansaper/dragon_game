import * as React from "react";
import { DetailedInfoKeys } from "../../../common/DetailedInfo";
import { GameEvent } from "../../../common/events/GameEvents";
import { ToggleDetailedInfoPanelEvent } from "../../../common/events/ToggleDetailedInfoPanelEvent";
import { UpdateDetailedInfoPanelEvent } from "../../../common/events/UpdateDetailedInfoPanelEvent";

interface HoveringInfoButtonProps {
  isDisabled: boolean;
  infoKey: DetailedInfoKeys;
  sendGameEvents: (e: GameEvent[]) => void;
}

export class HoveringInfoButton extends React.Component<HoveringInfoButtonProps, {}> {
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

    this.props.sendGameEvents([
      new UpdateDetailedInfoPanelEvent(this.props.infoKey),
      new ToggleDetailedInfoPanelEvent(true)
    ]);
    e.stopPropagation();
  }
}
