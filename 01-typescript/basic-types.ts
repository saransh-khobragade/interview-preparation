/**
 * TypeScript Basic Types
 * Fundamental type system in TypeScript
 */

console.log("=== TYPESCRIPT BASIC TYPES ===\n");

// ===== 1. PRIMITIVE TYPES =====
console.log("1. PRIMITIVE TYPES:");

// Boolean
let isActive: boolean = true;
let isCompleted: boolean = false;
console.log(`Boolean: isActive = ${isActive}, isCompleted = ${isCompleted}`);

// Number
let age: number = 25;
let price: number = 99.99;
let binary: number = 0b1010; // Binary
let octal: number = 0o744;   // Octal
let hex: number = 0xf00d;    // Hexadecimal
console.log(`Number: age = ${age}, price = ${price}, binary = ${binary}`);

// String
let firstName: string = "John";
let lastName: string = 'Doe';
let fullName: string = `${firstName} ${lastName}`; // Template literal
console.log(`String: fullName = ${fullName}`);

// ===== 2. ARRAY TYPES =====
console.log("\n2. ARRAY TYPES:");

// Array of numbers
let numbers: number[] = [1, 2, 3, 4, 5];
let scores: Array<number> = [85, 90, 78, 92]; // Generic array syntax
console.log(`Number arrays: ${numbers}, ${scores}`);

// Array of strings
let fruits: string[] = ["apple", "banana", "orange"];
let colors: Array<string> = ["red", "green", "blue"];
console.log(`String arrays: ${fruits}, ${colors}`);

// Mixed array (not recommended, but possible)
let mixed: (string | number)[] = ["hello", 42, "world", 100];
console.log(`Mixed array: ${mixed}`);

// ===== 3. TUPLE TYPES =====
console.log("\n3. TUPLE TYPES:");

// Fixed length array with specific types at each position
let person: [string, number] = ["Alice", 30];
let coordinate: [number, number] = [10, 20];
let rgb: [number, number, number] = [255, 128, 0];

console.log(`Person tuple: ${person[0]} is ${person[1]} years old`);
console.log(`Coordinate: x=${coordinate[0]}, y=${coordinate[1]}`);
console.log(`RGB color: red=${rgb[0]}, green=${rgb[1]}, blue=${rgb[2]}`);

// Tuple with optional elements
let point: [number, number, number?] = [1, 2]; // Third element is optional
point.push(3); // Can add the optional element
console.log(`3D point: ${point}`);

// ===== 4. ENUM TYPES =====
console.log("\n4. ENUM TYPES:");

// Numeric enum
enum Direction {
  Up,    // 0
  Down,  // 1
  Left,  // 2
  Right  // 3
}

enum Status {
  Pending = 1,
  Approved = 2,
  Rejected = 3
}

let currentDirection: Direction = Direction.Up;
let orderStatus: Status = Status.Pending;
console.log(`Direction: ${currentDirection} (${Direction[currentDirection]})`);
console.log(`Status: ${orderStatus} (${Status[orderStatus]})`);

// String enum
enum Color {
  Red = "red",
  Green = "green",
  Blue = "blue"
}

let favoriteColor: Color = Color.Blue;
console.log(`Favorite color: ${favoriteColor}`);

// ===== 5. ANY TYPE =====
console.log("\n5. ANY TYPE:");

// Any - disables type checking (use sparingly!)
let anything: any = 42;
anything = "hello";
anything = true;
anything = { name: "object" };
console.log(`Any type can hold anything: ${anything.name}`);

// ===== 6. UNKNOWN TYPE =====
console.log("\n6. UNKNOWN TYPE:");

// Unknown - safer alternative to any
let userInput: unknown = getUserInput();

function getUserInput(): unknown {
  return "user typed something";
}

// Type checking required before use
if (typeof userInput === "string") {
  console.log(`User input (string): ${userInput.toUpperCase()}`);
}

