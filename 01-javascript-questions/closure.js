/*
Closure in JavaScript
----------------------
A closure is a function that remembers its lexical scope even when executed outside that scope.
*/

function makeCounter() {
    let count = 0;
    return function() {
        return ++count;
    };
}

const counter = makeCounter();

module.exports = counter; 