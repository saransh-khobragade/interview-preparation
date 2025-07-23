/**
 * TypeScript Classes, Modules, and Advanced Features
 * Classes, inheritance, modules, namespaces, and decorators
 */

console.log("=== TYPESCRIPT CLASSES & MODULES ===\n");

// ===== 1. BASIC CLASSES =====
console.log("1. BASIC CLASSES:");

class Person {
  // Properties with access modifiers
  public name: string;
  private age: number;
  protected email: string;
  readonly id: number;

  // Static properties
  static species: string = "Homo sapiens";
  static count: number = 0;

  constructor(id: number, name: string, age: number, email: string) {
    this.id = id;
    this.name = name;
    this.age = age;
    this.email = email;
    Person.count++;
  }

  // Methods
  public introduce(): string {
    return `Hi, I'm ${this.name}`;
  }

  private calculateYearOfBirth(): number {
    return new Date().getFullYear() - this.age;
  }

  protected getEmail(): string {
    return this.email;
  }

  // Getter
  get birthYear(): number {
    return this.calculateYearOfBirth();
  }

  // Setter
  set displayName(name: string) {
    this.name = name.trim();
  }

  // Static method
  static getSpecies(): string {
    return Person.species;
  }

  static getTotalCount(): number {
    return Person.count;
  }
}

const person = new Person(1, "John Doe", 30, "john@example.com");
console.log(person.introduce());
console.log(`Birth year: ${person.birthYear}`);
person.displayName = "  John Smith  ";
console.log(`Updated name: ${person.name}`);
console.log(`Species: ${Person.getSpecies()}`);
console.log(`Total persons: ${Person.getTotalCount()}`);

// ===== 2. INHERITANCE AND POLYMORPHISM =====
console.log("\n2. INHERITANCE AND POLYMORPHISM:");

class Employee extends Person {
  private salary: number;
  protected department: string;

  constructor(id: number, name: string, age: number, email: string, salary: number, department: string) {
    super(id, name, age, email); // Call parent constructor
    this.salary = salary;
    this.department = department;
  }

  // Override parent method
  public introduce(): string {
    return `${super.introduce()}, I work in ${this.department}`;
  }

  // New method specific to Employee
  public getSalaryInfo(): string {
    return `Salary: $${this.salary.toLocaleString()}`;
  }

  // Access protected method from parent
  public getContactInfo(): string {
    return `Email: ${this.getEmail()}`;
  }

  // Getter/Setter for salary
  get annualSalary(): number {
    return this.salary;
  }

  set annualSalary(amount: number) {
    if (amount > 0) {
      this.salary = amount;
    }
  }
}

class Manager extends Employee {
  private teamSize: number;

  constructor(id: number, name: string, age: number, email: string, salary: number, teamSize: number) {
    super(id, name, age, email, salary, "Management");
    this.teamSize = teamSize;
  }

  // Override introduce method
  public introduce(): string {
    return `${super.introduce()} and manage ${this.teamSize} people`;
  }

  public getTeamInfo(): string {
    return `Managing a team of ${this.teamSize}`;
  }
}

const employee = new Employee(2, "Jane Smith", 25, "jane@company.com", 75000, "Engineering");
const manager = new Manager(3, "Bob Johnson", 35, "bob@company.com", 120000, 10);

console.log(employee.introduce());
console.log(employee.getSalaryInfo());
console.log(manager.introduce());
console.log(manager.getTeamInfo());

// Polymorphism - same method, different implementations
const people: Person[] = [person, employee, manager];
people.forEach(p => console.log(`- ${p.introduce()}`));

// ===== 3. ABSTRACT CLASSES =====
console.log("\n3. ABSTRACT CLASSES:");

abstract class Shape {
  protected name: string;

  constructor(name: string) {
    this.name = name;
  }

  // Abstract methods - must be implemented by derived classes
  abstract calculateArea(): number;
  abstract calculatePerimeter(): number;

