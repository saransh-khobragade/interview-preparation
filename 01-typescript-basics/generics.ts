/**
 * TypeScript Generics
 * Creating reusable components that work with multiple types
 */

console.log("=== TYPESCRIPT GENERICS ===\n");

// ===== 1. BASIC GENERICS =====
console.log("1. BASIC GENERICS:");

// Generic function
function identity<T>(arg: T): T {
  return arg;
}

// Usage with different types
const stringResult = identity<string>("Hello");
const numberResult = identity<number>(42);
const booleanResult = identity<boolean>(true);

// Type inference - TypeScript can infer the type
const inferredString = identity("World"); // TypeScript infers T as string
const inferredNumber = identity(100);     // TypeScript infers T as number

console.log(`String: ${stringResult}, Number: ${numberResult}, Boolean: ${booleanResult}`);
console.log(`Inferred: ${inferredString}, ${inferredNumber}`);

// ===== 2. GENERIC ARRAYS =====
console.log("\n2. GENERIC ARRAYS:");

function getFirstElement<T>(array: T[]): T | undefined {
  return array.length > 0 ? array[0] : undefined;
}

function getLastElement<T>(array: T[]): T | undefined {
  return array.length > 0 ? array[array.length - 1] : undefined;
}

const numbers = [1, 2, 3, 4, 5];
const fruits = ["apple", "banana", "cherry"];
const booleans = [true, false, true];

console.log(`First number: ${getFirstElement(numbers)}`);
console.log(`Last fruit: ${getLastElement(fruits)}`);
console.log(`First boolean: ${getFirstElement(booleans)}`);

// ===== 3. GENERIC CLASSES =====
console.log("\n3. GENERIC CLASSES:");

class Box<T> {
  private content: T;

  constructor(value: T) {
    this.content = value;
  }

  getValue(): T {
    return this.content;
  }

  setValue(value: T): void {
    this.content = value;
  }

  toString(): string {
    return `Box contains: ${this.content}`;
  }
}

const stringBox = new Box<string>("Hello World");
const numberBox = new Box<number>(123);
const arrayBox = new Box<number[]>([1, 2, 3]);

console.log(stringBox.toString());
console.log(numberBox.toString());
console.log(arrayBox.toString());

// ===== 4. GENERIC INTERFACES =====
console.log("\n4. GENERIC INTERFACES:");

interface KeyValuePair<K, V> {
  key: K;
  value: V;
}

interface Collection<T> {
  add(item: T): void;
  remove(item: T): boolean;
  find(predicate: (item: T) => boolean): T | undefined;
  getAll(): T[];
}

class SimpleCollection<T> implements Collection<T> {
  private items: T[] = [];

  add(item: T): void {
    this.items.push(item);
  }

  remove(item: T): boolean {
    const index = this.items.indexOf(item);
    if (index > -1) {
      this.items.splice(index, 1);
      return true;
    }
    return false;
  }

  find(predicate: (item: T) => boolean): T | undefined {
    return this.items.find(predicate);
  }

  getAll(): T[] {
    return [...this.items];
  }
}

const stringCollection = new SimpleCollection<string>();
stringCollection.add("apple");
stringCollection.add("banana");
stringCollection.add("cherry");

const fruitWithA = stringCollection.find(fruit => fruit.startsWith("a"));
console.log(`Fruit starting with 'a': ${fruitWithA}`);
console.log(`All fruits: ${stringCollection.getAll().join(", ")}`);

// ===== 5. GENERIC CONSTRAINTS =====
console.log("\n5. GENERIC CONSTRAINTS:");

// Constraint: T must have a length property
interface Lengthwise {
  length: number;
}

function logLength<T extends Lengthwise>(item: T): T {
  console.log(`Item has length: ${item.length}`);
  return item;
}

logLength("Hello"); // string has length
logLength([1, 2, 3]); // array has length
logLength({ length: 10, name: "test" }); // object with length property
// logLength(123); // Error! number doesn't have length

// Constraint: T must be a key of U
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const person = { name: "John", age: 30, city: "New York" };
const name = getProperty(person, "name"); // string
const age = getProperty(person, "age");   // number
// const invalid = getProperty(person, "invalid"); // Error! Not a key of person

console.log(`Name: ${name}, Age: ${age}`);

// ===== 6. MULTIPLE GENERIC PARAMETERS =====
console.log("\n6. MULTIPLE GENERIC PARAMETERS:");

function merge<T, U>(obj1: T, obj2: U): T & U {
  return { ...obj1, ...obj2 };
}

const basicInfo = { name: "Alice", age: 25 };
const contactInfo = { email: "alice@example.com", phone: "123-456-7890" };

const fullInfo = merge(basicInfo, contactInfo);
console.log(`Merged: ${fullInfo.name}, ${fullInfo.email}, ${fullInfo.phone}`);

// Generic function with multiple constraints
function compare<T extends { id: number }, U extends { id: number }>(a: T, b: U): boolean {
  return a.id === b.id;
}

const user1 = { id: 1, name: "John" };
const product1 = { id: 1, title: "Laptop", price: 999 };
const user2 = { id: 2, name: "Jane" };

console.log(`Same ID (user1, product1): ${compare(user1, product1)}`);
console.log(`Same ID (user1, user2): ${compare(user1, user2)}`);

