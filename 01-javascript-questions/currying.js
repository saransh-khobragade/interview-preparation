// Currying - Transform a function so it can be called with fewer arguments at a time

function curry(fn) {
    return function curried(...args) {
        if (args.length >= fn.length) {
            return fn.apply(this, args);
        } else {
            return function(...nextArgs) {
                return curried.apply(this, args.concat(nextArgs));
            };
        }
    };
}

// Usage example:
// function add(a, b, c) { return a + b + c; }
// const curriedAdd = curry(add);
// curriedAdd(1)(2)(3); // 6

module.exports = { curry }; 