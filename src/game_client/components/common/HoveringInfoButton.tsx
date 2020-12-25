import * as React from "react";
import { ClientEventTypes } from "../../client_events/ClientEvents";
import { DetailedInfoKey } from "../../DetailedInfo";
import { GameClient } from "../../GameClient";

interface HoveringInfoButtonProps {
  isDisabled: boolean;
  infoKey: DetailedInfoKey;
}

export const HoveringInfoButton: React.FunctionComponent<HoveringInfoButtonProps> = (props) => {
  const selectInfo = (e: React.MouseEvent) => {
    if (props.isDisabled) {
      return;
    }

    GameClient.sendClientEvents([
      {
        eventType: ClientEventTypes.UPDATE_INFO_PANEL,
        newInfoKey: props.infoKey,
      },
    ]);

    e.stopPropagation();
  };

  return (
    <div className="hovering-info-button" onClick={selectInfo}>
      i
    </div>
  );
};
