// Pipe and Compose
// This file implements pipe and compose utilities for function composition in JavaScript.
// - pipe: left-to-right execution (f1 -> f2 -> f3)
// - compose: right-to-left execution (f3 -> f2 -> f1)
// Includes async and error-handling variants.
// Useful for building functional pipelines and middleware.

// Pipes input through all functions from left to right.
function pipe(...functions) {
    return function(input) {
        return functions.reduce((result, fn) => fn(result), input);
    };
}

// Composes input through all functions from right to left.
function compose(...functions) {
    return function(input) {
        return functions.reduceRight((result, fn) => fn(result), input);
    };
}

// Pipes input through all functions, with error handling for undefined/null results.
function pipeWithErrorHandling(...functions) {
    return function(input) {
        try {
            return functions.reduce((result, fn) => {
                const nextResult = fn(result);
                if (nextResult === undefined || nextResult === null) {
                    throw new Error('Function returned undefined or null');
                }
                return nextResult;
            }, input);
        } catch (error) {
            console.error('Error in pipe:', error.message);
            throw error;
        }
    };
}

// Pipes input through all async functions from left to right.
async function asyncPipe(...functions) {
    return async function(input) {
        let result = input;
        for (const fn of functions) {
            result = await fn(result);
        }
        return result;
    };
}

// Example utility functions
// Increments input by 1.
const add = (x) => x + 1;
// Multiplies input by 2.
const multiply = (x) => x * 2;
// Squares the input.
const square = (x) => x * x;
// Converts input to a string with prefix.
const toString = (x) => `Result: ${x}`;
// Converts string to uppercase.
const toUpperCase = (str) => str.toUpperCase();

// Async functions
// Asynchronously increments input by 1.
const asyncAdd = async (x) => {
    await new Promise(resolve => setTimeout(resolve, 100));
    return x + 1;
};
// Asynchronously multiplies input by 2.
const asyncMultiply = async (x) => {
    await new Promise(resolve => setTimeout(resolve, 100));
    return x * 2;
};

// Usage examples
const pipedFunction = pipe(add, multiply, square, toString, toUpperCase);
const composedFunction = compose(toUpperCase, toString, square, multiply, add);

const asyncPipedFunction = asyncPipe(asyncAdd, asyncMultiply, square, toString);

// Test the implementations
// Demonstrates usage of all pipe/compose utilities.
function test() {
    console.log('=== Pipe Example ===');
    console.log(pipedFunction(5)); // "RESULT: 144"
    
    console.log('\n=== Compose Example ===');
    console.log(composedFunction(5)); // "RESULT: 144"
    
    console.log('\n=== Pipe with Error Handling ===');
    const safePipe = pipeWithErrorHandling(add, multiply, (x) => {
        if (x > 20) throw new Error('Value too large');
        return x;
    }, square);
    
    try {
        console.log(safePipe(5)); // Error: Value too large
    } catch (error) {
        console.log('Caught error:', error.message);
    }
    
    console.log('\n=== Async Pipe Example ===');
    asyncPipedFunction(5).then(result => {
        console.log(result); // "Result: 144"
    });
}

// test();

module.exports = { 
    pipe, 
    compose, 
    pipeWithErrorHandling, 
    asyncPipe 
}; 