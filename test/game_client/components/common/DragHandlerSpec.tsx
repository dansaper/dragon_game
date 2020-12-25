import { DragHandler } from "../../../../src/game_client/components/common/DragHandler";

describe("DragHandler", () => {
  const bigBoundaries = {
    x: {
      min: -1000,
      max: 1000,
    },
    y: {
      min: -1000,
      max: 1000,
    },
  };

  describe("Drag Significance", () => {
    const bigThreshold = 300;
    const startPoint = { x: 1, y: 1 };

    test("No updates is not significant", () => {
      const handler = new DragHandler(startPoint, { x: 0, y: 0 }, bigBoundaries, 1, bigThreshold);
      expect(handler.getTotalOffset()).toEqual({ x: 0, y: 0 });
    });

    test("Threshold of 0 is significant after any update", () => {
      const handler = new DragHandler(startPoint, { x: 0, y: 0 }, bigBoundaries, 1, 0);
      handler.update({ x: startPoint.x + 1, y: startPoint.y });
      expect(handler.getTotalOffset()).toEqual({ x: 1, y: 0 });
    });

    const notSignificant: Array<[{ x: number; y: number }, string, number?]> = [
      [{ x: startPoint.x, y: startPoint.y }, "same place"],
      [{ x: startPoint.x + 2, y: startPoint.y + 2 }, "small"],
      [{ x: startPoint.x + bigThreshold, y: startPoint.y + bigThreshold }, "+x, +y at threshold"],
      [{ x: startPoint.x + bigThreshold, y: startPoint.y - bigThreshold }, "+x, -y at threshold"],
      [{ x: startPoint.x - bigThreshold, y: startPoint.y + bigThreshold }, "-x, +y at threshold"],
      [{ x: startPoint.x - bigThreshold, y: startPoint.y - bigThreshold }, "-x, -y at threshold"],
      [
        { x: startPoint.x + bigThreshold, y: startPoint.y + bigThreshold },
        "+x, +y at threshold with rate",
        2,
      ],
    ];

    for (const [point, desc, dragRate = 1] of notSignificant) {
      test(`Testing: update { x: ${point.x}, y: ${point.y} } ${
        dragRate !== 1 ? `with drag rate ${dragRate} ` : ""
      }(${desc}) is not significant`, () => {
        const handler = new DragHandler(
          startPoint,
          { x: 0, y: 0 },
          bigBoundaries,
          dragRate,
          bigThreshold
        );
        const before = handler.getTotalOffset();
        handler.update(point);
        expect(handler.getTotalOffset()).toEqual(before);
      });
    }

    const significant: Array<[{ x: number; y: number }, string, number?]> = [
      [{ x: startPoint.x + bigThreshold + 1, y: startPoint.y }, "+x over threshold"],
      [{ x: startPoint.x - bigThreshold - 1, y: startPoint.y }, "-x over threshold"],
      [{ x: startPoint.x, y: startPoint.y + bigThreshold + 1 }, "+y over threshold"],
      [{ x: startPoint.x, y: startPoint.y - bigThreshold - 1 }, "-y over threshold"],
      [
        { x: startPoint.x + bigThreshold + 1, y: startPoint.y + bigThreshold + 1 },
        "+x, +y over threshold",
      ],
      [
        { x: startPoint.x + bigThreshold + 1, y: startPoint.y - bigThreshold - 1 },
        "+x, -y over threshold",
      ],
      [
        { x: startPoint.x - bigThreshold - 1, y: startPoint.y + bigThreshold + 1 },
        "-x, +y over threshold",
      ],
      [
        { x: startPoint.x - bigThreshold - 1, y: startPoint.y - bigThreshold - 1 },
        "-x, -y over threshold",
      ],
      [
        { x: startPoint.x + bigThreshold + 1, y: startPoint.y + 1 },
        "+x, +y over threshold with rate",
        2,
      ],
      [
        { x: startPoint.x + 5 * bigThreshold, y: startPoint.y + 5 * bigThreshold },
        "way over threshold",
      ],
    ];

    for (const [point, desc, dragRate = 1] of significant) {
      test(`Testing: update { x: ${point.x}, y: ${point.y} } ${
        dragRate !== 1 ? `with drag rate ${dragRate} ` : ""
      }(${desc}) is significant`, () => {
        const handler = new DragHandler(
          startPoint,
          { x: 0, y: 0 },
          bigBoundaries,
          dragRate,
          bigThreshold
        );
        const before = handler.getTotalOffset();
        handler.update(point);
        expect(handler.getTotalOffset()).not.toEqual(before);
      });
    }
  });

  describe("Calculation of drag offset (within boundary)", () => {
    describe("No rate change, no initial", () => {
      const noInitial = [
        {
          begin: { x: 1, y: 1 },
          end: { x: 3, y: 3 },
          expected: { x: 2, y: 2 },
        },
        {
          begin: { x: -1, y: -1 },
          end: { x: 3, y: 5 },
          expected: { x: 4, y: 6 },
        },
        {
          begin: { x: 1, y: 1 },
          end: { x: -3, y: 3 },
          expected: { x: -4, y: 2 },
        },
        {
          begin: { x: 1, y: 1 },
          end: { x: 3, y: -3 },
          expected: { x: 2, y: -4 },
        },
        {
          begin: { x: 1, y: 1 },
          end: { x: -3, y: -3 },
          expected: { x: -4, y: -4 },
        },
      ];

      for (const { begin, end, expected } of noInitial) {
        test(`Offset from { x: ${begin.x}, y: ${begin.y} } to { x: ${end.x}, y: ${end.y} } should be { x: ${expected.x}, y: ${expected.y} }`, () => {
          const handler = new DragHandler(begin, { x: 0, y: 0 }, bigBoundaries, 1, 0);
          handler.update(end);
          const result = handler.getTotalOffset();
          expect(result).toEqual(expected);
        });
      }
    });

    describe("with rate change, no initial", () => {
      const withRate = [
        {
          begin: { x: 1, y: 1 },
          end: { x: 3, y: 3 },
          expected: { x: 3, y: 3 },
          rate: 1.5,
        },
        {
          begin: { x: 1, y: 1 },
          end: { x: 4, y: 4 },
          expected: { x: 4, y: 4 },
          rate: 1.5,
        },
        {
          begin: { x: 1, y: 1 },
          end: { x: -5, y: -5 },
          expected: { x: -9, y: -9 },
          rate: 1.5,
        },
        {
          begin: { x: 1, y: 1 },
          end: { x: -6, y: -6 },
          expected: { x: -10, y: -10 },
          rate: 1.5,
        },
      ];

      for (const { begin, end, expected, rate } of withRate) {
        test(`Offset from { x: ${begin.x}, y: ${begin.y} } to { x: ${end.x}, y: ${end.y} } with rate ${rate} should be { x: ${expected.x}, y: ${expected.y} }`, () => {
          const handler = new DragHandler(begin, { x: 0, y: 0 }, bigBoundaries, rate, 0);
          handler.update(end);
          const result = handler.getTotalOffset();
          expect(result).toEqual(expected);
        });
      }
    });

    describe("with initial, no rate change, ", () => {
      const withInitial = [
        {
          begin: { x: 1, y: 1 },
          end: { x: 3, y: 3 },
          initial: { x: 4, y: -3 },
          expected: { x: 6, y: -1 },
        },
      ];

      for (const { begin, end, expected, initial } of withInitial) {
        test(`Offset from { x: ${begin.x}, y: ${begin.y} } to { x: ${end.x}, y: ${end.y} } with initial offset { x: ${initial.x}, y: ${initial.y} } should be { x: ${expected.x}, y: ${expected.y} }`, () => {
          const handler = new DragHandler(begin, initial, bigBoundaries, 1, 0);
          handler.update(end);
          const result = handler.getTotalOffset();
          expect(result).toEqual(expected);
        });
      }
    });

    describe("with initial and rate change, ", () => {
      const withInitialAndRate = [
        {
          begin: { x: 1, y: 1 },
          end: { x: 3, y: 3 },
          initial: { x: 4, y: -3 },
          rate: 1.5,
          expected: { x: 7, y: 0 },
        },
      ];

      for (const { begin, end, expected, rate, initial } of withInitialAndRate) {
        test(`Offset from { x: ${begin.x}, y: ${begin.y} } to { x: ${end.x}, y: ${end.y} } with rate ${rate} and initial offset { x: ${initial.x}, y: ${initial.y} } should be { x: ${expected.x}, y: ${expected.y} }`, () => {
          const handler = new DragHandler(begin, initial, bigBoundaries, rate, 0);
          handler.update(end);
          const result = handler.getTotalOffset();
          expect(result).toEqual(expected);
        });
      }
    });
  });

  describe("Limiting drag offest to boundary", () => {
    const boundaries = {
      x: {
        min: -10,
        max: 10,
      },
      y: {
        min: 50,
        max: 100,
      },
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
      [{ x: 10, y: 100 }, "x at max, y at max", { x: 10, y: 100 }],
    ];

    for (const [point, desc, expected] of testcases) {
      test(`Limit ${desc} to boudary`, () => {
        const handler = new DragHandler({ x: 0, y: 0 }, { x: 0, y: 0 }, boundaries, 1, 0);
        handler.update(point);
        expect(handler.getTotalOffset()).toEqual(expected);
      });
    }

    test("Initial should be taken into account", () => {
      const handler = new DragHandler({ x: 0, y: -2 }, { x: 10, y: 51 }, boundaries, 1, 0);
      handler.update({ x: 1, y: -4 });
      expect(handler.getTotalOffset()).toEqual({ x: 10, y: 50 });
    });
  });

  test("Drag integration", () => {
    const boundaries = {
      x: {
        min: -10,
        max: 10,
      },
      y: {
        min: -1000,
        max: 1000,
      },
    };

    const handler = new DragHandler({ x: 4, y: 4 }, { x: 22, y: 100 }, boundaries, 3.5, 2);
    handler.update({ x: 5, y: 100 });
    const result = handler.getTotalOffset();
    expect(result.x).toBe(10);
    expect(result.y).toBe(436);
  });
});
