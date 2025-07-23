/**
 * FACTORY PATTERN
 * 
 * Definition:
 * The Factory pattern provides an interface for creating objects without 
 * specifying their exact classes. It encapsulates object creation logic
 * and delegates the instantiation to subclasses or factory methods.
 * 
 * When to Use:
 * - When you don't know which exact class to instantiate
 * - When object creation is complex
 * - When you want to centralize object creation logic
 * - When you need to support multiple product families
 * 
 * Benefits:
 * ✅ Loose coupling between client and concrete classes
 * ✅ Single Responsibility Principle (creation logic is centralized)
 * ✅ Open/Closed Principle (easy to add new products)
 * ✅ Eliminates duplicate code
 * 
 * Drawbacks:
 * ❌ Can introduce unnecessary complexity for simple cases
 * ❌ Requires creating new classes for each product type
 * 
 * Key Components:
 * 1. Product Interface - defines the interface of objects factory creates
 * 2. Concrete Products - implement the product interface
 * 3. Factory - contains the creation logic
 * 
 * Real-world Examples:
 * - UI component libraries (Button, Input, Modal factories)
 * - Database driver factories (MySQL, PostgreSQL, MongoDB)
 * - Payment processor factories (PayPal, Stripe, Square)
 * - Vehicle factories (Car, Truck, Motorcycle)
 */

// Product interface - defines common interface for all animals
// This ensures all products have consistent behavior
interface Animal {
  makeSound(): string;
  getType(): string;
}

// Concrete Products - implement the Animal interface
// Each class encapsulates specific behavior for different animal types

class Dog implements Animal {
  makeSound(): string {
    return "Woof!";
  }

  getType(): string {
    return "Dog";
  }
}

class Cat implements Animal {
  makeSound(): string {
    return "Meow!";
  }

  getType(): string {
    return "Cat";
  }
}

class Bird implements Animal {
  makeSound(): string {
    return "Tweet!";
  }

  getType(): string {
    return "Bird";
  }
}

/**
 * Factory Class - Encapsulates object creation logic
 * 
 * The factory pattern centralizes the creation logic and provides
 * a single point of control for object instantiation.
 * 
 * Benefits of this approach:
 * - Client code doesn't need to know about concrete classes
 * - Easy to add new animal types without changing client code
 * - Creation logic is centralized and reusable
 */
class AnimalFactory {
  /**
   * Factory method - creates animals based on type parameter
   * 
   * @param type - The type of animal to create
   * @returns Animal instance
   * @throws Error if unknown type is provided
   */
  static createAnimal(type: string): Animal {
    // Switch statement encapsulates the creation logic
    // This is where we decide which concrete class to instantiate
    switch (type.toLowerCase()) {
      case "dog":
        return new Dog();
      case "cat":
        return new Cat();
      case "bird":
        return new Bird();
      default:
        // Fail fast if unknown type is requested
        throw new Error(`Unknown animal type: ${type}`);
    }
  }
}

// Usage Example
const dog = AnimalFactory.createAnimal("dog");
const cat = AnimalFactory.createAnimal("cat");

console.log(`${dog.getType()}: ${dog.makeSound()}`); // Dog: Woof!
console.log(`${cat.getType()}: ${cat.makeSound()}`); // Cat: Meow!

export { Animal, AnimalFactory, Dog, Cat, Bird }; 