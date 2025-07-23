# TypeScript Syntax and Concepts

This directory contains comprehensive examples of TypeScript syntax, types, and advanced concepts. Each file focuses on specific aspects of TypeScript with practical, easy-to-understand examples.

## 📁 Files Overview

### 1. **`basic-types.ts`** - Fundamental Type System
**Core TypeScript types and their usage**

- **Primitive Types**: `boolean`, `number`, `string`
- **Array Types**: `type[]` and `Array<type>` syntax
- **Tuple Types**: Fixed-length arrays with specific types
- **Enum Types**: Numeric and string enumerations
- **Special Types**: `any`, `unknown`, `void`, `null`, `undefined`, `never`
- **Object Types**: Object structure definitions
- **Function Types**: Function signatures and types
- **Literal Types**: Specific value types

**When to use**: Foundation for all TypeScript development

### 2. **`interfaces.ts`** - Contracts and Structure Definition
**Defining object shapes and contracts**

- **Basic Interfaces**: Object structure definition
- **Optional Properties**: `?` syntax for optional fields
- **Readonly Properties**: `readonly` keyword
- **Function Types**: Method signatures in interfaces
- **Index Signatures**: Dynamic property access
- **Interface Inheritance**: `extends` keyword
- **Multiple Inheritance**: Extending multiple interfaces
- **Generic Interfaces**: `<T>` type parameters
- **Interface Merging**: Multiple declarations merge
- **Utility Types**: `Partial`, `Pick`, `Omit`, etc.

**When to use**: Defining contracts for objects, APIs, and components

### 3. **`generics.ts`** - Reusable Type-Safe Components
**Creating flexible, reusable code with type safety**

- **Basic Generics**: `<T>` type parameters
- **Generic Functions**: Type-safe utility functions
- **Generic Classes**: Reusable containers and data structures
- **Generic Interfaces**: Flexible contracts
- **Generic Constraints**: `extends` keyword for type bounds
- **Multiple Type Parameters**: `<T, U, V>` syntax
- **Default Generic Types**: Default type assignments
- **Conditional Types**: `T extends U ? X : Y`
- **Advanced Patterns**: Mapped types, utility types
- **Type Guards**: Runtime type checking

**When to use**: Building reusable libraries, utilities, and type-safe APIs

### 4. **`advanced-types.ts`** - Complex Type Manipulations
**Union types, intersection types, and advanced type features**

- **Union Types**: `A | B` - either A or B
- **Intersection Types**: `A & B` - both A and B
- **Type Aliases**: Custom type names
- **Literal Types**: Specific value types
- **Mapped Types**: Transform object types
- **Conditional Types**: Type-level conditionals
- **Utility Types**: Built-in type transformations
- **Template Literal Types**: String manipulation at type level
- **Discriminated Unions**: Type-safe state management
- **Index Access Types**: `T[K]` property access
- **Type Assertions**: Type casting

**When to use**: Complex type transformations, state management, advanced APIs

### 5. **`functions.ts`** - Function Types and Patterns
**Function signatures, overloads, and advanced function concepts**

- **Basic Function Types**: Parameter and return types
- **Optional Parameters**: `?` syntax
- **Default Parameters**: Default value assignments
- **Rest Parameters**: `...args` syntax
- **Function Type Aliases**: Reusable function signatures
- **Function Overloads**: Multiple function signatures
- **Higher-Order Functions**: Functions as parameters
- **Function Factories**: Functions returning functions
- **Async Functions**: Promise-based typing
- **Generic Functions**: Type-safe function parameters
- **Function Composition**: Combining functions

**When to use**: Defining APIs, utility functions, event handlers

### 6. **`classes-modules.ts`** - OOP and Code Organization
**Classes, inheritance, modules, and advanced features**

- **Basic Classes**: Properties, methods, constructors
- **Access Modifiers**: `public`, `private`, `protected`, `readonly`
- **Static Members**: Class-level properties and methods
- **Inheritance**: `extends` keyword and `super()`
- **Abstract Classes**: `abstract` keyword
- **Generic Classes**: Type-safe class containers
- **Parameter Properties**: Constructor shortcuts
- **Interfaces with Classes**: `implements` keyword
- **Namespaces**: Code organization
- **Mixins**: Composition patterns
- **Decorators**: Metadata and behavior modification

**When to use**: Building applications, frameworks, and reusable components

## 🚀 How to Run Examples

Each file can be executed independently with TypeScript:

```bash
# Install TypeScript globally (if not already installed)
npm install -g typescript

# Compile and run any file
tsc basic-types.ts && node basic-types.js

# Or use ts-node for direct execution
npx ts-node basic-types.ts

# For watching changes during development
tsc --watch basic-types.ts
```

## 📚 Learning Path

### **Beginner Level**
1. **Start with `basic-types.ts`** - Learn fundamental types
2. **Move to `interfaces.ts`** - Understand object contracts
3. **Study `functions.ts`** - Master function typing

### **Intermediate Level**
4. **Explore `generics.ts`** - Build reusable components
5. **Practice `classes-modules.ts`** - Learn OOP patterns

### **Advanced Level**
6. **Master `advanced-types.ts`** - Complex type manipulations

## 🎯 Key TypeScript Benefits

### **Type Safety**
- Catch errors at compile time
- Prevent runtime type errors
- Enhanced IDE support with autocompletion

### **Code Quality**
- Self-documenting code through types
- Better refactoring capabilities
- Improved maintainability

### **Developer Experience**
- Intelligent IntelliSense
- Better debugging capabilities
- Easier collaboration in teams

### **Scalability**
- Large codebase management
- Module organization
- Interface-driven development

## 🔧 TypeScript Configuration

Create a `tsconfig.json` for your project:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

## 📖 Common Patterns and Best Practices

### **Type Definitions**
```typescript
// Prefer interfaces for object shapes
interface User {
  id: number;
  name: string;
}

// Use type aliases for unions and complex types
type Status = "loading" | "success" | "error";
```

### **Generic Constraints**
```typescript
// Constrain generics for better type safety
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
```

### **Utility Types**
```typescript
// Use built-in utility types
type PartialUser = Partial<User>;
type UserEmail = Pick<User, "email">;
type UserWithoutId = Omit<User, "id">;
```

### **Type Guards**
```typescript
// Create type guards for runtime checks
function isString(value: unknown): value is string {
  return typeof value === "string";
}
```

## 🎓 Real-World Applications

- **React/Angular Applications**: Component props and state typing
- **Node.js APIs**: Request/response type safety
- **Database Models**: Entity and schema definitions
- **State Management**: Redux/MobX type safety
- **Library Development**: Public API type definitions

## 📚 Additional Resources

- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [TypeScript Playground](https://www.typescriptlang.org/play)
- [Utility Types Reference](https://www.typescriptlang.org/docs/handbook/utility-types.html)
- [Advanced Types Guide](https://www.typescriptlang.org/docs/handbook/2/types-from-types.html)

Each file in this directory demonstrates TypeScript concepts progressively, from basic types to advanced patterns. Use them as reference material and practice exercises to master TypeScript development! 