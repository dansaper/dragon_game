import * as React from "react";
import * as ReactDOM from "react-dom";
import { IGameEvent } from "../common/GameEvents";
import { IGameState } from "../common/GameStateModels";
import { ClientActions, IClientEvent } from "./ClientEvents";
import { GamePane } from "./components/GamePane";
import { DetailedInfoKeys } from "./DetailedInfo";

export interface IClientState {
  isPaused: boolean;
  isDetailedInfoVisible: boolean;
  currentDetailedInfoKey?: DetailedInfoKeys;
}

export interface IGameClient {
  clientState: IClientState;
  gameState: IGameState;
  sendGameEvents: (e: IGameEvent[]) => void;
  sendClientEvents: (e: IClientEvent[]) => void;
}

export class GameClient implements IGameClient {
  public clientState: IClientState;

  constructor(private worker: Worker, public gameState: IGameState) {
    this.clientState = Object.freeze({
      isDetailedInfoVisible: false,
      isPaused: false
    });
    this.sendGameEvents = this.sendGameEvents.bind(this);
    this.sendClientEvents = this.sendClientEvents.bind(this);
  }

  public sendGameEvents(events: IGameEvent[]) {
    this.worker.postMessage(events);
  }

  public sendClientEvents(events: IClientEvent[]) {
    const updates: Partial<IClientState> = {};
    events.forEach(event => {
      switch (event.action) {
        case ClientActions.PAUSE:
          updates.isPaused = true;
          break;
        case ClientActions.UNPAUSE:
          updates.isPaused = false;
          break;
        case ClientActions.DETAILED_INFO_PANEL_TOGGLE:
          updates.isDetailedInfoVisible = !this.clientState.isDetailedInfoVisible;
          break;
      }
    });
    this.clientState = Object.freeze(Object.assign({}, this.clientState, updates));

    // Rerender so that we update immediately
    this.rerender();
  }

  public rerender() {
    ReactDOM.render(<GamePane game={this} />, document.getElementById("game"));
  }
}
