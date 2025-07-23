/*
Debounce Function
------------------
Limits how often a function can fire. Only executes after a specified delay since the last call.

Use: Useful for input events, resize, scroll, etc.
*/

function debounce(fn, delay) {
    let timer;
    return function(...args) {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), delay);
    };
}

module.exports = debounce; 