import { ClientState } from "../ClientState";
import { GameState } from "../GameState";
import { PurchaseUpgradeEventHandlers } from "./PurchaseUpgradeEvent";
import { ResourceModificationEventHandlers } from "./ResourceModificationEvent";
import { SetProgressionFlagEventHandlers } from "./SetProgressionFlagEvent";
import { ToggleDetailedInfoPanelEventHandlers } from "./ToggleDetailedInfoPanelEvent";
import { UpdateDetailedInfoPanelEventHandlers } from "./UpdateDetailedInfoPanelEvent";

export enum GameEventTypes {
  TOGGLE_PAUSE = "toggle_pause",
  MODIFY_RESOURCE = "modify_resource",
  PURCHASE_UPGRADE = "purchase_upgrade",
  SET_PROGRESSION_FLAG = "set_progression_flag",

  // CLIENT ONLY
  // These will be processed even if the game is paused
  TOGGLE_INFO_PANEL = "toggle_info_panel",
  UPDATE_INFO_PANEL = "update_info_panel"
}

export interface GameEvent {
  eventType: GameEventTypes;
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
gameStateHandlers.set(
  GameEventTypes.SET_PROGRESSION_FLAG,
  SetProgressionFlagEventHandlers.gameState
);
gameStateHandlers.set(GameEventTypes.PURCHASE_UPGRADE, PurchaseUpgradeEventHandlers.gameState);

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
