import { DetailedInfoKeys } from "./DetailedInfo";

export interface ClientState {
  isPaused: boolean;
  isDetailedInfoVisible: boolean;
  currentDetailedInfoKey?: DetailedInfoKeys;
}
