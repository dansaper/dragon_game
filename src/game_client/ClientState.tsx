import { DetailedInfoKeys } from "./DetailedInfo";

export interface ClientState {
  isPaused: boolean;
  isDetailedInfoPanelOpen: boolean;
  currentDetailedInfoKey?: DetailedInfoKeys;
}

export const getEmptyClientState = (): ClientState => {
  return {
    isPaused: false,
    isDetailedInfoPanelOpen: false,
  };
};