// ===== 7. GENERIC DEFAULT PARAMETERS =====
console.log("\n7. GENERIC DEFAULT PARAMETERS:");

interface ApiResponse<T = any> {
  data: T;
  status: number;
  message: string;
}

// With specific type
const userResponse: ApiResponse<{ name: string; id: number }> = {
  data: { name: "John", id: 1 },
  status: 200,
  message: "Success"
};

// Using default type (any)
const genericResponse: ApiResponse = {
  data: "Could be anything",
  status: 200,
  message: "Success"
};

console.log(`User response: ${userResponse.data.name}`);
console.log(`Generic response: ${genericResponse.data}`);

// ===== 8. CONDITIONAL TYPES WITH GENERICS =====
console.log("\n8. CONDITIONAL TYPES WITH GENERICS:");

// Conditional type
type ApiResponseType<T> = T extends string ? { message: T } : { data: T };

function createResponse<T>(input: T): ApiResponseType<T> {
  if (typeof input === "string") {
    return { message: input } as ApiResponseType<T>;
  } else {
    return { data: input } as ApiResponseType<T>;
  }
}

const stringResponse = createResponse("Hello World");
const numberResponse = createResponse(42);

console.log(`String response:`, stringResponse); // { message: "Hello World" }
console.log(`Number response:`, numberResponse); // { data: 42 }

// ===== 9. GENERIC UTILITY FUNCTIONS =====
console.log("\n9. GENERIC UTILITY FUNCTIONS:");

// Generic map function
function map<T, U>(array: T[], transform: (item: T) => U): U[] {
  return array.map(transform);
}

// Generic filter function
function filter<T>(array: T[], predicate: (item: T) => boolean): T[] {
  return array.filter(predicate);
}

// Generic reduce function
function reduce<T, U>(array: T[], reducer: (acc: U, current: T) => U, initialValue: U): U {
  return array.reduce(reducer, initialValue);
}

const numbersArray = [1, 2, 3, 4, 5];

const doubled = map(numbersArray, x => x * 2);
const evenNumbers = filter(numbersArray, x => x % 2 === 0);
const sum = reduce(numbersArray, (acc, curr) => acc + curr, 0);

console.log(`Doubled: ${doubled}`);
console.log(`Even numbers: ${evenNumbers}`);
console.log(`Sum: ${sum}`);

// ===== 10. GENERIC PROMISE HANDLING =====
console.log("\n10. GENERIC PROMISE HANDLING:");

function delay<T>(ms: number, value: T): Promise<T> {
  return new Promise(resolve => {
    setTimeout(() => resolve(value), ms);
  });
}

async function fetchData<T>(url: string): Promise<ApiResponse<T>> {
  // Simulate API call
  await delay(100, null);
  return {
    data: `Data from ${url}` as T,
    status: 200,
    message: "Success"
  };
}

// Usage (in real code, you'd await these)
delay(50, "Hello").then(result => {
  console.log(`Delayed result: ${result}`);
});

fetchData<string>("/api/users").then(response => {
  console.log(`Fetch result: ${response.data}`);
});

// ===== 11. ADVANCED GENERIC PATTERNS =====
console.log("\n11. ADVANCED GENERIC PATTERNS:");

// Mapped types with generics
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

type Optional<T> = {
  [P in keyof T]?: T[P];
};

interface User {
  id: number;
  name: string;
  email: string;
}

type ReadonlyUser = Readonly<User>;
type PartialUser = Optional<User>;

const readonlyUser: ReadonlyUser = {
  id: 1,
  name: "John",
  email: "john@example.com"
};

const partialUser: PartialUser = {
  name: "Jane" // id and email are optional
};

console.log(`Readonly user: ${readonlyUser.name}`);
console.log(`Partial user: ${partialUser.name}`);

// ===== 12. GENERIC TYPE GUARDS =====
console.log("\n12. GENERIC TYPE GUARDS:");

function isArray<T>(value: T | T[]): value is T[] {
  return Array.isArray(value);
}

function isSingleValue<T>(value: T | T[]): value is T {
  return !Array.isArray(value);
}

function processValue<T>(input: T | T[]): string {
  if (isArray(input)) {
    return `Array with ${input.length} items`;
  } else {
    return `Single value: ${input}`;
  }
}

console.log(processValue("hello"));
console.log(processValue(["a", "b", "c"]));
console.log(processValue(42));
console.log(processValue([1, 2, 3]));

console.log("\n=== GENERICS CONCEPTS SUMMARY ===");
console.log("✓ Basic generics - <T> type parameters");
console.log("✓ Generic functions - reusable with multiple types");
console.log("✓ Generic classes - type-safe containers");
console.log("✓ Generic interfaces - flexible contracts");
console.log("✓ Generic constraints - extends keyword");
console.log("✓ Multiple generics - <T, U, V>");
console.log("✓ Default types - <T = DefaultType>");
console.log("✓ Conditional types - T extends U ? X : Y");
console.log("✓ Utility functions - map, filter, reduce");
console.log("✓ Promise generics - async type safety");
console.log("✓ Mapped types - transform object types");
console.log("✓ Type guards - runtime type checking");

export {
  identity,
  Box,
  KeyValuePair,
  Collection,
  SimpleCollection,
  merge,
  compare,
  ApiResponse,
  map,
  filter,
  reduce,
  delay,
  fetchData,
  processValue
}; 