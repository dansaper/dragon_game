import { ClientState } from "../ClientState";
import {
  ClientEvent,
  ToggleDetailedInfoPanelEvent,
  UpdateDetailedInfoPanelEvent,
} from "./ClientEvents";

type EventHandler<T extends ClientEvent> = (state: ClientState, event: T) => ClientState;

export const handleToggleDetailedInfoButtonEvent: EventHandler<ToggleDetailedInfoPanelEvent> = (
  state
) => {
  return {
    ...state,
    isDetailedInfoPanelOpen: !state.isDetailedInfoPanelOpen,
  };
};

export const handleUpdateDetailedInfoPanelEvent: EventHandler<UpdateDetailedInfoPanelEvent> = (
  state,
  event
) => {
  {
    return {
      ...state,
      isDetailedInfoPanelOpen: true,
      currentDetailedInfoKey: event.newInfoKey,
    };
  }
};