// ===== 7. VOID TYPE =====
console.log("\n7. VOID TYPE:");

// Void - used for functions that don't return a value
function logMessage(message: string): void {
  console.log(`Log: ${message}`);
}

function doSomething(): void {
  // Function that returns nothing
}

logMessage("This function returns void");

// ===== 8. NULL AND UNDEFINED =====
console.log("\n8. NULL AND UNDEFINED:");

// Null and undefined
let nullable: string | null = null;
let undefinedValue: string | undefined = undefined;

nullable = "now it has a value";
console.log(`Nullable: ${nullable}`);

// ===== 9. NEVER TYPE =====
console.log("\n9. NEVER TYPE:");

// Never - represents values that never occur
function throwError(message: string): never {
  throw new Error(message);
}

function infiniteLoop(): never {
  while (true) {
    // This function never returns
  }
}

// Function that might throw an error
function processValue(value: string | number): string {
  if (typeof value === "string") {
    return value.toUpperCase();
  } else if (typeof value === "number") {
    return value.toString();
  } else {
    // This should never happen if types are correct
    throw new Error("Invalid type"); // returns never
  }
}

console.log(processValue("hello"));
console.log(processValue(42));

// ===== 10. OBJECT TYPE =====
console.log("\n10. OBJECT TYPE:");

// Object type
let user: object = {
  name: "John",
  age: 30
};

// Better to be specific about object structure
let specificUser: {
  name: string;
  age: number;
  email?: string; // Optional property
} = {
  name: "Jane",
  age: 25
};

specificUser.email = "jane@example.com";
console.log(`Specific user: ${specificUser.name}, ${specificUser.age}, ${specificUser.email}`);

// ===== 11. FUNCTION TYPES =====
console.log("\n11. FUNCTION TYPES:");

// Function type annotations
function add(a: number, b: number): number {
  return a + b;
}

// Arrow function with types
const multiply = (a: number, b: number): number => a * b;

// Function type variable
let calculator: (x: number, y: number) => number;
calculator = add;
console.log(`Calculator result: ${calculator(5, 3)}`);

calculator = multiply;
console.log(`Calculator result: ${calculator(4, 6)}`);

// Optional parameters
function greet(name: string, greeting?: string): string {
  return `${greeting || "Hello"}, ${name}!`;
}

console.log(greet("Alice"));
console.log(greet("Bob", "Hi"));

// Default parameters
function createUser(name: string, role: string = "user"): string {
  return `Created ${role}: ${name}`;
}

console.log(createUser("Charlie"));
console.log(createUser("Diana", "admin"));

// ===== 12. LITERAL TYPES =====
console.log("\n12. LITERAL TYPES:");

// String literal types
let theme: "light" | "dark" = "light";
theme = "dark"; // OK
// theme = "blue"; // Error! Not assignable

// Numeric literal types
let diceRoll: 1 | 2 | 3 | 4 | 5 | 6 = 6;

// Boolean literal types
let isTrue: true = true;
// let isFalse: true = false; // Error!

console.log(`Theme: ${theme}, Dice: ${diceRoll}, IsTrue: ${isTrue}`);

// ===== TYPE EXAMPLES SUMMARY =====
console.log("\n=== TYPE EXAMPLES SUMMARY ===");
console.log("✓ boolean, number, string - primitive types");
console.log("✓ array[], Array<T> - array types");
console.log("✓ [type1, type2] - tuple types");
console.log("✓ enum - enumeration types");
console.log("✓ any - any type (avoid when possible)");
console.log("✓ unknown - safer any alternative");
console.log("✓ void - no return value");
console.log("✓ null, undefined - null types");
console.log("✓ never - never occurs");
console.log("✓ object - object types");
console.log("✓ (params) => returnType - function types");
console.log("✓ 'literal' - literal types");

export {
  Direction,
  Status,
  Color,
  add,
  multiply,
  greet,
  createUser,
  processValue
}; 