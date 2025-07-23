# Abstraction

## What is it?
Hide complex implementation details and show only essential features.

## Abstract Classes
- Cannot be instantiated directly
- Can have abstract methods (no implementation)
- Can have concrete methods (with implementation)
- Child classes must implement abstract methods

## Simple Example
```typescript
abstract class Animal {
  name: string;
  
  constructor(name: string) {
    this.name = name;
  }
  
  // Abstract method - must be implemented by child
  abstract makeSound(): string;
  
  // Concrete method - shared by all children
  eat(): string {
    return `${this.name} is eating`;
  }
}

class Dog extends Animal {
  makeSound(): string {  // Must implement this
    return "Woof!";
  }
}
```

## Benefits
- **Simplicity**: Hide complexity behind simple interface
- **Consistency**: Ensure all implementations follow same pattern
- **Safety**: Cannot create incomplete objects

## Run Example
```bash
npx ts-node abstract-classes.ts
``` 