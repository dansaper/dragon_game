import { Upgrades } from "../../../common/Upgrades";

const BUTTON_BORDER_RADIUS = 5;
const BUTTON_WIDTH = 118;
const BUTTON_HEIGHT = 78;

interface Point {
  x: number;
  y: number;
}

interface ButtonRect {
  upperLeft: Point;
  upperRight: Point;
  lowerLeft: Point;
  lowerRight: Point;
}

interface Line {
  start: Point;
  end: Point;
  midpoint: Point;
}

export interface ButtonLocationInfo {
  top: Line;
  bottom: Line;
  left: Line;
  right: Line;
  upperLeft: Point;
  upperRight: Point;
  lowerLeft: Point;
  lowerRight: Point;
  center: Point;
}

function getMidpoint(l: { start: Point; end: Point }): Point {
  return { x: Math.trunc((l.start.x + l.end.x) / 2), y: Math.trunc((l.start.y + l.end.y) / 2) };
}

function buildButtonRect(origin: Point): ButtonRect {
  return {
    upperLeft: { x: origin.x, y: origin.y },
    upperRight: { x: origin.x + BUTTON_WIDTH, y: origin.y },
    lowerLeft: { x: origin.x, y: origin.y + BUTTON_HEIGHT },
    lowerRight: { x: origin.x + BUTTON_WIDTH, y: origin.y + BUTTON_HEIGHT }
  };
}

function calculateButtonLocationInfo(rect: ButtonRect): ButtonLocationInfo {
  const top = {
    start: { x: rect.upperLeft.x + BUTTON_BORDER_RADIUS, y: rect.upperLeft.y },
    end: { x: rect.upperRight.x - BUTTON_BORDER_RADIUS, y: rect.upperRight.y }
  };
  const bottom = {
    start: { x: rect.lowerRight.x - BUTTON_BORDER_RADIUS, y: rect.lowerRight.y },
    end: { x: rect.lowerLeft.x + BUTTON_BORDER_RADIUS, y: rect.lowerLeft.y }
  };
  const left = {
    start: { x: rect.lowerLeft.x, y: rect.lowerLeft.y - BUTTON_BORDER_RADIUS },
    end: { x: rect.upperLeft.x, y: rect.upperLeft.y + BUTTON_BORDER_RADIUS }
  };
  const right = {
    start: { x: rect.upperRight.x, y: rect.upperRight.y + BUTTON_BORDER_RADIUS },
    end: { x: rect.lowerRight.x, y: rect.lowerRight.y - BUTTON_BORDER_RADIUS }
  };

  const computed = {
    top: {
      ...top,
      midpoint: getMidpoint(top)
    },
    bottom: {
      ...bottom,
      midpoint: getMidpoint(bottom)
    },
    left: {
      ...left,
      midpoint: getMidpoint(left)
    },
    right: {
      ...right,
      midpoint: getMidpoint(right)
    },
    ...rect
  };

  return {
    ...computed,
    center: getMidpoint({ start: computed.top.midpoint, end: computed.bottom.midpoint })
  };
}

export const HunterUpgradeButtonDisplayProperties = {
  borderRadius: BUTTON_BORDER_RADIUS,
  width: BUTTON_WIDTH,
  height: BUTTON_HEIGHT,
  maxTextWidth: BUTTON_WIDTH - 2 * BUTTON_BORDER_RADIUS,
  titleFont: "16px Times"
};

export const HunterUpgradeButtonLayout: Map<Upgrades, ButtonLocationInfo> = new Map();
function setLocation(upgrade: Upgrades, topLeft: Point) {
  HunterUpgradeButtonLayout.set(upgrade, calculateButtonLocationInfo(buildButtonRect(topLeft)));
}

// Plains Hunter buttons
setLocation(Upgrades.PLAINS_HUNTER_WEAK_BONE_BOWS, { x: 20, y: 20 });
setLocation(Upgrades.PLAINS_HUNTER_WEAK_LEATHER_BOOTS, { x: 40, y: 120 });
