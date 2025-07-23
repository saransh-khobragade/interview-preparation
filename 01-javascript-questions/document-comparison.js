/*
Document/Object Comparison
--------------------------
Compares two objects for shallow and deep equality.

Approach: Use recursion for deep equality, Object.keys for shallow.
*/

function shallowEqual(a, b) {
    const ak = Object.keys(a), bk = Object.keys(b);
    if (ak.length !== bk.length) return false;
    return ak.every(k => a[k] === b[k]);
}

function deepEqual(a, b) {
    if (a === b) return true;
    if (typeof a !== 'object' || typeof b !== 'object' || !a || !b) return false;
    const ak = Object.keys(a), bk = Object.keys(b);
    if (ak.length !== bk.length) return false;
    return ak.every(k => deepEqual(a[k], b[k]));
}

module.exports = { shallowEqual, deepEqual }; 