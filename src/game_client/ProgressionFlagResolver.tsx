import { GameEvent } from "../common/events/GameEvents";
import { IsResourceModificationEvent } from "../common/events/ResourceModificationEvent";
import { GameProgressionFlags } from "../common/GameState";
import { ResourceTypes } from "../common/Resources";

const resourceGainedFlags: Map<ResourceTypes, GameProgressionFlags> = new Map();
resourceGainedFlags.set(
  ResourceTypes.BABY_WYVERN_HIDE,
  GameProgressionFlags.BABY_WYVERN_LEATHER_UNLOCKED
);
resourceGainedFlags.set(
  ResourceTypes.BABY_WYVERN_LEATHER,
  GameProgressionFlags.PLAINS_HUNTER_UNLOCKED
);

export function resolveNeededProgressionFlags(
  events: GameEvent[],
  current: Set<GameProgressionFlags>
): Set<GameProgressionFlags> {
  const newFlags = new Set<GameProgressionFlags>();
  for (const event of events) {
    if (IsResourceModificationEvent(event) && event.modification > 0) {
      const flag = resourceGainedFlags.get(event.resourceType);
      if (flag !== undefined) {
        newFlags.add(flag);
      }
    }
  }

  return new Set([...newFlags].filter(f => !current.has(f)));
}