  // Concrete method - can be used by derived classes
  public getInfo(): string {
    return `${this.name}: Area = ${this.calculateArea()}, Perimeter = ${this.calculatePerimeter()}`;
  }
}

class Rectangle extends Shape {
  private width: number;
  private height: number;

  constructor(width: number, height: number) {
    super("Rectangle");
    this.width = width;
    this.height = height;
  }

  calculateArea(): number {
    return this.width * this.height;
  }

  calculatePerimeter(): number {
    return 2 * (this.width + this.height);
  }
}

class Circle extends Shape {
  private radius: number;

  constructor(radius: number) {
    super("Circle");
    this.radius = radius;
  }

  calculateArea(): number {
    return Math.PI * this.radius * this.radius;
  }

  calculatePerimeter(): number {
    return 2 * Math.PI * this.radius;
  }
}

const rectangle = new Rectangle(5, 3);
const circle = new Circle(4);

console.log(rectangle.getInfo());
console.log(circle.getInfo());

// ===== 4. GENERIC CLASSES =====
console.log("\n4. GENERIC CLASSES:");

class Stack<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }

  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  size(): number {
    return this.items.length;
  }

  getAll(): T[] {
    return [...this.items];
  }
}

class Pair<T, U> {
  constructor(public first: T, public second: U) {}

  toString(): string {
    return `(${this.first}, ${this.second})`;
  }

  swap(): Pair<U, T> {
    return new Pair(this.second, this.first);
  }
}

const numberStack = new Stack<number>();
numberStack.push(1);
numberStack.push(2);
numberStack.push(3);

console.log(`Stack size: ${numberStack.size()}`);
console.log(`Popped: ${numberStack.pop()}`);
console.log(`Peek: ${numberStack.peek()}`);

const stringNumberPair = new Pair<string, number>("hello", 42);
const swapped = stringNumberPair.swap();

console.log(`Original pair: ${stringNumberPair.toString()}`);
console.log(`Swapped pair: ${swapped.toString()}`);

// ===== 5. PARAMETER PROPERTIES =====
console.log("\n5. PARAMETER PROPERTIES:");

// Shorthand for declaring and initializing properties
class Product {
  constructor(
    public readonly id: number,
    public name: string,
    private _price: number,
    protected category: string
  ) {}

  get price(): number {
    return this._price;
  }

  set price(value: number) {
    if (value > 0) {
      this._price = value;
    }
  }

  getInfo(): string {
    return `${this.name} (${this.category}): $${this._price}`;
  }
}

const product = new Product(1, "Laptop", 999.99, "Electronics");
console.log(product.getInfo());
product.price = 899.99;
console.log(`Updated price: $${product.price}`);

// ===== 6. INTERFACES WITH CLASSES =====
console.log("\n6. INTERFACES WITH CLASSES:");

interface Flyable {
  altitude: number;
  fly(): string;
  land(): string;
}

interface Swimmable {
  depth: number;
  swim(): string;
  surface(): string;
}

// Class implementing multiple interfaces
class Duck implements Flyable, Swimmable {
  altitude: number = 0;
  depth: number = 0;

  constructor(public name: string) {}

  fly(): string {
    this.altitude = 100;
    return `${this.name} is flying at ${this.altitude}m`;
  }

  land(): string {
    this.altitude = 0;
    return `${this.name} has landed`;
  }

  swim(): string {
    this.depth = 2;
    return `${this.name} is swimming at ${this.depth}m depth`;
  }

  surface(): string {
    this.depth = 0;
    return `${this.name} has surfaced`;
  }

  quack(): string {
    return `${this.name} says: Quack!`;
  }
}

const duck = new Duck("Donald");
console.log(duck.fly());
console.log(duck.swim());
console.log(duck.quack());
console.log(duck.land());
console.log(duck.surface());

// ===== 7. NAMESPACES =====
console.log("\n7. NAMESPACES:");

namespace Geometry {
  export interface Point {
    x: number;
    y: number;
  }

