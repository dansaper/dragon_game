export const Purchases = {
  BASE_CAMP_HUNT_BABY_WYVERN: "BASE_CAMP_HUNT_BABY_WYVERN",
  BASE_CAMP_CRAFT_BABY_WYVERN_LEATHER: "BASE_CAMP_CRAFT_BABY_WYVERN_LEATHER",
  BASE_CAMP_HIRE_PLAINS_HUNTER: "BASE_CAMP_HIRE_PLAINS_HUNTER",
} as const;

export type Purchase = keyof typeof Purchases;
