/*
Function Currying
------------------
Transforms a function with multiple arguments into a sequence of functions each taking a single argument.

Approach: Use closures to accumulate arguments.
*/

function curry(fn) {
    return function curried(...args) {
        return args.length >= fn.length
            ? fn.apply(this, args)
            : (...next) => curried.apply(this, args.concat(next));
    };
}

module.exports = curry; 