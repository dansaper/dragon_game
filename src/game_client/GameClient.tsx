import * as React from "react";
import * as ReactDOM from "react-dom";
import { ClientState, getEmptyClientState } from "./ClientState";
import { GameEvent, GameEventTypes, SetProgressionFlagEvent } from "../common/GameEvents";
import { GameState, getEmptyModel } from "../common/GameState";
import { GamePane } from "./components/GamePane";
import { resolveNeededProgressionFlags } from "./ProgressionFlagResolver";
import { ClientEvent } from "./client_events/ClientEvents";
import { ClientStateUpdater } from "./ClientStateUpdater";

class GameClientClass {
  private clientState: ClientState;
  private gameState: GameState;
  private sendEventsToWorker: ((events: GameEvent[]) => void) | undefined;
  private pauseWorker: (() => void) | undefined;
  constructor() {
    this.clientState = getEmptyClientState();
    this.gameState = getEmptyModel();
    this.sendGameEvents = this.sendGameEvents.bind(this);
  }

  public init(sendEventsToWorker: (events: GameEvent[]) => void, pauseWorker: () => void) {
    this.sendEventsToWorker = sendEventsToWorker;
    this.pauseWorker = pauseWorker;
  }

  public consumeNewGameState(gameState: GameState) {
    this.gameState = gameState;
    this.renderGame();
  }

  public sendGameEvents(events: GameEvent[]) {
    const eventsWithProgress = this.addProgressionFlagEvents(this.gameState, events);
    if (this.sendEventsToWorker) {
      this.sendEventsToWorker(eventsWithProgress);
    } else {
      throw new Error("Game Event before initialization");
    }
  }

  public sendClientEvents(events: ClientEvent[]) {
    const newClientState = ClientStateUpdater.handleEvents(this.clientState, events);
    this.clientState = newClientState;
    this.renderGame();
  }

  public toggleGamePause() {
    this.clientState = {
      ...this.clientState,
      isPaused: !this.clientState.isPaused,
    };
    if (this.pauseWorker) {
      this.pauseWorker();
    } else {
      throw new Error("Game Pause before init");
    }

    this.renderGame();
  }

  public renderGame() {
    ReactDOM.render(
      <GamePane gameState={this.gameState} clientState={this.clientState} />,
      document.getElementById("game")
    );
  }

  private addProgressionFlagEvents(state: GameState, events: GameEvent[]): GameEvent[] {
    const neededFlags = resolveNeededProgressionFlags(events, state.flags);
    const newEvents = [...neededFlags].map((flag) => {
      const newFlag: SetProgressionFlagEvent = {
        eventType: GameEventTypes.SET_PROGRESSION_FLAG,
        flag: flag,
      };
      return newFlag;
    });

    return [...events, ...newEvents];
  }
}

export const GameClient = new GameClientClass();
