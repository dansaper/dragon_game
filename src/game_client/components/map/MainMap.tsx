import * as React from "react";

function niceHorizontalCurve(height: number, offset: number): string {
  return `q ${offset / 2},${height} ${offset},0 t ${offset},0`;
}
function niceVerticalCurve(width: number, offset: number): string {
  return `q ${width},${offset / 2} 0,${offset} t 0,${offset}`;
}

const horizontalSection = `
  ${niceHorizontalCurve(-10, 20)}
  ${niceHorizontalCurve(-20, 25)}
  ${niceHorizontalCurve(-10, 30)}
  ${niceHorizontalCurve(-10, 20)}
`;

const verticalSection = `
  ${niceVerticalCurve(10, 20)}
  ${niceVerticalCurve(20, 25)}
  ${niceVerticalCurve(10, 30)}
  ${niceVerticalCurve(10, 20)}
`;

const outlinePath = `
  M 50,50
  ${horizontalSection.repeat(10)}
  M 50,50
  ${verticalSection.repeat(10)}
  M 1950,50
  ${verticalSection.repeat(10)}
  M 50,1950
  ${horizontalSection.repeat(10)}
`;
const outline = <path stroke="black" fill="none" d={outlinePath} />;

export const MainMap = <svg viewBox={"0 0 2000 2000"}>{outline}</svg>;
