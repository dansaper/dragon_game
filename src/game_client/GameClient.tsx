import * as React from "react";
import * as ReactDOM from "react-dom";
import { IGameEvent } from "../common/GameEvents";
import { IGameState } from "../common/GameStateModels";
import { ClientActions, IClientEvent } from "./ClientEvents";
import { GamePane } from "./components/GamePane";
import { DetailedInfo } from "./DetailedInfo";

export interface IClientState {
  isPaused: boolean;
  isDetailedInfoVisible: boolean;
  currentDetailedInfo?: DetailedInfo;
}

export class GameClient {
  public readonly clientState: IClientState;

  constructor(private worker: Worker, public gameState: IGameState) {
    this.clientState = {
      isDetailedInfoVisible: false,
      isPaused: false
    };
  }

  public sendGameEvents(events: IGameEvent[]) {
    this.worker.postMessage(events);
  }

  public sendClientEvents(events: IClientEvent[]) {
    events.forEach(event => {
      switch (event.action) {
        case ClientActions.PAUSE:
          this.clientState.isPaused = true;
          break;
        case ClientActions.UNPAUSE:
          this.clientState.isPaused = false;
          break;
        case ClientActions.DETAILED_INFO_PANEL_TOGGLE:
          this.clientState.isDetailedInfoVisible = !this.clientState.isDetailedInfoVisible;
          break;
      }
    });
    this.rerender();
  }

  public rerender() {
    ReactDOM.render(<GamePane game={this} />, document.getElementById("game"));
  }
}
