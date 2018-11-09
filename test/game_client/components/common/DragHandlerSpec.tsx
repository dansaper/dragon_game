import { DragHandler } from "../../../../src/game_client/components/common/DragHandler";

const bigBoundaries = {
  x: {
    min: -1000,
    max: 1000
  },
  y: {
    min: -1000,
    max: 1000
  }
};

describe("Drag Significance", () => {
  const dragRate = 2;
  const threshold = 3;

  test("No updates is not significant", () => {
    const handler = new DragHandler({ x: 1, y: 1 }, bigBoundaries, dragRate, threshold);
    expect(handler.isSignificantDrag).toBe(false);
  });

  test("Threshold of 0 is significant after any update that moves", () => {
    const handler = new DragHandler({ x: 1, y: 1 }, bigBoundaries, dragRate, 0);
    handler.update({ x: 2, y: 1 });
    expect(handler.isSignificantDrag).toBe(true);
  });

  const notSignificant: Array<[{ x: number; y: number }, string]> = [
    [{ x: 1, y: 1 }, "same place"],
    [{ x: 2, y: 2 }, "small"],
    [{ x: 4, y: 4 }, "+x, +y at threshold"],
    [{ x: 4, y: -2 }, "+x, -y at threshold"],
    [{ x: -2, y: 4 }, "-x, +y at threshold"],
    [{ x: -2, y: -2 }, "-x, -y at threshold"]
  ];

  for (const [point, desc] of notSignificant) {
    test(`Testing: update { x: ${point.x}, y: ${point.y} } (${desc}) is not significant`, () => {
      const handler = new DragHandler({ x: 1, y: 1 }, bigBoundaries, dragRate, threshold);
      handler.update(point);
      expect(handler.isSignificantDrag).toBe(false);
    });
  }

  const significant: Array<[{ x: number; y: number }, string]> = [
    [{ x: 5, y: 1 }, "+x over threshold"],
    [{ x: -3, y: 1 }, "-x over threshold"],
    [{ x: 1, y: 5 }, "+y over threshold"],
    [{ x: 1, y: -3 }, "-y over threshold"],
    [{ x: 5, y: 5 }, "+x, +y over threshold"],
    [{ x: 5, y: -3 }, "+x, -y over threshold"],
    [{ x: -3, y: 5 }, "-x, +y over threshold"],
    [{ x: -3, y: -3 }, "-x, -y over threshold"],
    [{ x: 15, y: 22 }, "way over threshold"]
  ];

  for (const [point, desc] of significant) {
    test(`Testing: update { x: ${point.x}, y: ${point.y} } (${desc}) is significant`, () => {
      const handler = new DragHandler({ x: 1, y: 1 }, bigBoundaries, dragRate, threshold);
      handler.update(point);
      expect(handler.isSignificantDrag).toBe(true);
    });
  }
});

