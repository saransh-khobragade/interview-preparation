/*
Basic Debounce
---------------
Delays function execution until after a specified wait time has elapsed since the last call.
*/

function debounce(fn, delay) {
    let timer;
    return function(...args) {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), delay);
    };
}

module.exports = debounce; 