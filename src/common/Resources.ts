export enum ResourceTypes {
  BABY_WYVERN_BONE = "Baby Wyvern Bone",
  BABY_WYVERN_HIDE = "Baby Wyvern Hide",
  BABY_WYVERN_LEATHER = "Baby Wyvern Leather",
  PLAINS_HUNTER = "Plains Hunter",
  TANNER = "Tanner",
  WYVERN_BONE = "Wyvern Bone",
  WYVERN_HIDE = "Wyvern Hide"
}

export enum ResourceCategories {
  DRAGON_REMAINS = "Dragon Remains",
  CRAFTED = "Crafted",
  HUNTERS = "Hunters",
  WORKERS = "Workers"
}

const remainsResources = [
  ResourceTypes.BABY_WYVERN_BONE,
  ResourceTypes.BABY_WYVERN_HIDE,
  ResourceTypes.WYVERN_BONE,
  ResourceTypes.WYVERN_HIDE
];
const craftedResources = [ResourceTypes.BABY_WYVERN_LEATHER];
const hunterResources = [ResourceTypes.PLAINS_HUNTER];
const workerResources = [ResourceTypes.TANNER];

export const ResourceCategoriesMap: Map<ResourceCategories, ResourceTypes[]> = new Map([
  [ResourceCategories.DRAGON_REMAINS, remainsResources],
  [ResourceCategories.CRAFTED, craftedResources],
  [ResourceCategories.HUNTERS, hunterResources],
  [ResourceCategories.WORKERS, workerResources]
]);
