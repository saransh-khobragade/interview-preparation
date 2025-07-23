/**
 * Object-Oriented Programming (OOP) Concepts in TypeScript
 * Simple examples demonstrating core OOP principles
 */

// ===== 1. CLASS AND OBJECT =====
console.log("=== 1. CLASSES AND OBJECTS ===");

class Person {
  // Properties (attributes)
  name: string;
  age: number;
  
  // Constructor
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
  
  // Methods (behavior)
  greet(): string {
    return `Hello, I'm ${this.name} and I'm ${this.age} years old.`;
  }
  
  haveBirthday(): void {
    this.age++;
    console.log(`Happy birthday! ${this.name} is now ${this.age} years old.`);
  }
}

// Creating objects (instances of the class)
const person1 = new Person("Alice", 25);
const person2 = new Person("Bob", 30);

console.log(person1.greet());
console.log(person2.greet());
person1.haveBirthday();

// ===== 2. ENCAPSULATION =====
console.log("\n=== 2. ENCAPSULATION ===");

class BankAccount {
  private balance: number; // Private property - cannot be accessed directly from outside
  public accountNumber: string; // Public property - can be accessed from anywhere
  protected bankName: string; // Protected property - can be accessed by child classes
  
  constructor(accountNumber: string, initialBalance: number) {
    this.accountNumber = accountNumber;
    this.balance = initialBalance;
    this.bankName = "MyBank";
  }
  
  // Public method to access private balance
  getBalance(): number {
    return this.balance;
  }
  
  // Public method to modify private balance
  deposit(amount: number): void {
    if (amount > 0) {
      this.balance += amount;
      console.log(`Deposited $${amount}. New balance: $${this.balance}`);
    } else {
      console.log("Invalid deposit amount");
    }
  }
  
  withdraw(amount: number): void {
    if (amount > 0 && amount <= this.balance) {
      this.balance -= amount;
      console.log(`Withdrawn $${amount}. New balance: $${this.balance}`);
    } else {
      console.log("Invalid withdrawal amount or insufficient funds");
    }
  }
}

const account = new BankAccount("123456", 1000);
console.log(`Account: ${account.accountNumber}, Balance: $${account.getBalance()}`);
account.deposit(500);
account.withdraw(200);
// account.balance = 10000; // This would cause an error - balance is private!

// ===== 3. INHERITANCE =====
console.log("\n=== 3. INHERITANCE ===");

// Parent class (Base class)
class Animal {
  name: string;
  species: string;
  
  constructor(name: string, species: string) {
    this.name = name;
    this.species = species;
  }
  
  makeSound(): string {
    return `${this.name} makes a sound`;
  }
  
  eat(): string {
    return `${this.name} is eating`;
  }
}

// Child class (Derived class) inheriting from Animal
class Dog extends Animal {
  breed: string;
  
  constructor(name: string, breed: string) {
    super(name, "Canine"); // Call parent constructor
    this.breed = breed;
  }
  
  // Override parent method
  makeSound(): string {
    return `${this.name} barks: Woof! Woof!`;
  }
  
  // Add new method specific to Dog
  fetch(): string {
    return `${this.name} is fetching the ball`;
  }
}

class Cat extends Animal {
  constructor(name: string) {
    super(name, "Feline");
  }
  
  // Override parent method
  makeSound(): string {
    return `${this.name} meows: Meow!`;
  }
  
  // Add new method specific to Cat
  climb(): string {
    return `${this.name} is climbing the tree`;
  }
}

const dog = new Dog("Buddy", "Golden Retriever");
const cat = new Cat("Whiskers");

console.log(dog.makeSound());
console.log(dog.fetch());
console.log(dog.eat()); // Inherited method

console.log(cat.makeSound());
console.log(cat.climb());
console.log(cat.eat()); // Inherited method

// ===== 4. POLYMORPHISM =====
console.log("\n=== 4. POLYMORPHISM ===");

// Same method name, different implementations
function makeAnimalSound(animal: Animal): void {
  console.log(animal.makeSound()); // Different output based on actual object type
}

const animals: Animal[] = [
  new Dog("Rex", "German Shepherd"),
  new Cat("Fluffy"),
  new Animal("Generic Animal", "Unknown")
];

// Polymorphism in action - same method call, different behaviors
animals.forEach(animal => makeAnimalSound(animal));

// ===== 5. ABSTRACTION =====
console.log("\n=== 5. ABSTRACTION ===");

// Abstract class - cannot be instantiated directly
abstract class Vehicle {
  brand: string;
  model: string;
  
  constructor(brand: string, model: string) {
    this.brand = brand;
    this.model = model;
  }
  
