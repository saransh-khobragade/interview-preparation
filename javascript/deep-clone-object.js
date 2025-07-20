// Deep Clone Object - Handles arrays, objects, dates, regex

function deepClone(obj, hash = new WeakMap()) {
    if (Object(obj) !== obj) return obj; // primitives
    if (hash.has(obj)) return hash.get(obj); // cyclic reference
    let result;
    if (Array.isArray(obj)) {
        result = [];
        hash.set(obj, result);
        obj.forEach((item, i) => {
            result[i] = deepClone(item, hash);
        });
        return result;
    }
    if (obj instanceof Date) return new Date(obj);
    if (obj instanceof RegExp) return new RegExp(obj);
    result = {};
    hash.set(obj, result);
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            result[key] = deepClone(obj[key], hash);
        }
    }
    return result;
}

// Usage:
// deepClone({a:1, b:[2,3], c:{d:4}})

module.exports = { deepClone }; 