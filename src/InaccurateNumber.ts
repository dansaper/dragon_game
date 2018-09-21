const MAX_ACCURACY = 5;
const MAX_ACCURACY_TO_DISPLAY_NORMALLY = 3;

const POWERS_OF_10 = [
    1, 10, 100, 1000, 10000, 100000, 1000000, 10000000, 100000000, 1000000000, 10000000000
];

const NEGATIVE_POWERS_OF_10 = [
    1, 0.1, 0.01, 0.001, 0.0001, 0.00001, 0.000001, 0.0000001
];

const MAX_VALUE = 100;
const MIN_VALUE = 1;
const VALUE_STEP = 10;
const EXPONENT_STEP = 1;

enum RELATIONSHIPS {
    MUCH_BIGGER,
    CLOSE,
    MUCH_SMALLER
}

export class InaccurateNumber {
    private readonly value: number;
    private readonly exponent: number;
    constructor(value: number, exponent: number) {
        while (value > MAX_VALUE) {
            value /= VALUE_STEP;
            exponent += EXPONENT_STEP;
        }
        while (Math.abs(value) < MIN_VALUE && exponent >= 0) {
            value *= VALUE_STEP;
            exponent -= EXPONENT_STEP;
        }

        if (exponent < 0) {
            value = 0;
            exponent = 0;
        }

        this.value = value;
        this.exponent = exponent;
    }

    add(other: InaccurateNumber): InaccurateNumber {
        const relationshipToMe = this.getRelationshipToMe(other);

        if (relationshipToMe === RELATIONSHIPS.MUCH_BIGGER) {
            return other;
        }
        if (relationshipToMe === RELATIONSHIPS.MUCH_SMALLER) {
            return this;
        }

        const exponentDifference = this.exponent - other.exponent;
        let result : InaccurateNumber;
        if (exponentDifference > 0) {
            const modifiedOtherValue = other.value * NEGATIVE_POWERS_OF_10[exponentDifference];
            result = new InaccurateNumber(this.value + modifiedOtherValue, this.exponent);
        } else {
            const modifiedOtherValue = other.value * POWERS_OF_10[-exponentDifference];
            result = new InaccurateNumber(this.value + modifiedOtherValue, this.exponent);
        }

        return result;
    }

    private getRelationshipToMe(other: InaccurateNumber): RELATIONSHIPS {
        const exponentDifference = this.exponent - other.exponent;
        if (exponentDifference > MAX_ACCURACY) {
            return RELATIONSHIPS.MUCH_SMALLER;
        } else if (exponentDifference < -MAX_ACCURACY) {
            return RELATIONSHIPS.MUCH_BIGGER;
        } else {
            return RELATIONSHIPS.CLOSE;
        }
    }

    equals(other: InaccurateNumber): boolean {
        const relationshipToMe = this.getRelationshipToMe(other);
        if (relationshipToMe !== RELATIONSHIPS.CLOSE) {
            return false; // No chance of equality when numbers are far away
        }

        const exponentDifference = this.exponent - other.exponent;
        const modifiedOtherValue = other.value * (exponentDifference > 0 ? NEGATIVE_POWERS_OF_10[exponentDifference] : POWERS_OF_10[-exponentDifference]);
        const newOther = new InaccurateNumber(modifiedOtherValue, this.exponent);

        const MAX_COMPARISON_PRECISION = 5;

        return newOther.value.toPrecision(MAX_COMPARISON_PRECISION) === this.value.toPrecision(MAX_COMPARISON_PRECISION);
    }

    toString() {
        if (this.exponent < MAX_ACCURACY_TO_DISPLAY_NORMALLY) {
            return `${(this.value * POWERS_OF_10[this.exponent]).toFixed()}`
        }
        return `${Math.floor(this.value).toString()}e+${this.exponent}`;
    }

    toMoreExactString(digits: number) {
        return `${this.value.toFixed(digits)}e+${this.exponent}`;
    }
}