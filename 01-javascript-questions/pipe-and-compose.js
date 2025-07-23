/*
Pipe and Compose Functions
--------------------------
Pipe: Left-to-right function composition.
Compose: Right-to-left function composition.

Approach: Use reduce to chain function calls.
*/

function pipe(...fns) {
    return x => fns.reduce((v, f) => f(v), x);
}

function compose(...fns) {
    return x => fns.reduceRight((v, f) => f(v), x);
}

module.exports = { pipe, compose }; 