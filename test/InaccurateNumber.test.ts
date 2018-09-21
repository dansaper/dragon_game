import {InaccurateNumber} from "../src/InaccurateNumber";

test("Creates a small number", () => {
    const n  = new InaccurateNumber(22, 2);
    expect(n.toString()).toBe("2200");
    expect(n.toMoreExactString(1)).toBe("22.0e+2");
});

test("Creates a whose exponent will change up", () => {
    const n  = new InaccurateNumber(22000, 2);
    expect(n.toString()).toBe("22e+5");
    expect(n.toMoreExactString(1)).toBe("22.0e+5");
});

test("Creates a number whose exponent will change down", () => {
    const n  = new InaccurateNumber(.000000001, 15);
    expect(n.toString()).toBe("1e+6");
    expect(n.toMoreExactString(1)).toBe("1.0e+6");
});

test("Creates a number close to 0 whose exponent will change down", () => {
    const n  = new InaccurateNumber(.0001, 4);
    expect(n.toString()).toBe("1");
    expect(n.toMoreExactString(1)).toBe("1.0e+0");
});

test("Creates a number which which is a little too small", () => {
    const n  = new InaccurateNumber(.00001, 4);
    expect(n.toString()).toBe("0");
    expect(n.toMoreExactString(1)).toBe("0.0e+0");
});

test("Creates a number which which is way too small", () => {
    const n  = new InaccurateNumber(.000000001, 6);
    expect(n.toString()).toBe("0");
    expect(n.toMoreExactString(1)).toBe("0.0e+0");
});

test("Creates a negative number", () => {
    const n  = new InaccurateNumber(-1, 1);
    expect(n.toString()).toBe("-10");
    expect(n.toMoreExactString(1)).toBe("-1.0e+1");
});

function testAdd([num1Value, num1Exponent] : [number, number], [num2Value, num2Exponent] : [number, number], 
    inaccurateResult: string, accurateResult: string, accuracy: number = 2) {
    const n  = new InaccurateNumber(num1Value, num1Exponent);
    const m  = new InaccurateNumber(num2Value, num2Exponent);
    test(`Adds ${num2Value}e+${num2Exponent} to ${num1Value}e+${num1Exponent}`, () => {
        const result = n.add(m);
        expect(result.toString()).toBe(inaccurateResult);
        expect(result.toMoreExactString(accuracy)).toBe(accurateResult);
    });
}

testAdd([1, 2], [1, 2], "200", "2.00e+2");
testAdd([1, 2], [1, 1], "110", "1.10e+2");
testAdd([1, 2], [1, 0], "101", "1.01e+2");
testAdd([5, 6], [1, 1], "5e+6", "5.00001e+6", 5);
testAdd([5.5, 15], [1, 2], "5e+15", "5.50e+15");
testAdd([1, 2], [-1, 2], "0", "0.00e+0");
testAdd([4.2, 2], [-1, 1], "410", `4.10e+2`);

test("Repeated Additions", () => {
    const n  = new InaccurateNumber(22, 5);
    const m  = new InaccurateNumber(2, 4);
    let result = n;
    for (let i = 0; i < 14; ++i) {
        result = result.add(m);
    }

    expect(result.toString()).toBe("24e+5");
    expect(result.toMoreExactString(2)).toBe("24.80e+5");
});

function testEquality([num1Value, num1Exponent] : [number, number], [num2Value, num2Exponent] : [number, number], 
    expectedResult: boolean) {
    const n  = new InaccurateNumber(num1Value, num1Exponent);
    const m  = new InaccurateNumber(num2Value, num2Exponent);
    test(`Compares ${num2Value}e+${num2Exponent} to ${num1Value}e+${num1Exponent}`, () => {
        expect(n.equals(m)).toBe(expectedResult);
    });
}

testEquality([1, 2], [1, 2], true);
testEquality([5.5, 7], [0.055, 9], true);