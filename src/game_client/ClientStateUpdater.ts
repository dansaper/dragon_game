import { ClientState } from "./ClientState";
import {
  handleToggleDetailedInfoButtonEvent,
  handleUpdateDetailedInfoPanelEvent,
} from "./client_events/ClientEventHandlers";
import { ClientEvent, ClientEventTypes } from "./client_events/ClientEvents";

const handleEvent = (state: ClientState, event: ClientEvent): ClientState => {
  switch (event.eventType) {
    case ClientEventTypes.TOGGLE_INFO_PANEL:
      return handleToggleDetailedInfoButtonEvent(state, event);
    case ClientEventTypes.UPDATE_INFO_PANEL:
      return handleUpdateDetailedInfoPanelEvent(state, event);
    default:
      throw new Error(event);
  }
};

const handleEvents = (state: ClientState, events: ClientEvent[]): ClientState => {
  let newState = state;
  for (const event of events) {
    newState = handleEvent(newState, event);
  }

  return newState;
};

export const ClientStateUpdater = {
  handleEvents: handleEvents,
};
