import * as React from "react";
import { ClientState } from "../ClientState";
import { GameProgressionFlags, GameState } from "../../common/GameState";
import { BaseCampTab } from "./BaseCampTab";
import { HuntersTab } from "./hunters/HuntersTab";
import { GameMapTab } from "./map/GameMapTab";

interface MainContentPaneProps {
  clientState: ClientState;
  gameState: GameState;
}

enum ContentTabs {
  BASE_CAMP = "BASE_CAMP",
  GAME_MAP = "GAME_MAP",
  HUNTERS = "HUNTERS",
}
interface TabDescriptor {
  name: string;
  selector: () => void;
  isVisible: (props: MainContentPaneProps) => boolean;
  getContent: (props: MainContentPaneProps) => JSX.Element;
  index: number;
}

function getTabClass(selectedTab: ContentTabs, key: ContentTabs) {
  let displayClass;
  if (selectedTab === key) {
    displayClass = "main-content-pane-tab-active";
  } else {
    displayClass = "main-content-pane-tab-inactive";
  }

  return `main-content-pane-tab ${displayClass}`;
}

function getContentClass(selectedTab: ContentTabs, key: ContentTabs) {
  let displayClass;
  if (selectedTab === key) {
    displayClass = "main-content-pane-content-active";
  } else {
    displayClass = "main-content-pane-content-inactive";
  }

  return `main-content-pane-content ${displayClass}`;
}

function initTabs(selectTab: (tab: ContentTabs) => void) {
  const tabs: Map<ContentTabs, TabDescriptor> = new Map();
  tabs.set(ContentTabs.BASE_CAMP, {
    name: "Base Camp",
    selector: selectTab.bind(undefined, ContentTabs.BASE_CAMP),
    isVisible: () => {
      return true;
    },
    getContent: (props) => {
      return <BaseCampTab gameState={props.gameState} />;
    },
    index: 0,
  });
  tabs.set(ContentTabs.GAME_MAP, {
    name: "Map",
    selector: selectTab.bind(undefined, ContentTabs.GAME_MAP),
    isVisible: () => {
      return true;
    },
    getContent: (props) => {
      return <GameMapTab gameState={props.gameState} />;
    },
    index: 1,
  });
  tabs.set(ContentTabs.HUNTERS, {
    name: "Hunters",
    selector: selectTab.bind(undefined, ContentTabs.HUNTERS),
    isVisible: (props) => {
      return props.gameState.flags.has(GameProgressionFlags.PLAINS_HUNTER_UNLOCKED);
    },
    getContent: (props) => {
      return <HuntersTab gameState={props.gameState} />;
    },
    index: 2,
  });

  return tabs;
}

export const MainContentPane: React.FunctionComponent<MainContentPaneProps> = (props) => {
  const [selectedTab, setSelectedTab] = React.useState(ContentTabs.BASE_CAMP);

  const tabs = React.useMemo(() => initTabs(setSelectedTab), [setSelectedTab]);

  const tabEntries = Array.from(tabs.entries())
    .sort((a, b) => {
      return a[1].index - b[1].index;
    })
    .filter((e) => e[1].isVisible(props));

  return (
    <div className="main-content-pane">
      <ul className="main-content-pane-tabs">
        {tabEntries.map(([key, descriptor]) => {
          return (
            <li key={key} className={getTabClass(selectedTab, key)} onClick={descriptor.selector}>
              {descriptor.name}
            </li>
          );
        })}
      </ul>
      <div className="main-content-pane-scroll-wrapper">
        <div className="main-content-pane-content-wrapper">
          {tabEntries.map(([key, descriptor]) => {
            return (
              <div key={key} className={getContentClass(selectedTab, key)}>
                {descriptor.getContent(props)}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
