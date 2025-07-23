# Classes and Objects

## What is it?
- **Class**: Blueprint for creating objects
- **Object**: Instance created from a class

## Basic Example
```typescript
class Person {
  name: string;
  age: number;
  
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
  
  greet(): string {
    return `Hi, I'm ${this.name}`;
  }
}

const person = new Person("Alice", 25);
console.log(person.greet()); // Hi, I'm Alice
```

## Key Points
- Class = Template/Blueprint
- Object = Actual instance with data
- Constructor initializes properties
- Methods define behavior

## Run Example
```bash
npx ts-node basic-class.ts
``` 