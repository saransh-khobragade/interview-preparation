// Prototype and Prototype Inheritance
// This file demonstrates prototype-based inheritance in JavaScript using both ES5 constructor/prototype and ES6 class syntax.
// Shows how to create base and derived types, override methods, and use super.
// Useful for understanding JavaScript's inheritance model.

// Constructor function
function Animal(name) {
    this.name = name;
}

Animal.prototype.speak = function() {
    return `${this.name} makes a noise.`;
};

// Inheritance
function Dog(name, breed) {
    Animal.call(this, name);
    this.breed = breed;
}

Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

Dog.prototype.speak = function() {
    return `${this.name} barks.`;
};

// ES6 Class Syntax
class Cat extends Animal {
    constructor(name, color) {
        super(name);
        this.color = color;
    }
    speak() {
        return `${this.name} meows.`;
    }
}

// Usage
const animal = new Animal('Generic');
const dog = new Dog('Rex', 'Labrador');
const cat = new Cat('Whiskers', 'Black');

console.log(animal.speak()); // Generic makes a noise.
console.log(dog.speak());    // Rex barks.
console.log(cat.speak());    // Whiskers meows.

module.exports = { Animal, Dog, Cat }; 