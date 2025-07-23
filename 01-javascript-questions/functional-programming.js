/*
Functional Programming in JavaScript
-------------------------------------
Core concepts: pure functions, higher-order functions, immutability, map/filter/reduce, function composition.
*/

// Pure Function: Output depends only on input, no side effects
function add(a, b) { return a + b; }

// Higher-Order Function: Takes/returns a function
function twice(fn) { return x => fn(fn(x)); }

// Immutability: Avoid mutating data
const arr = [1, 2, 3];
const newArr = [...arr, 4]; // does not mutate arr

// Map, Filter, Reduce
const nums = [1, 2, 3, 4];
const mapped = nums.map(x => x * 2); // [2,4,6,8]
const filtered = nums.filter(x => x % 2 === 0); // [2,4]
const reduced = nums.reduce((a, b) => a + b, 0); // 10

// Function Composition
const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x);
const add1 = x => x + 1;
const double = x => x * 2;
const composed = compose(double, add1); // double(add1(x))

module.exports = { add, twice, newArr, mapped, filtered, reduced, composed }; 