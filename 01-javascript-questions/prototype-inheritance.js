/*
Prototype Inheritance in JavaScript
------------------------------------
Demonstrates how one object can inherit properties and methods from another using prototypes.
*/

function Animal(name) {
    this.name = name;
}
Animal.prototype.speak = function() {
    return `${this.name} makes a noise.`;
};

function Dog(name) {
    Animal.call(this, name);
}
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;
Dog.prototype.speak = function() {
    return `${this.name} barks.`;
};

module.exports = { Animal, Dog }; 