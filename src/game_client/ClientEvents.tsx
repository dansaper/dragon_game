export enum ClientActions {
  PAUSE,
  UNPAUSE,
  DETAILED_INFO_PANEL_TOGGLE
}

export interface IClientEvent {
  action: ClientActions;
}

export function ClientEvent(clientAction: ClientActions): IClientEvent {
  return { action: clientAction };
}
