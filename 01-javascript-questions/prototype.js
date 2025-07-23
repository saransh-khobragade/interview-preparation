/*
Prototype in JavaScript
------------------------
Demonstrates how objects inherit properties and methods via prototype chains.
*/

function Person(name) {
    this.name = name;
}
Person.prototype.sayHello = function() {
    return `Hello, I'm ${this.name}`;
};

const alice = new Person('Alice');
const greeting = alice.sayHello();

module.exports = { Person, greeting }; 