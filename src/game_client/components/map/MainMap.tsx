import * as React from "react";

const outlinePath = `
  M 10 10
  h 10
  a 20 10 45 0 1 20 0
  h 1
  a 20 10 -45 0 1 20 5
  h 1
  a 20 10 45 0 1 20 -5
  h 1
  a 20 10 -45 0 1 20 0
  h 1
  a 20 10 45 0 1 20 5
  h 1
  a 20 10 -45 0 1 20 -5
  h 1
  a 20 10 45 0 1 20 5
  h 1
  a 20 10 -45 0 1 20 -5
  h 1
  a 20 10 45 0 1 20 5
  h 1
  a 20 10 -45 0 1 20 -5
`;
const outline = <path stroke="black" fill="none" d={outlinePath} />;

export const MainMap = <g>{outline}</g>;
