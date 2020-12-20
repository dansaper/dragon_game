import { GameProgressionFlags } from "../../../common/GameProgressionFlags";
import { GameState } from "../../../common/GameState";
import { Purchases } from "../../../common/Purchases";
import { DetailedInfoKeys } from "../../DetailedInfo";
import { ClientPurchaseButtonDefinition } from "../ClientPurchaseButtonDefinition";

const HuntBabyWyverns: ClientPurchaseButtonDefinition = {
  purchase: Purchases.BASE_CAMP_HUNT_BABY_WYVERN,
  title: "Hunt for a baby Wyvern",
  infoKey: DetailedInfoKeys.NO_INFO,
  isVisible: () => true,
};

const CraftBabyWyvernLeather: ClientPurchaseButtonDefinition = {
  purchase: Purchases.BASE_CAMP_CRAFT_BABY_WYVERN_LEATHER,
  title: "Craft baby wyvern leather",
  infoKey: DetailedInfoKeys.NO_INFO,
  isVisible: (state) => {
    return state.flags.has(GameProgressionFlags.BABY_WYVERN_LEATHER_UNLOCKED);
  },
};

const HirePlainsHunter: ClientPurchaseButtonDefinition = {
  purchase: Purchases.BASE_CAMP_HIRE_PLAINS_HUNTER,
  title: `Hire a Plains Hunter`,
  infoKey: DetailedInfoKeys.NO_INFO,
  isVisible(state: GameState) {
    return state.flags.has(GameProgressionFlags.PLAINS_HUNTER_UNLOCKED);
  },
};

export { HuntBabyWyverns, CraftBabyWyvernLeather, HirePlainsHunter };
