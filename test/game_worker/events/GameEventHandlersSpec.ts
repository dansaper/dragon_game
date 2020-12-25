import { GameEventTypes } from "../../../src/common/GameEvents";
import { GameProgressionFlags } from "../../../src/common/GameProgressionFlags";
import { GameState } from "../../../src/common/GameState";
import { Purchases } from "../../../src/common/Purchases";
import { ResourceTypes } from "../../../src/common/Resources";
import { Upgrades } from "../../../src/common/Upgrades";
import {
  handlePurchaseEvent,
  handlePurchaseUpgradeEvent,
} from "../../../src/game_worker/events/GameEventHandlers";

jest.mock("../../../src/game_worker/Logger");

describe("GameEventHandlers", () => {
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

  describe("handlePurchaseEvent", () => {
    it("should throw for unknown event", () => {
      expect(() => {
        handlePurchaseEvent(state, {
          eventType: GameEventTypes.PURCHASE,
          purchase: "Foo" as any,
        });
      }).toThrow();
    });

    it("should throw if event prerequisites are not met", () => {
      state.flags = new Set();
      expect(() => {
        handlePurchaseEvent(state, {
          eventType: GameEventTypes.PURCHASE,
          purchase: Purchases.BASE_CAMP_CRAFT_BABY_WYVERN_LEATHER,
        });
      }).toThrow();
    });

    it("should remove the cost and add the result", () => {
      state.resources.set(ResourceTypes.BABY_WYVERN_HIDE, 7);
      const result = handlePurchaseEvent(state, {
        eventType: GameEventTypes.PURCHASE,
        purchase: Purchases.BASE_CAMP_CRAFT_BABY_WYVERN_LEATHER,
      });
      expect(result.resources).toEqual(
        new Map([
          [ResourceTypes.DRAGON_BONE, 5],
          [ResourceTypes.BABY_WYVERN_BONE, 1],
          [ResourceTypes.BABY_WYVERN_HIDE, 2],
          [ResourceTypes.BABY_WYVERN_LEATHER, 1],
        ])
      );
    });

    it("should throw if cost would decrease resource to negative", () => {
      state.resources.set(ResourceTypes.BABY_WYVERN_HIDE, 3);
      expect(() => {
        handlePurchaseEvent(state, {
          eventType: GameEventTypes.PURCHASE,
          purchase: Purchases.BASE_CAMP_CRAFT_BABY_WYVERN_LEATHER,
        });
      }).toThrow();
    });
  });

  describe("handlePurchaseUpgradeEvent", () => {
    it("should throw for unknown event", () => {
      expect(() => {
        handlePurchaseUpgradeEvent(state, {
          eventType: GameEventTypes.PURCHASE_UPGRADE,
          upgrade: "Foo" as any,
        });
      }).toThrow();
    });

    it("should throw if event prerequisites are not met", () => {
      expect(() => {
        handlePurchaseUpgradeEvent(state, {
          eventType: GameEventTypes.PURCHASE_UPGRADE,
          upgrade: Upgrades.HUNTER_STRONG_BONE_BLADES,
        });
      }).toThrow();
    });

    it("should remove the cost and set the upgrade", () => {
      state.resources.set(ResourceTypes.BABY_WYVERN_BONE, 10);
      const result = handlePurchaseUpgradeEvent(state, {
        eventType: GameEventTypes.PURCHASE_UPGRADE,
        upgrade: Upgrades.HUNTER_WEAK_BONE_BOWS,
      });
      expect(result.resources).toEqual(
        new Map([
          [ResourceTypes.DRAGON_BONE, 5],
          [ResourceTypes.BABY_WYVERN_BONE, 5],
        ])
      );
      expect(result.upgrades).toEqual(
        new Set([Upgrades.HUNTER_WEAK_BONE_BLADES, Upgrades.HUNTER_WEAK_BONE_BOWS])
      );
    });

    it("should throw if cost would decrease resource to negative", () => {
      expect(() => {
        handlePurchaseUpgradeEvent(state, {
          eventType: GameEventTypes.PURCHASE_UPGRADE,
          upgrade: Upgrades.HUNTER_WEAK_BONE_BOWS,
        });
      }).toThrow();
    });
  });
});
