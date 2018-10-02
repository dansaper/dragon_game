import * as React from "react";
import * as ReactDOM from "react-dom";
import { ClientState } from "../common/ClientState";
import {
  ClientStateModificationHandlers,
  GameEvent,
  GameEventTypes
} from "../common/events/GameEvents";
import { GameState } from "../common/GameState";
import { GamePane } from "./components/GamePane";

export class GameClient {
  public clientState: ClientState;

  constructor(private worker: Worker, public gameState: GameState) {
    this.clientState = {
      isPaused: false,
      isDetailedInfoPanelOpen: false
    };
    this.sendGameEvents = this.sendGameEvents.bind(this);
  }

  public sendGameEvents(events: GameEvent[]) {
    this.handleGameEvents(events);
    this.worker.postMessage(events);

    // Rerender so that we update immediately
    // (In case worker didn't do anything, and decided not to respond with a state)
    this.rerender();
  }

  public rerender() {
    ReactDOM.render(
      <GamePane
        gameState={this.gameState}
        clientState={this.clientState}
        sendGameEvents={this.sendGameEvents}
      />,
      document.getElementById("game")
    );
  }

  private handleGameEvents(events: GameEvent[]) {
    // Handle pause and unpause specially
    if (events[0].eventType === GameEventTypes.TOGGLE_PAUSE) {
      this.clientState.isPaused = !this.clientState.isPaused;
    }

    let current = this.clientState;
    events.forEach(event => {
      const handler = ClientStateModificationHandlers.get(event.eventType);
      if (handler !== undefined) {
        current = handler(current, event);
      }
    });
    this.clientState = Object.assign({}, current);
  }
}
