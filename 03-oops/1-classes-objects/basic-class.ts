/**
 * Classes and Objects - Simple Example
 */

// Simple class definition
class Person {
  name: string;
  age: number;
  
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
  
  greet(): string {
    return `Hi, I'm ${this.name}, age ${this.age}`;
  }
  
  haveBirthday(): void {
    this.age++;
  }
}

// Creating objects
const alice = new Person("Alice", 25);
const bob = new Person("Bob", 30);

// Using objects
console.log(alice.greet()); // Hi, I'm Alice, age 25
console.log(bob.greet());   // Hi, I'm Bob, age 30

alice.haveBirthday();
console.log(alice.greet()); // Hi, I'm Alice, age 26

export { Person }; 