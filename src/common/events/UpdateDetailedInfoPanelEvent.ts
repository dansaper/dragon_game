import { ClientState } from "../ClientState";
import { DetailedInfoKeys } from "../DetailedInfo";
import { ClientStateModificationHandler, GameEvent, GameEventTypes } from "./GameEvents";

export class UpdateDetailedInfoPanelEvent implements GameEvent {
  public readonly eventType = GameEventTypes.UPDATE_INFO_PANEL;
  constructor(public newInfoKey: DetailedInfoKeys) {}
}

export const UpdateDetailedInfoPanelEventHandlers: ClientStateModificationHandler = {
  clientState: (state: ClientState, e: UpdateDetailedInfoPanelEvent) => {
    state.currentDetailedInfoKey = e.newInfoKey;
    state.isDetailedInfoPanelOpen = true;
    return state;
  }
};
