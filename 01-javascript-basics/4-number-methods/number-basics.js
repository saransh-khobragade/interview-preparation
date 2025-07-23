/**
 * Number Methods - Basic Operations
 */

const num = 123.456789;
const floatNum = 3.14159;
const intNum = 42;

console.log('=== BASIC NUMBER METHODS ===');

// .toString(radix)
// Params: radix (base) - number between 2 and 36 (optional, default: 10)
// Returns: string representation of number
// Modifies: does NOT modify original number
console.log('To string:', num.toString()); // '123.456789'
console.log('To binary:', intNum.toString(2)); // '101010'
console.log('To hex:', intNum.toString(16)); // '2a'

// .toFixed(digits)
// Params: number of digits after decimal point (0-100)
// Returns: string with fixed decimal places
// Modifies: does NOT modify original number
console.log('Fixed 2 digits:', num.toFixed(2)); // '123.46'
console.log('Fixed 0 digits:', num.toFixed(0)); // '123'

// .toPrecision(precision)
// Params: number of significant digits (1-100)
// Returns: string with specified precision
// Modifies: does NOT modify original number
console.log('Precision 4:', num.toPrecision(4)); // '123.5'
console.log('Precision 2:', num.toPrecision(2)); // '1.2e+2'

// .toExponential(fractionDigits)
// Params: number of digits after decimal in exponential notation (optional)
// Returns: string in exponential notation
// Modifies: does NOT modify original number
console.log('Exponential:', num.toExponential()); // '1.23456789e+2'
console.log('Exponential 2 digits:', num.toExponential(2)); // '1.23e+2'

// Number.parseInt(string, radix)
// Params: string to parse, radix (base) - optional
// Returns: integer parsed from string (NaN if can't parse)
// Static method: called on Number constructor
console.log('Parse int:', Number.parseInt('123.45')); // 123
console.log('Parse int binary:', Number.parseInt('1010', 2)); // 10

// Number.parseFloat(string)
// Params: string to parse
// Returns: floating point number parsed from string (NaN if can't parse)
// Static method: called on Number constructor
console.log('Parse float:', Number.parseFloat('123.45abc')); // 123.45

// Number.isInteger(value)
// Params: value to test
// Returns: true if value is an integer
// Static method: called on Number constructor
console.log('Is integer 42:', Number.isInteger(42)); // true
console.log('Is integer 42.0:', Number.isInteger(42.0)); // true
console.log('Is integer 42.5:', Number.isInteger(42.5)); // false

// Number.isNaN(value)
// Params: value to test
// Returns: true if value is NaN
// Static method: called on Number constructor
console.log('Is NaN:', Number.isNaN(NaN)); // true
console.log('Is NaN string:', Number.isNaN('hello')); // false (doesn't coerce)

// Number.isFinite(value)
// Params: value to test
// Returns: true if value is finite number
// Static method: called on Number constructor
console.log('Is finite 42:', Number.isFinite(42)); // true
console.log('Is finite Infinity:', Number.isFinite(Infinity)); // false

// Math.round(x) / Math.floor(x) / Math.ceil(x)
// Params: number to round
// Returns: rounded number
// Static methods: called on Math object
console.log('Round:', Math.round(floatNum)); // 3
console.log('Floor:', Math.floor(floatNum)); // 3
console.log('Ceil:', Math.ceil(floatNum)); // 4

// Math.abs(x)
// Params: number
// Returns: absolute value
// Static method: called on Math object
console.log('Absolute:', Math.abs(-42)); // 42

// Math.max(value1, value2, ...) / Math.min(value1, value2, ...)
// Params: numbers to compare
// Returns: largest/smallest number
// Static methods: called on Math object
console.log('Max:', Math.max(10, 5, 20, 3)); // 20
console.log('Min:', Math.min(10, 5, 20, 3)); // 3

// Math.random()
// Params: none
// Returns: random number between 0 (inclusive) and 1 (exclusive)
// Static method: called on Math object
console.log('Random:', Math.random()); // e.g., 0.7834592834

// Math.pow(base, exponent) / Math.sqrt(x)
// Params: base and exponent / number
// Returns: base^exponent / square root
// Static methods: called on Math object
console.log('Power 2^3:', Math.pow(2, 3)); // 8
console.log('Square root of 16:', Math.sqrt(16)); // 4 