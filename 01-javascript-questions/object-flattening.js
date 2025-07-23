/*
Flatten Nested Object
---------------------
Given a nested object, return a new object with flattened keys (dot notation).

Approach: Use recursion to build flattened key paths.
*/

function flattenObject(obj, prefix = '', res = {}) {
    for (const key in obj) {
        const path = prefix ? `${prefix}.${key}` : key;
        if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
            flattenObject(obj[key], path, res);
        } else {
            res[path] = obj[key];
        }
    }
    return res;
}

module.exports = flattenObject; 