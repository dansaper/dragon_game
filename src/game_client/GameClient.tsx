import * as React from "react";
import * as ReactDOM from "react-dom";
import { GameEvent } from "../common/GameEvents";
import { GameState } from "../common/GameState";
import { ClientActions, IClientEvent } from "./ClientEvents";
import { ClientState } from "./ClientState";
import { GamePane } from "./components/GamePane";

export class GameClient {
  public clientState: ClientState;

  constructor(private worker: Worker, public gameState: GameState) {
    this.clientState = Object.freeze({
      isDetailedInfoVisible: false,
      isPaused: false
    });
    this.sendGameEvents = this.sendGameEvents.bind(this);
    this.sendClientEvents = this.sendClientEvents.bind(this);
  }

  public sendGameEvents(events: GameEvent[]) {
    this.worker.postMessage(events);
  }

  public sendClientEvents(events: IClientEvent[]) {
    const updates: Partial<ClientState> = {};
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
    ReactDOM.render(
      <GamePane
        gameState={this.gameState}
        clientState={this.clientState}
        sendGameEvents={this.sendGameEvents}
        sendClientEvents={this.sendClientEvents}
      />,
      document.getElementById("game")
    );
  }
}
