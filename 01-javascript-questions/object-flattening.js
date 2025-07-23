// Object Flattening - Dot Notation

function flattenObject(obj, prefix = '', result = {}) {
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            const value = obj[key];
            const newKey = prefix ? `${prefix}.${key}` : key;
            if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
                flattenObject(value, newKey, result);
            } else {
                result[newKey] = value;
            }
        }
    }
    return result;
}

// Usage:
// flattenObject({a:{b:1},c:2}) // { 'a.b': 1, c: 2 }

module.exports = { flattenObject }; 