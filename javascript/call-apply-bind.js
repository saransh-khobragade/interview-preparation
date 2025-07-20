// Call, Apply, Bind
// This file demonstrates the use of call, apply, and bind methods to manipulate function context (this) in JavaScript.
// Shows how to invoke functions with different contexts and pre-set arguments.
// Useful for understanding function invocation patterns.

function greet(greeting, punctuation) {
    return `${greeting}, ${this.name}${punctuation}`;
}

const person = { name: 'Alice' };

// call
const callResult = greet.call(person, 'Hello', '!');
// apply
const applyResult = greet.apply(person, ['Hi', '...']);
// bind
const boundGreet = greet.bind(person, 'Hey');
const bindResult = boundGreet('?');

console.log(callResult);   // Hello, Alice!
console.log(applyResult);  // Hi, Alice...
console.log(bindResult);   // Hey, Alice?

module.exports = { greet, person, callResult, applyResult, boundGreet, bindResult }; 