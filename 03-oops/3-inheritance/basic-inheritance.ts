/**
 * Inheritance - Creating Specialized Classes
 */

// Parent class (Base class)
class Animal {
  name: string;
  
  constructor(name: string) {
    this.name = name;
  }
  
  makeSound(): string {
    return `${this.name} makes a sound`;
  }
  
  eat(): string {
    return `${this.name} is eating`;
  }
}

// Child class (Derived class)
class Dog extends Animal {
  breed: string;
  
  constructor(name: string, breed: string) {
    super(name); // Call parent constructor
    this.breed = breed;
  }
  
  // Override parent method
  makeSound(): string {
    return `${this.name} barks: Woof!`;
  }
  
  // New method specific to Dog
  fetch(): string {
    return `${this.name} is fetching the ball`;
  }
}

class Cat extends Animal {
  // Override parent method
  makeSound(): string {
    return `${this.name} meows: Meow!`;
  }
  
  // New method specific to Cat
  climb(): string {
    return `${this.name} is climbing`;
  }
}

// Usage
const dog = new Dog("Buddy", "Golden Retriever");
const cat = new Cat("Whiskers");

console.log(dog.makeSound()); // Buddy barks: Woof!
console.log(dog.fetch());     // Buddy is fetching the ball
console.log(dog.eat());       // Buddy is eating (inherited)

console.log(cat.makeSound()); // Whiskers meows: Meow!
console.log(cat.climb());     // Whiskers is climbing

export { Animal, Dog, Cat }; 