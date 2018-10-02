import { ClientState } from "../ClientState";
import { ClientStateModificationHandler, GameEvent, GameEventTypes } from "./GameEvents";

export class ToggleDetailedInfoPanelEvent implements GameEvent {
  public readonly eventType = GameEventTypes.TOGGLE_INFO_PANEL;
  constructor(public open?: boolean) {}
}

export const ToggleDetailedInfoPanelEventHandlers: ClientStateModificationHandler = {
  clientState: (state: ClientState, e: ToggleDetailedInfoPanelEvent) => {
    state.isDetailedInfoPanelOpen = e.open === undefined ? !state.isDetailedInfoPanelOpen : e.open;
    return state;
  }
};
