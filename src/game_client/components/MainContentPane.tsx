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
  index: number;
}

export class MainContentPane extends React.PureComponent<
  MainContentPaneProps,
  { selectedTab: ContentTabs }
> {
  private tabs: Map<ContentTabs, TabDescriptor>;

  constructor(props: MainContentPaneProps) {
    super(props);
    this.state = {
      selectedTab: ContentTabs.BASE_CAMP
    };

    this.tabs = new Map();
    this.tabs.set(ContentTabs.BASE_CAMP, {
      name: "Base Camp",
      selector: this.selectTab.bind(this, ContentTabs.BASE_CAMP),
      isVisible: () => {
        return true;
      },
      index: 0
    });
    this.tabs.set(ContentTabs.GAME_MAP, {
      name: "Map",
      selector: this.selectTab.bind(this, ContentTabs.GAME_MAP),
      isVisible: () => {
        return true;
      },
      index: 1
    });
  }

  public render() {
    return (
      <div className="main-content-pane">
        <div className="main-content-pane-tabs">
          {Array.from(this.tabs.entries())
            .sort((a, b) => {
              return a[1].index - b[1].index;
            })
            .map(([key, descriptor]) => {
              let tabClass: string;
              if (descriptor.isVisible(this.props.gameState)) {
                tabClass = "main-content-pane-tab-hidden";
              } else if (this.state.selectedTab === key) {
                tabClass = "main-content-pane-tab-active";
              } else {
                tabClass = "main-content-pane-tab-inactive";
              }

              return (
                <div
                  key={key}
                  className={`main-content-pane-tab ${tabClass}`}
                  onClick={descriptor.selector}
                >
                  {descriptor.name}
                </div>
              );
            })}
        </div>
        <div className="main-content-pane-content">
          <BaseCampTab
            gameState={this.props.gameState}
            sendGameEvents={this.props.sendGameEvents}
          />
          <GameMapTab gameState={this.props.gameState} sendGameEvents={this.props.sendGameEvents} />
        </div>
      </div>
    );
  }

  private selectTab(tab: ContentTabs) {
    this.setState({
      selectedTab: tab
    });
  }
}
