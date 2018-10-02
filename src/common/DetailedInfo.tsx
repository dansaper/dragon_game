import * as React from "react";

export class DetailedInfo {
  constructor(public readonly title: string, public readonly content: JSX.Element) {}
}

export const DefaultInfo = new DetailedInfo(
  "Basic info",
  (
    <div>
      <p>This is some test</p>
      <p>
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
        ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      </p>
    </div>
  )
);

export enum DetailedInfoKeys {
  DEFAULT_INFO
}

export const DetailedInfoKeysMap: Map<DetailedInfoKeys, DetailedInfo> = new Map();
DetailedInfoKeysMap.set(DetailedInfoKeys.DEFAULT_INFO, DefaultInfo);
