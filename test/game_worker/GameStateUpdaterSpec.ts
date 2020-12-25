import { GameEvent, GameEventTypes } from "../../src/common/GameEvents";
import { GameProgressionFlags } from "../../src/common/GameProgressionFlags";
import { GameState } from "../../src/common/GameState";
import { Purchases } from "../../src/common/Purchases";
import { ResourceTypes } from "../../src/common/Resources";
import { Upgrades } from "../../src/common/Upgrades";
import { GameStateUpdater } from "../../src/game_worker/GameStateUpdater";

describe("GameStateUpdater", () => {
  let state: GameState;
  beforeEach(() => {
    state = {
      resources: new Map([
        [ResourceTypes.DRAGON_BONE, 5],
        [ResourceTypes.BABY_WYVERN_BONE, 1],
      ]),
      flags: new Set(),
      upgrades: new Set([Upgrades.HUNTER_WEAK_BONE_BLADES]),
    };
  });

  describe("handleEvents", () => {
    it("should handle purchase events", () => {
      const event: GameEvent = {
        eventType: GameEventTypes.PURCHASE,
        purchase: Purchases.BASE_CAMP_HUNT_BABY_WYVERN,
      };

      const result = new GameStateUpdater().handleEvents(state, [event]);
      expect(result).not.toBe(state);
      expect(result.resources).toEqual(
        new Map([
          [ResourceTypes.DRAGON_BONE, 5],
          [ResourceTypes.BABY_WYVERN_BONE, 2],
          [ResourceTypes.BABY_WYVERN_HIDE, 1],
        ])
      );
      expect(result.flags).toEqual(new Set([GameProgressionFlags.BABY_WYVERN_LEATHER_UNLOCKED]));
      expect(result.upgrades).toEqual(state.upgrades);
    });

    it("should handle upgrade events", () => {
      const event: GameEvent = {
        eventType: GameEventTypes.PURCHASE_UPGRADE,
        upgrade: Upgrades.HUNTER_WEAK_ARMOR,
      };

      state.resources.set(ResourceTypes.BABY_WYVERN_BONE, 10);
      state.resources.set(ResourceTypes.BABY_WYVERN_HIDE, 10);
      state.resources.set(ResourceTypes.BABY_WYVERN_LEATHER, 10);

      const result = new GameStateUpdater().handleEvents(state, [event]);
      expect(result).not.toBe(state);
      expect(result.resources).toEqual(
        new Map([
          [ResourceTypes.DRAGON_BONE, 5],
          [ResourceTypes.BABY_WYVERN_BONE, 5],
          [ResourceTypes.BABY_WYVERN_HIDE, 7],
          [ResourceTypes.BABY_WYVERN_LEATHER, 5],
        ])
      );
      expect(result.flags).toEqual(new Set());
      expect(result.upgrades).toEqual(new Set([...state.upgrades, Upgrades.HUNTER_WEAK_ARMOR]));
    });
  });
});
