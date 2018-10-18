import { GameProgressionFlags, GameState } from "../GameState";
import { GameEvent, GameEventTypes, GameStateModificationHandler } from "./GameEvents";

export class SetProgressionFlagEvent implements GameEvent {
  public readonly eventType = GameEventTypes.SET_PROGRESSION_FLAG;
  constructor(public flag: GameProgressionFlags) {}
}

export const SetProgressionFlagEventHandlers: GameStateModificationHandler = {
  gameState: (state: GameState, e: SetProgressionFlagEvent) => {
    state.flags.add(e.flag);
    return state;
  }
};

export function IsSetProgressionFlagEvent(e: GameEvent): e is SetProgressionFlagEvent {
  return e.eventType === GameEventTypes.SET_PROGRESSION_FLAG;
}
