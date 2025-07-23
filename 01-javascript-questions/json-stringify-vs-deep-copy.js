/*
JSON.stringify vs Deep Copy
---------------------------
Demonstrates the difference between reference copy and deep copy using JSON methods.

Note: JSON methods do not handle functions, undefined, or circular references.
*/

const obj = { a: 1, b: { c: 2 } };
const refCopy = obj;
const deepCopy = JSON.parse(JSON.stringify(obj));

module.exports = { refCopy, deepCopy }; 