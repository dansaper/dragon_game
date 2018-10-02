import { DetailedInfoKeys } from "./DetailedInfo";

export interface ClientState {
  isPaused: boolean;
  isDetailedInfoPanelOpen: boolean;
  currentDetailedInfoKey?: DetailedInfoKeys;
}
