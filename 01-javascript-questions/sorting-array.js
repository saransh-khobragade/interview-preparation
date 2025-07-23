// Sorting an Array - Numbers, Strings, Objects

// Numbers ascending
function sortNumbersAsc(arr) {
    return arr.slice().sort((a, b) => a - b);
}
// Numbers descending
function sortNumbersDesc(arr) {
    return arr.slice().sort((a, b) => b - a);
}
// Strings (alphabetical)
function sortStrings(arr) {
    return arr.slice().sort();
}
// Objects by key
function sortObjectsByKey(arr, key) {
    return arr.slice().sort((a, b) => {
        if (a[key] < b[key]) return -1;
        if (a[key] > b[key]) return 1;
        return 0;
    });
}

// Usage:
// sortNumbersAsc([3,1,2]) // [1,2,3]
// sortObjectsByKey([{a:2},{a:1}], 'a') // [{a:1},{a:2}]

module.exports = { sortNumbersAsc, sortNumbersDesc, sortStrings, sortObjectsByKey }; 