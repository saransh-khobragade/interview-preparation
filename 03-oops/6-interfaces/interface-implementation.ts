/**
 * Interfaces - Contracts for Classes
 */

// Interface defines what methods a class must have
interface Flyable {
  fly(): string;
  land(): string;
}

interface Swimmable {
  swim(): string;
}

// Class can implement multiple interfaces
class Duck implements Flyable, Swimmable {
  name: string;
  
  constructor(name: string) {
    this.name = name;
  }
  
  // Must implement all interface methods
  fly(): string {
    return `${this.name} is flying`;
  }
  
  land(): string {
    return `${this.name} has landed`;
  }
  
  swim(): string {
    return `${this.name} is swimming`;
  }
  
  // Can have additional methods
  quack(): string {
    return `${this.name} says quack!`;
  }
}

class Airplane implements Flyable {
  model: string;
  
  constructor(model: string) {
    this.model = model;
  }
  
  fly(): string {
    return `${this.model} is flying at 30,000 feet`;
  }
  
  land(): string {
    return `${this.model} is landing`;
  }
}

// Usage
const duck = new Duck("Donald");
const plane = new Airplane("Boeing 747");

console.log(duck.fly());    // Donald is flying
console.log(duck.swim());   // Donald is swimming
console.log(duck.quack());  // Donald says quack!

console.log(plane.fly());   // Boeing 747 is flying at 30,000 feet
console.log(plane.land());  // Boeing 747 is landing

// Polymorphism with interfaces
function makeFly(flyable: Flyable): void {
  console.log(flyable.fly());
}

makeFly(duck);  // Donald is flying
makeFly(plane); // Boeing 747 is flying at 30,000 feet

export { Flyable, Swimmable, Duck, Airplane }; 