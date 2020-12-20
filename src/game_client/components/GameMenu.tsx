import * as React from "react";
import { PauseButton } from "./PauseButton";

interface GameMenuProps {
  onPause: () => void;
  onUnpause: () => void;
  isPaused: boolean;
}

// const giveResources = () => {
//   const makeEvent = (resourceType: ResourceTypes, amount: number): GameEvent => {
//     return {
//       eventType: GameEventTypes.MODIFY_RESOURCE,
//       resourceType: resourceType,
//       modification: amount,
//     };
//   };

//   const events = [
//     makeEvent(ResourceTypes.BABY_WYVERN_BONE, 1000),
//     makeEvent(ResourceTypes.BABY_WYVERN_HIDE, 1000),
//     makeEvent(ResourceTypes.BABY_WYVERN_LEATHER, 1000),
//     makeEvent(ResourceTypes.PLAINS_HUNTER, 1000),
//   ];
//   GameClient.sendGameEvents(events);
// };

export const GameMenu: React.FunctionComponent<GameMenuProps> = (props) => {
  return (
    <div className="game-menu">
      <PauseButton isPaused={props.isPaused} pause={props.onPause} unpause={props.onUnpause} />
      {/* <button onClick={giveResources}>Give Resources</button> */}
    </div>
  );
};
