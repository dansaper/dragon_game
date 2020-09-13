import { GameProgressionFlags, GameState } from "../../common/GameState";
import { ResourceTypes } from "../../common/Resources";
import { Upgrades } from "../../common/Upgrades";

export const setResource = (
  state: GameState,
  resourceTypes: ResourceTypes,
  amount: number
): GameState => {
  const newResources = new Map(state.resources);
  newResources.set(resourceTypes, amount);
  return {
    ...state,
    resources: newResources,
  };
};

export const setProgressionFlag = (
  state: GameState,
  flag: GameProgressionFlags,
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

export const setUpgrade = (state: GameState, upgrade: Upgrades, value: boolean): GameState => {
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
