/*
Debounce with Leading and Trailing Options
------------------------------------------
Debounces a function, allowing control over whether it fires at the start (leading) and/or end (trailing) of the wait period.

Approach: Use a timer and flags for leading/trailing calls.
*/

function debounce(fn, delay, { leading = false, trailing = true } = {}) {
    let timer, called = false;
    return function(...args) {
        if (leading && !timer && !called) {
            fn.apply(this, args);
            called = true;
        }
        clearTimeout(timer);
        timer = setTimeout(() => {
            if (trailing && (!leading || called)) fn.apply(this, args);
            timer = null;
            called = false;
        }, delay);
    };
}

module.exports = debounce; 