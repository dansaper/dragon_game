export const GameProgressionFlags = {
  BABY_WYVERN_LEATHER_UNLOCKED: "BABY_WYVERN_LEATHER_UNLOCKED",
  PLAINS_HUNTER_UNLOCKED: "PLAINS_HUNTER_UNLOCKED",
} as const;

export type GameProgressionFlag = keyof typeof GameProgressionFlags;
