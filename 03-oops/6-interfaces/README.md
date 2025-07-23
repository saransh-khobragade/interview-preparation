# Interfaces

## What is it?
Contracts that define what methods a class must implement.

## Simple Example
```typescript
interface Flyable {
  fly(): string;
  land(): string;
}

class Bird implements Flyable {
  fly(): string {
    return "Bird is flying";
  }
  
  land(): string {
    return "Bird has landed";
  }
}
```

## Key Features
- **Contract**: Class must implement all interface methods
- **Multiple Implementation**: Class can implement multiple interfaces
- **Polymorphism**: Different classes can implement same interface
- **No Implementation**: Interface only defines method signatures

## Interface vs Abstract Class
| Interface | Abstract Class |
|-----------|----------------|
| Only method signatures | Can have implementations |
| Multiple inheritance | Single inheritance |
| No constructor | Can have constructor |
| No access modifiers | Has access modifiers |

## Benefits
- **Flexibility**: Multiple classes can implement same interface
- **Testability**: Easy to mock interfaces
- **Documentation**: Clear contracts

## Run Example
```bash
npx ts-node interface-implementation.ts
``` 