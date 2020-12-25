import { Upgrade } from "../../common/Upgrades";
import { DetailedInfoKey } from "../DetailedInfo";

export interface ClientUpgradeButtonDefinition {
  upgrade: Upgrade;
  title: string;
  details: string;
  infoKey?: DetailedInfoKey;
}