describe("Calculation of drag offset (within boundary)", () => {
  describe("No rate change, no external", () => {
    const noExternal = [
      {
        begin: { x: 1, y: 1 },
        end: { x: 3, y: 3 },
        expected: { x: 2, y: 2 }
      },
      {
        begin: { x: -1, y: -1 },
        end: { x: 3, y: 5 },
        expected: { x: 4, y: 6 }
      },
      {
        begin: { x: 1, y: 1 },
        end: { x: -3, y: 3 },
        expected: { x: -4, y: 2 }
      },
      {
        begin: { x: 1, y: 1 },
        end: { x: 3, y: -3 },
        expected: { x: 2, y: -4 }
      },
      {
        begin: { x: 1, y: 1 },
        end: { x: -3, y: -3 },
        expected: { x: -4, y: -4 }
      }
    ];

    for (const { begin, end, expected } of noExternal) {
      test(`Offset from { x: ${begin.x}, y: ${begin.y} } to { x: ${end.x}, y: ${
        end.y
      } } should be { x: ${expected.x}, y: ${expected.y} }`, () => {
        const handler = new DragHandler(begin, bigBoundaries, 1, 0);
        handler.update(end);
        const result = handler.calculateOffset({ x: 0, y: 0 });
        expect(result).toEqual(expected);
      });
    }
  });

  describe("with rate change, no external", () => {
    const withRate = [
      {
        begin: { x: 1, y: 1 },
        end: { x: 3, y: 3 },
        expected: { x: 3, y: 3 },
        rate: 1.5
      },
      {
        begin: { x: 1, y: 1 },
        end: { x: 4, y: 4 },
        expected: { x: 4, y: 4 },
        rate: 1.5
      },
      {
        begin: { x: 1, y: 1 },
        end: { x: -5, y: -5 },
        expected: { x: -9, y: -9 },
        rate: 1.5
      },
      {
        begin: { x: 1, y: 1 },
        end: { x: -6, y: -6 },
        expected: { x: -10, y: -10 },
        rate: 1.5
      }
    ];

    for (const { begin, end, expected, rate } of withRate) {
      test(`Offset from { x: ${begin.x}, y: ${begin.y} } to { x: ${end.x}, y: ${
        end.y
      } } with rate ${rate} should be { x: ${expected.x}, y: ${expected.y} }`, () => {
        const handler = new DragHandler(begin, bigBoundaries, rate, 0);
        handler.update(end);
        const result = handler.calculateOffset({ x: 0, y: 0 });
        expect(result).toEqual(expected);
      });
    }
  });

  describe("with external, no rate change, ", () => {
    const withExternal = [
      {
        begin: { x: 1, y: 1 },
        end: { x: 3, y: 3 },
        external: { x: 4, y: -3 },
        expected: { x: 6, y: -1 }
      }
    ];

    for (const { begin, end, expected, external } of withExternal) {
      test(`Offset from { x: ${begin.x}, y: ${begin.y} } to { x: ${end.x}, y: ${
        end.y
      } } with external offset { x: ${external.x}, y: ${external.y} } should be { x: ${
        expected.x
      }, y: ${expected.y} }`, () => {
        const handler = new DragHandler(begin, bigBoundaries, 1, 0);
        handler.update(end);
        const result = handler.calculateOffset(external);
        expect(result).toEqual(expected);
      });
    }
  });

  describe("with external and rate change, ", () => {
    const withExternalAndRate = [
      {
        begin: { x: 1, y: 1 },
        end: { x: 3, y: 3 },
        external: { x: 4, y: -3 },
        rate: 1.5,
        expected: { x: 7, y: 0 }
      }
    ];

    for (const { begin, end, expected, rate, external } of withExternalAndRate) {
      test(`Offset from { x: ${begin.x}, y: ${begin.y} } to { x: ${end.x}, y: ${
        end.y
      } } with rate ${rate} and external offset { x: ${external.x}, y: ${
        external.y
      } } should be { x: ${expected.x}, y: ${expected.y} }`, () => {
        const handler = new DragHandler(begin, bigBoundaries, rate, 0);
        handler.update(end);
        const result = handler.calculateOffset(external);
        expect(result).toEqual(expected);
      });
    }
  });
});

describe("Limiting drag offest to boundary", () => {
  const boundaries = {
    x: {
      min: -10,
      max: 10
    },
    y: {
      min: 50,
      max: 100
    }
  };

  const testcases: Array<[{ x: number; y: number }, string, { x: number; y: number }]> = [
    [{ x: -11, y: 30 }, "x below min, y below min", { x: -10, y: 50 }],
    [{ x: -11, y: 55 }, "x below min, y in boundary", { x: -10, y: 55 }],
    [{ x: -11, y: 110 }, "x below min, y above max", { x: -10, y: 100 }],
    [{ x: 3, y: 20 }, "x in boundary, y below min", { x: 3, y: 50 }],
    [{ x: 3, y: 121 }, "x in boundary, y above max", { x: 3, y: 100 }],
    [{ x: 22, y: 30 }, "x above min, y below min", { x: 10, y: 50 }],
    [{ x: 22, y: 55 }, "x above min, y in boundary", { x: 10, y: 55 }],
    [{ x: 22, y: 110 }, "x above min, y above max", { x: 10, y: 100 }],
    [{ x: -10, y: 50 }, "x at min, y at min", { x: -10, y: 50 }],
    [{ x: 10, y: 100 }, "x at max, y at max", { x: 10, y: 100 }]
  ];

  for (const [point, desc, expected] of testcases) {
    test(`Limit ${desc} to boudary`, () => {
      const handler = new DragHandler({ x: 0, y: 0 }, boundaries, 1, 0);
      handler.update(point);
      expect(handler.calculateOffset({ x: 0, y: 0 })).toEqual(expected);
    });
  }

  test("External should be taken into account", () => {
    const handler = new DragHandler({ x: 0, y: -2 }, boundaries, 1, 0);
    handler.update({ x: 1, y: -4 });
    expect(handler.calculateOffset({ x: 10, y: 51 })).toEqual({ x: 10, y: 50 });
  });
});

test("Drag integration", () => {
  const boundaries = {
    x: {
      min: -10,
      max: 10
    },
    y: {
      min: -1000,
      max: 1000
    }
  };

  const handler = new DragHandler({ x: 4, y: 4 }, boundaries, 3.5, 2);
  handler.update({ x: 5, y: 100 });
  expect(handler.isSignificantDrag).toBe(true);
  const result = handler.calculateOffset({ x: 22, y: 100 });
  expect(result.x).toBe(10);
  expect(result.y).toBe(436);
});