  // Abstract method - must be implemented by child classes
  abstract start(): string;
  abstract stop(): string;
  
  // Concrete method - can be used by child classes
  getInfo(): string {
    return `${this.brand} ${this.model}`;
  }
}

class Car extends Vehicle {
  constructor(brand: string, model: string) {
    super(brand, model);
  }
  
  // Must implement abstract methods
  start(): string {
    return `${this.getInfo()} car engine started`;
  }
  
  stop(): string {
    return `${this.getInfo()} car engine stopped`;
  }
}

class Motorcycle extends Vehicle {
  constructor(brand: string, model: string) {
    super(brand, model);
  }
  
  // Must implement abstract methods
  start(): string {
    return `${this.getInfo()} motorcycle engine roared to life`;
  }
  
  stop(): string {
    return `${this.getInfo()} motorcycle engine turned off`;
  }
}

const car = new Car("Toyota", "Camry");
const motorcycle = new Motorcycle("Harley", "Davidson");

console.log(car.start());
console.log(car.stop());
console.log(motorcycle.start());
console.log(motorcycle.stop());

// const vehicle = new Vehicle("Generic", "Vehicle"); // Error! Cannot instantiate abstract class

// ===== 6. INTERFACES =====
console.log("\n=== 6. INTERFACES ===");

// Interface defines a contract
interface Flyable {
  fly(): string;
  land(): string;
}

interface Swimmable {
  swim(): string;
}

// Class implementing multiple interfaces
class Duck extends Animal implements Flyable, Swimmable {
  constructor(name: string) {
    super(name, "Bird");
  }
  
  makeSound(): string {
    return `${this.name} quacks: Quack! Quack!`;
  }
  
  fly(): string {
    return `${this.name} is flying in the sky`;
  }
  
  land(): string {
    return `${this.name} has landed safely`;
  }
  
  swim(): string {
    return `${this.name} is swimming in the pond`;
  }
}

const duck = new Duck("Donald");
console.log(duck.makeSound());
console.log(duck.fly());
console.log(duck.swim());
console.log(duck.land());

// ===== 7. STATIC METHODS AND PROPERTIES =====
console.log("\n=== 7. STATIC METHODS AND PROPERTIES ===");

class MathHelper {
  static PI: number = 3.14159;
  
  static add(a: number, b: number): number {
    return a + b;
  }
  
  static multiply(a: number, b: number): number {
    return a * b;
  }
  
  static circleArea(radius: number): number {
    return MathHelper.PI * radius * radius;
  }
}

// Use static methods without creating an instance
console.log(`Addition: ${MathHelper.add(5, 3)}`);
console.log(`Multiplication: ${MathHelper.multiply(4, 7)}`);
console.log(`Circle area: ${MathHelper.circleArea(5)}`);
console.log(`PI value: ${MathHelper.PI}`);

// ===== 8. GETTERS AND SETTERS =====
console.log("\n=== 8. GETTERS AND SETTERS ===");

class Temperature {
  private _celsius: number = 0;
  
  // Getter
  get celsius(): number {
    return this._celsius;
  }
  
  // Setter
  set celsius(value: number) {
    if (value < -273.15) {
      console.log("Temperature cannot be below absolute zero!");
      return;
    }
    this._celsius = value;
  }
  
  // Getter for Fahrenheit
  get fahrenheit(): number {
    return (this._celsius * 9/5) + 32;
  }
  
  // Setter for Fahrenheit
  set fahrenheit(value: number) {
    this._celsius = (value - 32) * 5/9;
  }
}

const temp = new Temperature();
temp.celsius = 25;
console.log(`${temp.celsius}°C = ${temp.fahrenheit}°F`);

temp.fahrenheit = 86;
console.log(`${temp.fahrenheit}°F = ${temp.celsius}°C`);

temp.celsius = -300; // This will show an error message

console.log("\n=== OOP CONCEPTS SUMMARY ===");
console.log("1. CLASS & OBJECT: Blueprint and instances");
console.log("2. ENCAPSULATION: Hide internal details, expose only necessary methods");
console.log("3. INHERITANCE: Child classes inherit from parent classes");
console.log("4. POLYMORPHISM: Same method name, different implementations");
console.log("5. ABSTRACTION: Hide complex implementation details");
console.log("6. INTERFACES: Define contracts that classes must follow");
console.log("7. STATIC: Class-level methods and properties");
console.log("8. GETTERS/SETTERS: Control access to properties");

export {
  Person,
  BankAccount,
  Animal,
  Dog,
  Cat,
  Vehicle,
  Car,
  Motorcycle,
  Duck,
  MathHelper,
  Temperature,
  Flyable,
  Swimmable
}; 