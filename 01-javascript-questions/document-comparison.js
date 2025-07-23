// Document Comparison - Deep Equality for Objects, Direct for Strings

function deepEqual(a, b) {
    if (a === b) return true;
    if (typeof a !== typeof b) return false;
    if (typeof a !== 'object' || a === null || b === null) return false;
    if (Array.isArray(a) !== Array.isArray(b)) return false;
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);
    if (keysA.length !== keysB.length) return false;
    for (const key of keysA) {
        if (!keysB.includes(key) || !deepEqual(a[key], b[key])) return false;
    }
    return true;
}

function compareDocuments(doc1, doc2) {
    if (typeof doc1 === 'string' && typeof doc2 === 'string') {
        return doc1 === doc2;
    }
    return deepEqual(doc1, doc2);
}

// Usage:
// compareDocuments({a:1, b:[2,3]}, {a:1, b:[2,3]}) // true
// compareDocuments('hello', 'hello') // true

module.exports = { compareDocuments, deepEqual }; 