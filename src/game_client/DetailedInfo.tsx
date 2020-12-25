import * as React from "react";

export class DetailedInfo {
  constructor(public readonly title: string, public readonly content: JSX.Element) {}
}

const DefaultInfo = new DetailedInfo(
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

export const DetailedInfoKeys = {
  DEFAULT_INFO: "DEFAULT_INFO",
  NO_INFO: "NO_INFO",
} as const;

export type DetailedInfoKey = keyof typeof DetailedInfoKeys;

export const DetailedInfoKeysMap: Map<DetailedInfoKey, DetailedInfo> = new Map();
DetailedInfoKeysMap.set(DetailedInfoKeys.DEFAULT_INFO, DefaultInfo);
DetailedInfoKeysMap.set(
  DetailedInfoKeys.NO_INFO,
  new DetailedInfo("Nothing to say about this", <div />)
);
