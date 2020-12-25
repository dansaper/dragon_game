import { GameProgressionFlag } from "../../common/GameProgressionFlags";
import { GameState } from "../../common/GameState";
import { ResourceTypes } from "../../common/Resources";
import { Upgrade } from "../../common/Upgrades";

export const modifyResources = (
  state: GameState,
  modifications: Map<ResourceTypes, number>
): GameState => {
  const newResources = new Map(state.resources);
  modifications.forEach((amount, resourceType) => {
    const previousAmount = newResources.get(resourceType) ?? 0;
    newResources.set(resourceType, previousAmount + amount);
  });

  return {
    ...state,
    resources: newResources,
  };
};

export const setProgressionFlag = (
  state: GameState,
  flag: GameProgressionFlag,
  value: boolean
): GameState => {
  const newFlags = new Set(state.flags);
  if (value) {
    newFlags.add(flag);
  } else {
    newFlags.delete(flag);
  }
  return {
    ...state,
    flags: newFlags,
  };
};

export const setUpgrade = (state: GameState, upgrade: Upgrade, value: boolean): GameState => {
  const newUpgrades = new Set(state.upgrades);
  if (value) {
    newUpgrades.add(upgrade);
  } else {
    newUpgrades.delete(upgrade);
  }
  return {
    ...state,
    upgrades: newUpgrades,
  };
};
