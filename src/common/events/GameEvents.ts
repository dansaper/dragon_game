import { ClientState } from "../ClientState";
import { GameState } from "../GameState";
import { ResourceModificationEventHandlers } from "./ResourceModificationEvent";
import { ToggleDetailedInfoPanelEventHandlers } from "./ToggleDetailedInfoPanelEvent";
import { UpdateDetailedInfoPanelEventHandlers } from "./UpdateDetailedInfoPanelEvent";

export enum GameEventTypes {
  TOGGLE_PAUSE,
  MODIFY_RESOURCE,

  // CLIENT ONLY
  TOGGLE_INFO_PANEL,
  UPDATE_INFO_PANEL
}

export interface GameEvent {
  eventType: GameEventTypes;
}
export function GameEvent(event: GameEventTypes): GameEvent {
  return {
    eventType: event
  };
}

type GameStateModificationHandlerSignature = (state: GameState, event: any) => GameState;
type ClientStateModificationHandlerSignature = (state: ClientState, event: any) => ClientState;

export interface GameStateModificationHandler {
  gameState: GameStateModificationHandlerSignature;
}

export interface ClientStateModificationHandler {
  clientState: ClientStateModificationHandlerSignature;
}

const gameStateHandlers: Map<GameEventTypes, GameStateModificationHandlerSignature> = new Map();
gameStateHandlers.set(GameEventTypes.MODIFY_RESOURCE, ResourceModificationEventHandlers.gameState);

const clientStateHandlers: Map<GameEventTypes, ClientStateModificationHandlerSignature> = new Map();
clientStateHandlers.set(
  GameEventTypes.UPDATE_INFO_PANEL,
  UpdateDetailedInfoPanelEventHandlers.clientState
);
clientStateHandlers.set(
  GameEventTypes.TOGGLE_INFO_PANEL,
  ToggleDetailedInfoPanelEventHandlers.clientState
);

export {
  gameStateHandlers as GameStateModificationHandlers,
  clientStateHandlers as ClientStateModificationHandlers
};
