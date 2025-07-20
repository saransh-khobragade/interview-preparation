// Basic Debouncing
// This file implements a basic debounce utility that delays function execution until after a specified wait time has elapsed since the last call.
// Useful for optimizing event handlers (e.g., resize, scroll, input).

function debounce(fn, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn.apply(this, args), wait);
    };
}

// Usage example:
// const debounced = debounce(() => console.log('Called!'), 300);
// debounced();

module.exports = { debounce }; 