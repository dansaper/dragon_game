import * as React from "react";
import { DetailedInfoKeys } from "../../DetailedInfo";
import { HoveringInfoButton } from "./HoveringInfoButton";

interface ButtonWithInfoProps {
  onClick: () => void;
  isVisible: () => boolean;
  isDisabled: () => boolean;
  title: string;
  infoKey?: DetailedInfoKeys;
  renderContent?: () => JSX.Element;
  disabledInfoButtonOnDisable?: boolean;
}

export const ButtonWithInfo: React.FunctionComponent<ButtonWithInfoProps> = (props) => {
  const isDisabled = props.isDisabled();
  const isVisible = props.isVisible();

  const topLevelClasses = `button-with-info ${!isVisible ? "button-with-info-hidden" : ""} ${
    isDisabled ? "button-with-info-disabled" : ""
  }`;
  return (
    <div className={topLevelClasses} onClick={!isDisabled ? props.onClick : undefined}>
      <div className={"button-with-info-text"}>{props.title}</div>
      <div className={"button-with-info-content"}>
        {props.renderContent ? props.renderContent() : undefined}
      </div>
      {props.infoKey === undefined ? undefined : (
        <HoveringInfoButton
          isDisabled={!!props.disabledInfoButtonOnDisable && isDisabled}
          infoKey={props.infoKey}
        />
      )}
    </div>
  );
};
