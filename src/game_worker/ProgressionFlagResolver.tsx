import { GameEvent, GameEventTypes } from "../common/GameEvents";
import { GameProgressionFlag, GameProgressionFlags } from "../common/GameProgressionFlags";
import { GameState } from "../common/GameState";
import { Purchase, Purchases } from "../common/Purchases";

const purchaseFlags: Map<Purchase, GameProgressionFlag> = new Map();
purchaseFlags.set(
  Purchases.BASE_CAMP_HUNT_BABY_WYVERN,
  GameProgressionFlags.BABY_WYVERN_LEATHER_UNLOCKED
);
purchaseFlags.set(
  Purchases.BASE_CAMP_CRAFT_BABY_WYVERN_LEATHER,
  GameProgressionFlags.PLAINS_HUNTER_UNLOCKED
);

export function getProgressionFlagsFromEvents(
  events: GameEvent[],
  state: GameState
): Set<GameProgressionFlag> {
  const newFlags = new Set<GameProgressionFlag>();
  for (const event of events) {
    if (event.eventType === GameEventTypes.PURCHASE) {
      const flag = purchaseFlags.get(event.purchase);
      if (flag !== undefined) {
        newFlags.add(flag);
      }
    }
  }

  return new Set([...newFlags].filter((f) => !state.flags.has(f)));
}
