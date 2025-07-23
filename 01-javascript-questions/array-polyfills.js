// Array Polyfills
// This file provides polyfills for common array methods (map, filter, reduce, forEach, some, every, find, findIndex, includes, flat, flatMap).
// Each method is implemented on Array.prototype for learning and interview demonstration purposes.
// Usage: [1,2,3].myMap(x => x * 2); // [2,4,6]

// map
Array.prototype.myMap = function(callback, thisArg) {
    const arr = this;
    const result = [];
    for (let i = 0; i < arr.length; i++) {
        if (i in arr) {
            result.push(callback.call(thisArg, arr[i], i, arr));
        }
    }
    return result;
};

// filter
Array.prototype.myFilter = function(callback, thisArg) {
    const arr = this;
    const result = [];
    for (let i = 0; i < arr.length; i++) {
        if (i in arr && callback.call(thisArg, arr[i], i, arr)) {
            result.push(arr[i]);
        }
    }
    return result;
};

// reduce
Array.prototype.myReduce = function(callback, initialValue) {
    const arr = this;
    let acc = initialValue;
    let i = 0;
    if (acc === undefined) {
        acc = arr[0];
        i = 1;
    }
    for (; i < arr.length; i++) {
        if (i in arr) {
            acc = callback(acc, arr[i], i, arr);
        }
    }
    return acc;
};

// forEach
Array.prototype.myForEach = function(callback, thisArg) {
    const arr = this;
    for (let i = 0; i < arr.length; i++) {
        if (i in arr) {
            callback.call(thisArg, arr[i], i, arr);
        }
    }
};

// some
Array.prototype.mySome = function(callback, thisArg) {
    const arr = this;
    for (let i = 0; i < arr.length; i++) {
        if (i in arr && callback.call(thisArg, arr[i], i, arr)) {
            return true;
        }
    }
    return false;
};

// every
Array.prototype.myEvery = function(callback, thisArg) {
    const arr = this;
    for (let i = 0; i < arr.length; i++) {
        if (i in arr && !callback.call(thisArg, arr[i], i, arr)) {
            return false;
        }
    }
    return true;
};

// find
Array.prototype.myFind = function(callback, thisArg) {
    const arr = this;
    for (let i = 0; i < arr.length; i++) {
        if (i in arr && callback.call(thisArg, arr[i], i, arr)) {
            return arr[i];
        }
    }
    return undefined;
};

// findIndex
Array.prototype.myFindIndex = function(callback, thisArg) {
    const arr = this;
    for (let i = 0; i < arr.length; i++) {
        if (i in arr && callback.call(thisArg, arr[i], i, arr)) {
            return i;
        }
    }
    return -1;
};

// includes
Array.prototype.myIncludes = function(value, fromIndex = 0) {
    const arr = this;
    for (let i = fromIndex; i < arr.length; i++) {
        if (arr[i] === value || (Number.isNaN(arr[i]) && Number.isNaN(value))) {
            return true;
        }
    }
    return false;
};

// flat
Array.prototype.myFlat = function(depth = 1) {
    const arr = this;
    const result = [];
    (function flat(array, d) {
        for (const el of array) {
            if (Array.isArray(el) && d > 0) {
                flat(el, d - 1);
            } else {
                result.push(el);
            }
        }
    })(arr, depth);
    return result;
};

// flatMap
Array.prototype.myFlatMap = function(callback, thisArg) {
    return this.myMap(callback, thisArg).myFlat(1);
};

// Usage example:
// [1,2,3].myMap(x => x * 2); // [2,4,6]

module.exports = {}; 