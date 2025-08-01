/*
Basic Throttle
---------------
Ensures a function is only called at most once every specified interval.
*/

function throttle(fn, delay) {
    let last = 0;
    return function(...args) {
        const now = Date.now();
        if (now - last >= delay) {
            last = now;
            fn.apply(this, args);
        }
    };
}

module.exports = throttle; 