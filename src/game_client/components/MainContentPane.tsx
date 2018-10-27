import * as React from "react";
import { ClientState } from "../../common/ClientState";
import { GameEvent } from "../../common/events/GameEvents";
import { GameState } from "../../common/GameState";
import { BaseCampTab } from "./BaseCampTab";
import { GameMapTab } from "./GameMapTab";

interface MainContentPaneProps {
  clientState: ClientState;
  gameState: GameState;
  sendGameEvents: (e: GameEvent[]) => void;
}

enum ContentTabs {
  BASE_CAMP,
  GAME_MAP
}
interface TabDescriptor {
  name: string;
  selector: () => void;
  isVisible: (state: GameState) => boolean;
  getContent: () => JSX.Element;
  index: number;
}

export class MainContentPane extends React.Component<
  MainContentPaneProps,
  { selectedTab: ContentTabs }
> {
  private tabs: Map<ContentTabs, TabDescriptor>;

  constructor(props: MainContentPaneProps) {
    super(props);
    this.state = {
      selectedTab: ContentTabs.BASE_CAMP
    };

    this.tabs = this.initTabs();
  }

  public render() {
    const tabEntries = Array.from(this.tabs.entries())
      .sort((a, b) => {
        return a[1].index - b[1].index;
      })
      .filter(e => e[1].isVisible(this.props.gameState));

    return (
      <div className="main-content-pane">
        <ul className="main-content-pane-tabs">
          {tabEntries.map(([key, descriptor]) => {
            return (
              <li key={key} className={this.getTabClass(key)} onClick={descriptor.selector}>
                {descriptor.name}
              </li>
            );
          })}
        </ul>
        <div className="main-content-pane-content-wrapper">
          {tabEntries.map(([key, descriptor]) => {
            return (
              <div key={key} className={this.getContentClass(key)}>
                {descriptor.getContent()}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  private getTabClass(key: ContentTabs) {
    let displayClass;
    if (this.state.selectedTab === key) {
      displayClass = "main-content-pane-tab-active";
    } else {
      displayClass = "main-content-pane-tab-inactive";
    }

    return `main-content-pane-tab ${displayClass}`;
  }

  private getContentClass(key: ContentTabs) {
    let displayClass;
    if (this.state.selectedTab === key) {
      displayClass = "main-content-pane-content-active";
    } else {
      displayClass = "main-content-pane-content-inactive";
    }

    return `main-content-pane-content ${displayClass}`;
  }

  private initTabs() {
    const tabs: Map<ContentTabs, TabDescriptor> = new Map();
    tabs.set(ContentTabs.BASE_CAMP, {
      name: "Base Camp",
      selector: this.selectTab.bind(this, ContentTabs.BASE_CAMP),
      isVisible: () => {
        return true;
      },
      getContent: () => {
        return (
          <BaseCampTab
            gameState={this.props.gameState}
            sendGameEvents={this.props.sendGameEvents}
          />
        );
      },
      index: 0
    });
    tabs.set(ContentTabs.GAME_MAP, {
      name: "Map",
      selector: this.selectTab.bind(this, ContentTabs.GAME_MAP),
      isVisible: () => {
        return true;
      },
      getContent: () => {
        return (
          <GameMapTab gameState={this.props.gameState} sendGameEvents={this.props.sendGameEvents} />
        );
      },
      index: 1
    });

    return tabs;
  }

  private selectTab(tab: ContentTabs) {
    this.setState({
      selectedTab: tab
    });
  }
}
