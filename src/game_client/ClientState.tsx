import { DetailedInfoKey } from "./DetailedInfo";

export interface ClientState {
  isPaused: boolean;
  isDetailedInfoPanelOpen: boolean;
  currentDetailedInfoKey?: DetailedInfoKey;
}

export const getEmptyClientState = (): ClientState => {
  return {
    isPaused: false,
    isDetailedInfoPanelOpen: false,
  };
};
