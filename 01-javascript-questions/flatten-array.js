/*
Flatten Array
--------------
Given a nested array, return a new array with all values flattened into a single level.

Approach: Use recursion and Array.reduce.
*/

function flatten(arr) {
    return arr.reduce((acc, val) =>
        Array.isArray(val) ? acc.concat(flatten(val)) : acc.concat(val), []
    );
}

module.exports = flatten; 