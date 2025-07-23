/*
Deep Clone Object
------------------
Creates a deep copy of an object, recursively copying all nested objects and arrays.

Approach: Use recursion and Array.isArray to handle arrays and objects.
*/

function deepClone(obj) {
    if (obj === null || typeof obj !== 'object') return obj;
    if (Array.isArray(obj)) return obj.map(deepClone);
    const clone = {};
    for (const key in obj) {
        clone[key] = deepClone(obj[key]);
    }
    return clone;
}

module.exports = deepClone; 