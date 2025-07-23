// Flatten Array
// This file provides functions to flatten nested arrays to arbitrary depth.
// Includes both recursive and ES6 one-liner implementations.
// Useful for array manipulation and interview questions.

function flattenArray(arr) {
    const result = [];
    (function flat(input) {
        for (const el of input) {
            if (Array.isArray(el)) {
                flat(el);
            } else {
                result.push(el);
            }
        }
    })(arr);
    return result;
}

// ES6 one-liner
const flattenArrayES6 = arr => arr.flat(Infinity);

// Usage
// flattenArray([1, [2, [3, 4], 5], 6]); // [1,2,3,4,5,6]
// flattenArrayES6([1, [2, [3, 4], 5], 6]); // [1,2,3,4,5,6]

module.exports = { flattenArray, flattenArrayES6 }; 