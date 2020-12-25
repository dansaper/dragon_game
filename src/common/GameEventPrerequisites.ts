import { GameProgressionFlag } from "./GameProgressionFlags";
import { GameState } from "./GameState";
import { Upgrade } from "./Upgrades";

export interface GameEventPrerequisites {
  upgrades?: Upgrade[];
  flags?: GameProgressionFlag[];
}

export interface GameEventPrequisitesCheckResult {
  valid: boolean;
  missingUpgrades: Upgrade[];
  missingFlags: GameProgressionFlag[];
}

export const checkGameEventPrerequisites = (
  state: GameState,
  prerequisites: GameEventPrerequisites
): GameEventPrequisitesCheckResult => {
  const result: GameEventPrequisitesCheckResult = {
    valid: false,
    missingUpgrades: [],
    missingFlags: [],
  };

  if (prerequisites.upgrades) {
    for (const upgrade of prerequisites.upgrades) {
      if (!state.upgrades.has(upgrade)) {
        result.missingUpgrades.push(upgrade);
      }
    }
  }

  if (prerequisites.flags) {
    for (const flag of prerequisites.flags) {
      if (!state.flags.has(flag)) {
        result.missingFlags.push(flag);
      }
    }
  }

  if (result.missingUpgrades.length === 0 && result.missingFlags.length === 0) {
    result.valid = true;
  }

  return result;
};
