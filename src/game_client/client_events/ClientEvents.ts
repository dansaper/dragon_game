import { DetailedInfoKey } from "../DetailedInfo";

export const ClientEventTypes = {
  TOGGLE_INFO_PANEL: "toggle_info_panel",
  UPDATE_INFO_PANEL: "update_info_panel",
} as const;

interface ClientEventGuard {
  readonly eventType: typeof ClientEventTypes[keyof typeof ClientEventTypes];
}

export interface ToggleDetailedInfoPanelEvent extends ClientEventGuard {
  readonly eventType: typeof ClientEventTypes.TOGGLE_INFO_PANEL;
}

export interface UpdateDetailedInfoPanelEvent extends ClientEventGuard {
  readonly eventType: typeof ClientEventTypes.UPDATE_INFO_PANEL;
  newInfoKey: DetailedInfoKey;
}

export type ClientEvent = ToggleDetailedInfoPanelEvent | UpdateDetailedInfoPanelEvent;
