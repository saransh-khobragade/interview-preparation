/*
Array Polyfills
----------------
Custom implementations of common Array methods: map, filter, reduce, forEach, find, some, every.
*/

Array.prototype.myMap = function(cb) {
    const res = [];
    for (let i = 0; i < this.length; i++) res.push(cb(this[i], i, this));
    return res;
};

Array.prototype.myFilter = function(cb) {
    const res = [];
    for (let i = 0; i < this.length; i++) if (cb(this[i], i, this)) res.push(this[i]);
    return res;
};

Array.prototype.myReduce = function(cb, init) {
    let acc = init === undefined ? this[0] : init;
    let i = init === undefined ? 1 : 0;
    for (; i < this.length; i++) acc = cb(acc, this[i], i, this);
    return acc;
};

Array.prototype.myForEach = function(cb) {
    for (let i = 0; i < this.length; i++) cb(this[i], i, this);
};

Array.prototype.myFind = function(cb) {
    for (let i = 0; i < this.length; i++) if (cb(this[i], i, this)) return this[i];
    return undefined;
};

Array.prototype.mySome = function(cb) {
    for (let i = 0; i < this.length; i++) if (cb(this[i], i, this)) return true;
    return false;
};

Array.prototype.myEvery = function(cb) {
    for (let i = 0; i < this.length; i++) if (!cb(this[i], i, this)) return false;
    return true;
}; 