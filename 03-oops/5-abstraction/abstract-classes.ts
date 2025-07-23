/**
 * Abstraction - Hide Implementation Details
 */

// Abstract class - cannot be instantiated directly
abstract class Vehicle {
  brand: string;
  
  constructor(brand: string) {
    this.brand = brand;
  }
  
  // Abstract methods - must be implemented by child classes
  abstract start(): string;
  abstract stop(): string;
  
  // Concrete method - can be used by child classes
  getInfo(): string {
    return `${this.brand} vehicle`;
  }
}

class Car extends Vehicle {
  constructor(brand: string) {
    super(brand);
  }
  
  // Must implement abstract methods
  start(): string {
    return `${this.brand} car engine started`;
  }
  
  stop(): string {
    return `${this.brand} car engine stopped`;
  }
}

class Motorcycle extends Vehicle {
  constructor(brand: string) {
    super(brand);
  }
  
  // Must implement abstract methods
  start(): string {
    return `${this.brand} motorcycle roared to life`;
  }
  
  stop(): string {
    return `${this.brand} motorcycle engine off`;
  }
}

// Usage
const car = new Car("Toyota");
const bike = new Motorcycle("Harley");

console.log(car.start());    // Toyota car engine started
console.log(car.stop());     // Toyota car engine stopped

console.log(bike.start());   // Harley motorcycle roared to life
console.log(bike.stop());    // Harley motorcycle engine off

// const vehicle = new Vehicle("Generic"); // ❌ Error! Cannot instantiate abstract class

export { Vehicle, Car, Motorcycle }; 