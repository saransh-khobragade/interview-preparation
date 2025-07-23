/*
Call, Apply, and Bind in JavaScript
------------------------------------
Demonstrates how to set the 'this' context of a function using call, apply, and bind.
*/

function greet(greeting, punctuation) {
    return `${greeting}, ${this.name}${punctuation}`;
}

const person = { name: 'Alice' };

const callResult = greet.call(person, 'Hello', '!');
const applyResult = greet.apply(person, ['Hi', '?']);
const boundGreet = greet.bind(person, 'Hey', '.');
const bindResult = boundGreet();

module.exports = { callResult, applyResult, bindResult }; 