import { GameProgressionFlags } from "../../../src/common/GameProgressionFlags";
import { GameState } from "../../../src/common/GameState";
import { ResourceTypes } from "../../../src/common/Resources";
import { Upgrades } from "../../../src/common/Upgrades";
import {
  modifyResources,
  setProgressionFlag,
  setUpgrade,
} from "../../../src/game_worker/events/GameStateModifiers";

describe("GameStateModifiers", () => {
  let state: GameState;
  beforeEach(() => {
    state = {
      resources: new Map([
        [ResourceTypes.DRAGON_BONE, 5],
        [ResourceTypes.BABY_WYVERN_BONE, 1],
      ]),
      flags: new Set([GameProgressionFlags.BABY_WYVERN_LEATHER_UNLOCKED]),
      upgrades: new Set([Upgrades.HUNTER_WEAK_BONE_BLADES]),
    };
  });

  describe("modifyResources", () => {
    it("should upgrade an existing value", () => {
      const result = modifyResources(state, new Map([[ResourceTypes.DRAGON_BONE, 10]]));
      expect(result.resources).toEqual(
        new Map([
          [ResourceTypes.DRAGON_BONE, 15],
          [ResourceTypes.BABY_WYVERN_BONE, 1],
        ])
      );
    });

    it("should add a new resource", () => {
      const result = modifyResources(state, new Map([[ResourceTypes.BABY_WYVERN_LEATHER, 10]]));
      expect(result.resources).toEqual(
        new Map([
          [ResourceTypes.DRAGON_BONE, 5],
          [ResourceTypes.BABY_WYVERN_BONE, 1],
          [ResourceTypes.BABY_WYVERN_LEATHER, 10],
        ])
      );
    });

    it("should decrease the amount of an existing resource", () => {
      const result = modifyResources(state, new Map([[ResourceTypes.DRAGON_BONE, -3]]));
      expect(result.resources).toEqual(
        new Map([
          [ResourceTypes.DRAGON_BONE, 2],
          [ResourceTypes.BABY_WYVERN_BONE, 1],
        ])
      );
    });

    it("should decrease a resource to negative", () => {
      const result = modifyResources(state, new Map([[ResourceTypes.DRAGON_BONE, -10]]));
      expect(result.resources).toEqual(
        new Map([
          [ResourceTypes.DRAGON_BONE, -5],
          [ResourceTypes.BABY_WYVERN_BONE, 1],
        ])
      );
    });

    it("should handle multiple modifications", () => {
      const result = modifyResources(
        state,
        new Map([
          [ResourceTypes.DRAGON_BONE, -10],
          [ResourceTypes.BABY_WYVERN_BONE, 3],
          [ResourceTypes.BABY_WYVERN_HIDE, 15],
        ])
      );
      expect(result.resources).toEqual(
        new Map([
          [ResourceTypes.DRAGON_BONE, -5],
          [ResourceTypes.BABY_WYVERN_BONE, 4],
          [ResourceTypes.BABY_WYVERN_HIDE, 15],
        ])
      );
    });

    it("should create a copy without modifying the input", () => {
      const result = modifyResources(state, new Map([[ResourceTypes.DRAGON_BONE, 10]]));
      expect(result).not.toBe(state);
      expect(result.resources).not.toBe(state.resources);
      expect(result.flags).toStrictEqual(state.flags);
      expect(result.upgrades).toStrictEqual(state.upgrades);
    });
  });

  describe("setProgressionFlag", () => {
    it("should add a flag", () => {
      const result = setProgressionFlag(state, GameProgressionFlags.PLAINS_HUNTER_UNLOCKED, true);
      expect(result.flags).toEqual(
        new Set([
          GameProgressionFlags.BABY_WYVERN_LEATHER_UNLOCKED,
          GameProgressionFlags.PLAINS_HUNTER_UNLOCKED,
        ])
      );
    });

    it("should remove a flag", () => {
      const result = setProgressionFlag(
        state,
        GameProgressionFlags.BABY_WYVERN_LEATHER_UNLOCKED,
        false
      );
      expect(result.flags).toEqual(new Set());
    });

    it("should create a copy without modifying the input", () => {
      const result = setProgressionFlag(state, GameProgressionFlags.PLAINS_HUNTER_UNLOCKED, true);
      expect(result).not.toBe(state);
      expect(result.flags).not.toBe(state.flags);
      expect(result.resources).toStrictEqual(state.resources);
      expect(result.upgrades).toStrictEqual(state.upgrades);
    });
  });

  describe("setUpgrade", () => {
    it("should add an upgrade", () => {
      const result = setUpgrade(state, Upgrades.HUNTER_WEAK_ARMOR, true);
      expect(result.upgrades).toEqual(
        new Set([Upgrades.HUNTER_WEAK_BONE_BLADES, Upgrades.HUNTER_WEAK_ARMOR])
      );
    });

    it("should remove a flag", () => {
      const result = setUpgrade(state, Upgrades.HUNTER_WEAK_BONE_BLADES, false);
      expect(result.upgrades).toEqual(new Set());
    });

    it("should create a copy without modifying the input", () => {
      const result = setUpgrade(state, Upgrades.HUNTER_WEAK_ARMOR, true);
      expect(result).not.toBe(state);
      expect(result.upgrades).not.toBe(state.upgrades);
      expect(result.resources).toStrictEqual(state.resources);
      expect(result.flags).toStrictEqual(state.flags);
    });
  });
});
