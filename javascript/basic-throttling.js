// Basic Throttling
// This file implements a basic throttle utility that ensures a function is only called at most once every specified interval.
// Useful for optimizing high-frequency events (e.g., scroll, mousemove).

/**
 * Returns a throttled version of the given function that, when invoked repeatedly, 
 * will only call the original function at most once every 'wait' milliseconds.
 * @param {Function} fn - The function to throttle.
 * @param {number} wait - The minimum time interval (in ms) between calls.
 * @returns {Function} The throttled function.
 */
function throttle(fn, wait) {
    let lastTime = 0;
    return function(...args) {
        const now = Date.now();
        if (now - lastTime >= wait) {
            lastTime = now;
            fn.apply(this, args);
        }
    };
}

// Usage example:
// const throttled = throttle(() => console.log('Called!'), 300);
// throttled();

module.exports = { throttle }; 