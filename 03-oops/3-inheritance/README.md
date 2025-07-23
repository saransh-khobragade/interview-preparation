# Inheritance

## What is it?
Create new classes based on existing classes. Child classes inherit properties and methods from parent classes.

## Simple Example
```typescript
// Parent class
class Animal {
  name: string;
  
  constructor(name: string) {
    this.name = name;
  }
  
  makeSound(): string {
    return `${this.name} makes a sound`;
  }
}

// Child class
class Dog extends Animal {
  constructor(name: string) {
    super(name); // Call parent constructor
  }
  
  // Override parent method
  makeSound(): string {
    return `${this.name} barks`;
  }
}
```

## Key Concepts
- `extends` - Creates inheritance relationship
- `super()` - Calls parent constructor/methods
- **Override** - Child can change parent behavior
- **Inherit** - Child gets parent properties/methods

## Benefits
- **Code Reuse**: Don't repeat common functionality
- **Specialization**: Create specific versions of general classes
- **Hierarchy**: Organize related classes

## Run Example
```bash
npx ts-node basic-inheritance.ts
``` 