  export class Vector {
    constructor(public x: number, public y: number) {}

    add(other: Vector): Vector {
      return new Vector(this.x + other.x, this.y + other.y);
    }

    magnitude(): number {
      return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    toString(): string {
      return `(${this.x}, ${this.y})`;
    }
  }

  export function distance(p1: Point, p2: Point): number {
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
  }

  // Nested namespace
  export namespace Utils {
    export function midpoint(p1: Point, p2: Point): Point {
      return {
        x: (p1.x + p2.x) / 2,
        y: (p1.y + p2.y) / 2
      };
    }
  }
}

const point1: Geometry.Point = { x: 0, y: 0 };
const point2: Geometry.Point = { x: 3, y: 4 };
const vector1 = new Geometry.Vector(1, 2);
const vector2 = new Geometry.Vector(3, 4);

console.log(`Distance: ${Geometry.distance(point1, point2)}`);
console.log(`Vector sum: ${vector1.add(vector2).toString()}`);
console.log(`Midpoint: ${JSON.stringify(Geometry.Utils.midpoint(point1, point2))}`);

// ===== 8. MIXINS =====
console.log("\n8. MIXINS:");

// Mixin functions
type Constructor<T = {}> = new (...args: any[]) => T;

function Timestamped<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    timestamp = Date.now();

    getTimestamp(): string {
      return new Date(this.timestamp).toISOString();
    }
  };
}

function Activatable<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    isActive = false;

    activate(): void {
      this.isActive = true;
    }

    deactivate(): void {
      this.isActive = false;
    }
  };
}

// Base class
class User {
  constructor(public name: string) {}
}

// Apply mixins
const TimestampedUser = Timestamped(User);
const ActivatableUser = Activatable(User);
const TimestampedActivatableUser = Timestamped(Activatable(User));

const user1 = new TimestampedUser("John");
const user2 = new ActivatableUser("Jane");
const user3 = new TimestampedActivatableUser("Bob");

console.log(`User1 timestamp: ${user1.getTimestamp()}`);
user2.activate();
console.log(`User2 active: ${user2.isActive}`);
user3.activate();
console.log(`User3 active: ${user3.isActive}, timestamp: ${user3.getTimestamp()}`);

// ===== 9. BASIC DECORATORS (EXPERIMENTAL) =====
console.log("\n9. BASIC DECORATORS:");

// Note: Decorators are experimental and require special configuration
// This is conceptual - in real usage you'd need "experimentalDecorators": true

// Method decorator concept
function log(target: any, propertyName: string, descriptor: PropertyDescriptor) {
  const method = descriptor.value;
  descriptor.value = function (...args: any[]) {
    console.log(`Calling ${propertyName} with args:`, args);
    const result = method.apply(this, args);
    console.log(`${propertyName} returned:`, result);
    return result;
  };
}

// Class decorator concept
function sealed(constructor: Function) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}

// This would be used like:
// @sealed
// class ExampleClass {
//   @log
//   public method(x: number): number {
//     return x * 2;
//   }
// }

console.log("Decorators require experimental support - see examples above");

console.log("\n=== CLASSES & MODULES SUMMARY ===");
console.log("✓ Basic classes - properties, methods, constructors");
console.log("✓ Access modifiers - public, private, protected, readonly");
console.log("✓ Static members - class-level properties and methods");
console.log("✓ Inheritance - extends keyword and super()");
console.log("✓ Abstract classes - abstract keyword");
console.log("✓ Generic classes - <T> type parameters");
console.log("✓ Parameter properties - constructor shortcuts");
console.log("✓ Interfaces - implements keyword");
console.log("✓ Namespaces - organize related code");
console.log("✓ Mixins - composition pattern");
console.log("✓ Decorators - metadata and behavior modification");

export {
  Person,
  Employee,
  Manager,
  Shape,
  Rectangle,
  Circle,
  Stack,
  Pair,
  Product,
  Flyable,
  Swimmable,
  Duck,
  Geometry
}; 