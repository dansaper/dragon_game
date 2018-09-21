import { IGameEvent } from "../common/GameEvents";
import { Resources } from "../common/GameStateModels";

export class ClientGame {
  constructor(private worker: Worker, public resources: Resources) {}

  public sendEvents(events: IGameEvent[]) {
    this.worker.postMessage(events);
  }
}
