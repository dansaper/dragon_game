import { messageFromWorker, messageToWorker } from "../common/WorkerTypes";
import { GameClient } from "./GameClient";

export interface GameWorkerClientInterface extends Worker {
  postMessage: (ev: messageToWorker) => void;
  onmessage: (ev: MessageEvent<messageFromWorker>) => void;
}

const worker = new Worker("./dist/worker_bundle.js") as GameWorkerClientInterface;

GameClient.init(
  (events) => {
    worker.postMessage(events);
  },
  () => {
    worker.postMessage("toggle_pause");
  }
);

worker.onmessage = (e) => {
  GameClient.consumeNewGameState(e.data);
};
