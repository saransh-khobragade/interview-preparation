# Design Patterns in TypeScript

This directory contains simple, easy-to-understand implementations of common design patterns in TypeScript. Each pattern is in its own file with practical examples.

## Creational Patterns

### 1. Singleton Pattern (`singleton.ts`)
**Purpose**: Ensures a class has only one instance and provides global access to it.
**Example**: Database connection that should be shared across the application.
**When to use**: When you need exactly one instance of a class (database, logger, configuration).

### 2. Factory Pattern (`factory.ts`)
**Purpose**: Creates objects without specifying their exact classes.
**Example**: Creating different types of animals based on input.
**When to use**: When you need to create objects but don't know which specific class to instantiate until runtime.

### 3. Builder Pattern (`builder.ts`)
**Purpose**: Constructs complex objects step by step.
**Example**: Building a house with different components.
**When to use**: When creating complex objects with many optional parameters.

### 4. Prototype Pattern (`prototype.ts`)
**Purpose**: Creates objects by cloning existing instances.
**Example**: Cloning car or document objects.
**When to use**: When creating objects is expensive or when you need objects similar to existing ones.

## Structural Patterns

### 5. Adapter Pattern (`adapter.ts`)
**Purpose**: Allows incompatible interfaces to work together.
**Example**: Media player that can play different audio formats through adapters.
**When to use**: When you need to use an existing class with an incompatible interface.

### 6. Decorator Pattern (`decorator.ts`)
**Purpose**: Adds new functionality to objects without altering their structure.
**Example**: Adding milk, sugar, or vanilla to coffee.
**When to use**: When you want to add responsibilities to objects dynamically.

### 7. Facade Pattern (`facade.ts`)
**Purpose**: Provides a simplified interface to a complex subsystem.
**Example**: Computer startup process that hides complex CPU, memory, and hard drive operations.
**When to use**: When you want to hide the complexity of a subsystem.

## Behavioral Patterns

### 8. Observer Pattern (`observer.ts`)
**Purpose**: Allows objects to be notified when another object changes.
**Example**: Weather station notifying phones and TVs about temperature changes.
**When to use**: When changes to one object require updating multiple dependent objects.

### 9. Strategy Pattern (`strategy.ts`)
**Purpose**: Allows switching between different algorithms at runtime.
**Example**: Different payment methods (credit card, PayPal, cash) in a shopping cart.
**When to use**: When you have multiple ways to perform a task and want to switch between them.

### 10. Command Pattern (`command.ts`)
**Purpose**: Encapsulates a request as an object, allowing you to queue or log requests.
**Example**: Remote control for lights with undo/redo functionality.
**When to use**: When you need to queue operations, support undo/redo, or log requests.

## Running the Examples

Each file can be run independently with TypeScript:

```bash
# Install TypeScript if you haven't already
npm install -g typescript

# Compile and run any pattern
tsc singleton.ts && node singleton.js

# Or use ts-node for direct execution
npx ts-node singleton.ts
```

## Key Benefits of Design Patterns

1. **Reusability**: Solutions that can be applied to similar problems
2. **Communication**: Common vocabulary for developers
3. **Best Practices**: Time-tested solutions to common problems
4. **Maintainability**: Code that's easier to understand and modify
5. **Flexibility**: Systems that can adapt to changing requirements

## Pattern Categories Summary

- **Creational**: How objects are created (Singleton, Factory, Builder, Prototype)
- **Structural**: How objects are composed (Adapter, Decorator, Facade)  
- **Behavioral**: How objects interact and communicate (Observer, Strategy, Command)

Each pattern solves specific problems. Choose the right pattern based on your specific needs and requirements. 