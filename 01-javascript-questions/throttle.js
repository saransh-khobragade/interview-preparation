/*
Throttle Function
------------------
Ensures a function is only called at most once every specified interval.

Use: Useful for scroll, resize, and rate-limiting events.
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