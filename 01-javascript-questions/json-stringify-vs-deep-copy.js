// JSON.stringify vs Manual Deep Copy

const { deepClone } = require('./deep-clone-object');

function jsonDeepCopy(obj) {
    return JSON.parse(JSON.stringify(obj));
}

// Usage:
// const a = {x:1, y:[2,3], z:{w:4}};
// const b = jsonDeepCopy(a);
// const c = deepClone(a);

module.exports = { jsonDeepCopy, deepClone }; 