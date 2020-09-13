export enum ResourceTypes {
  // Sentinal for resources that aren't visible to player
  UNKNOWN_RESOURCE = "Unknown Resources",

  BABY_WYVERN_BONE = "Baby Wyvern Bone",
  BABY_WYVERN_HIDE = "Baby Wyvern Hide",
  BABY_WYVERN_LEATHER = "Baby Wyvern Leather",
  WYVERN_BONE = "Wyvern Bone",
  WYVERN_HIDE = "Wyvern Hide",
  WYVERN_LEATHER = "Wyvern Leather",
  MINIATURE_WURM_HIDE = "Miniature Wurm Hide",
  WURM_HIDE = "Wurm Hide",
  DRAGON_BONE = "Dragon Bone",
  DRAGON_HIDE = "Dragon Hide",
  DRAGON_LEATHER = "Dragon Leather",

  PLAINS_HUNTER = "Plains Hunter",
  TANNER = "Tanner",
}

export enum ResourceCategories {
  DRAGON_REMAINS = "Dragon Remains",
  CRAFTED = "Crafted",
  HUNTERS = "Hunters",
  WORKERS = "Workers",
}

const remainsResources = [
  ResourceTypes.BABY_WYVERN_BONE,
  ResourceTypes.BABY_WYVERN_HIDE,
  ResourceTypes.WYVERN_BONE,
  ResourceTypes.WYVERN_HIDE,
  ResourceTypes.MINIATURE_WURM_HIDE,
  ResourceTypes.WURM_HIDE,
  ResourceTypes.DRAGON_BONE,
  ResourceTypes.DRAGON_HIDE,
];
const craftedResources = [
  ResourceTypes.BABY_WYVERN_LEATHER,
  ResourceTypes.WYVERN_LEATHER,
  ResourceTypes.DRAGON_LEATHER,
];
const hunterResources = [ResourceTypes.PLAINS_HUNTER];
const workerResources = [ResourceTypes.TANNER];

export const ResourceCategoriesMap: Map<ResourceCategories, ResourceTypes[]> = new Map([
  [ResourceCategories.DRAGON_REMAINS, remainsResources],
  [ResourceCategories.CRAFTED, craftedResources],
  [ResourceCategories.HUNTERS, hunterResources],
  [ResourceCategories.WORKERS, workerResources],
]);
