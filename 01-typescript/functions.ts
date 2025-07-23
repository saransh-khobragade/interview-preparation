/**
 * TypeScript Functions
 * Function types, overloads, rest parameters, and advanced function concepts
 */

console.log("=== TYPESCRIPT FUNCTIONS ===\n");

// ===== 1. BASIC FUNCTION TYPES =====
console.log("1. BASIC FUNCTION TYPES:");

// Function declaration with types
function add(a: number, b: number): number {
  return a + b;
}

// Function expression with types
const multiply = function(a: number, b: number): number {
  return a * b;
};

// Arrow function with types
const divide = (a: number, b: number): number => {
  return b !== 0 ? a / b : 0;
};

// Short arrow function
const square = (n: number): number => n * n;

console.log(`Add: ${add(5, 3)}`);
console.log(`Multiply: ${multiply(4, 6)}`);
console.log(`Divide: ${divide(10, 2)}`);
console.log(`Square: ${square(7)}`);

// ===== 2. OPTIONAL AND DEFAULT PARAMETERS =====
console.log("\n2. OPTIONAL AND DEFAULT PARAMETERS:");

// Optional parameters (must come after required parameters)
function greet(name: string, greeting?: string): string {
  return `${greeting || "Hello"}, ${name}!`;
}

// Default parameters
function createUser(name: string, age: number = 18, role: string = "user"): string {
  return `Created ${role}: ${name} (age ${age})`;
}

// Mixed optional and default
function calculatePrice(base: number, tax?: number, discount: number = 0): number {
  const taxAmount = tax ? base * (tax / 100) : 0;
  const discountAmount = base * (discount / 100);
  return base + taxAmount - discountAmount;
}

console.log(greet("Alice"));
console.log(greet("Bob", "Hi"));
console.log(createUser("Charlie"));
console.log(createUser("Diana", 25, "admin"));
console.log(`Price: $${calculatePrice(100, 10, 5)}`);

// ===== 3. REST PARAMETERS =====
console.log("\n3. REST PARAMETERS:");

// Rest parameters with arrays
function sum(...numbers: number[]): number {
  return numbers.reduce((total, num) => total + num, 0);
}

function joinStrings(separator: string, ...strings: string[]): string {
  return strings.join(separator);
}

// Rest parameters with tuples
function logInfo(message: string, ...details: [string, number, boolean]): void {
  console.log(`${message}: ${details[0]}, ${details[1]}, ${details[2]}`);
}

console.log(`Sum: ${sum(1, 2, 3, 4, 5)}`);
console.log(`Joined: ${joinStrings("-", "hello", "world", "typescript")}`);
logInfo("User info", "John", 30, true);

// ===== 4. FUNCTION TYPES =====
console.log("\n4. FUNCTION TYPES:");

// Function type definitions
type MathOperation = (a: number, b: number) => number;
type StringProcessor = (input: string) => string;
type Predicate<T> = (item: T) => boolean;

// Using function types
const operations: MathOperation[] = [
  (a, b) => a + b,
  (a, b) => a - b,
  (a, b) => a * b,
  (a, b) => a / b
];

const processors: StringProcessor[] = [
  str => str.toUpperCase(),
  str => str.toLowerCase(),
  str => str.trim(),
  str => str.split("").reverse().join("")
];

const isEven: Predicate<number> = n => n % 2 === 0;
const isLongString: Predicate<string> = s => s.length > 5;

console.log(`Operations on 10, 3: ${operations.map(op => op(10, 3))}`);
console.log(`Process "  Hello  ": ${processors.map(proc => proc("  Hello  "))}`);
console.log(`Is 4 even? ${isEven(4)}, Is "TypeScript" long? ${isLongString("TypeScript")}`);

// ===== 5. FUNCTION OVERLOADS =====
console.log("\n5. FUNCTION OVERLOADS:");

// Function overload signatures
function format(value: string): string;
function format(value: number): string;
function format(value: boolean): string;
function format(value: Date): string;

// Implementation signature (must handle all overloads)
function format(value: string | number | boolean | Date): string {
  if (typeof value === "string") {
    return `"${value}"`;
  } else if (typeof value === "number") {
    return value.toFixed(2);
  } else if (typeof value === "boolean") {
    return value ? "YES" : "NO";
  } else if (value instanceof Date) {
    return value.toISOString().split('T')[0];
  } else {
    return String(value);
  }
}

// More complex overloads
function createQuery(table: string): string;
function createQuery(table: string, id: number): string;
function createQuery(table: string, conditions: Record<string, any>): string;

function createQuery(table: string, criteria?: number | Record<string, any>): string {
  if (criteria === undefined) {
    return `SELECT * FROM ${table}`;
  } else if (typeof criteria === "number") {
    return `SELECT * FROM ${table} WHERE id = ${criteria}`;
  } else {
    const conditions = Object.entries(criteria)
      .map(([key, value]) => `${key} = '${value}'`)
      .join(" AND ");
    return `SELECT * FROM ${table} WHERE ${conditions}`;
  }
}

console.log(format("Hello"));
console.log(format(42.567));
console.log(format(true));
console.log(format(new Date()));

console.log(createQuery("users"));
console.log(createQuery("users", 123));
console.log(createQuery("users", { name: "John", age: 30 }));

// ===== 6. HIGHER-ORDER FUNCTIONS =====
console.log("\n6. HIGHER-ORDER FUNCTIONS:");

// Functions that take other functions as parameters
function applyOperation<T, U>(
  items: T[],
  operation: (item: T) => U
): U[] {
  return items.map(operation);
}

function filterItems<T>(
  items: T[],
  predicate: (item: T) => boolean
): T[] {
  return items.filter(predicate);
}

function reduceItems<T, U>(
  items: T[],
  reducer: (acc: U, current: T) => U,
  initialValue: U
): U {
  return items.reduce(reducer, initialValue);
}

const numbers = [1, 2, 3, 4, 5];
const doubled = applyOperation(numbers, x => x * 2);
const evens = filterItems(numbers, x => x % 2 === 0);
const total = reduceItems(numbers, (acc, curr) => acc + curr, 0);

console.log(`Doubled: ${doubled}`);
console.log(`Evens: ${evens}`);
console.log(`Total: ${total}`);

// ===== 7. FUNCTION FACTORIES =====
console.log("\n7. FUNCTION FACTORIES:");

// Functions that return other functions
function createMultiplier(factor: number): (value: number) => number {
  return (value: number) => value * factor;
}

function createValidator<T>(
  rules: Array<(value: T) => boolean>
): (value: T) => boolean {
  return (value: T) => rules.every(rule => rule(value));
}

function createLogger(prefix: string): (message: string) => void {
  return (message: string) => console.log(`[${prefix}] ${message}`);
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

const numberValidator = createValidator<number>([
  n => n > 0,
  n => n < 100,
  n => Number.isInteger(n)
]);

const errorLogger = createLogger("ERROR");
const infoLogger = createLogger("INFO");

console.log(`Double 5: ${double(5)}`);
console.log(`Triple 4: ${triple(4)}`);
console.log(`Is 50 valid? ${numberValidator(50)}`);
console.log(`Is 150 valid? ${numberValidator(150)}`);

errorLogger("Something went wrong!");
infoLogger("Operation completed");

// ===== 8. ASYNC FUNCTIONS =====
console.log("\n8. ASYNC FUNCTIONS:");

// Async function types
type AsyncProcessor<T, U> = (input: T) => Promise<U>;

// Async function with proper typing
async function fetchUserData(id: number): Promise<{ id: number; name: string; email: string }> {
  // Simulate API call
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        id,
        name: `User ${id}`,
        email: `user${id}@example.com`
      });
    }, 100);
  });
}

// Async function with error handling
async function safeApiCall<T>(
  apiCall: () => Promise<T>
): Promise<{ success: true; data: T } | { success: false; error: string }> {
  try {
    const data = await apiCall();
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
}

// Promise-based functions
const processAsync: AsyncProcessor<string, string> = async (input) => {
  await new Promise(resolve => setTimeout(resolve, 50));
  return input.toUpperCase();
};

// Usage (these would normally be awaited in async context)
fetchUserData(1).then(user => {
  console.log(`Fetched user: ${user.name} (${user.email})`);
});

processAsync("hello").then(result => {
  console.log(`Async processing result: ${result}`);
});

// ===== 9. GENERIC FUNCTIONS =====
console.log("\n9. GENERIC FUNCTIONS:");

// Generic function with constraints
function swap<T>(a: T, b: T): [T, T] {
  return [b, a];
}

function identity<T>(value: T): T {
  return value;
}

function mapArray<T, U>(array: T[], mapper: (item: T) => U): U[] {
  return array.map(mapper);
}

// Generic function with multiple type parameters
function combine<T, U>(first: T, second: U): { first: T; second: U } {
  return { first, second };
}

// Conditional return types
function processInput<T extends string | number>(
  input: T
): T extends string ? string : number {
  if (typeof input === "string") {
    return input.toUpperCase() as any;
  } else {
    return (input as number * 2) as any;
  }
}

const [b, a] = swap(1, 2);
const str = identity("hello");
const uppercased = mapArray(["a", "b", "c"], s => s.toUpperCase());
const combined = combine("hello", 42);

console.log(`Swapped: ${a}, ${b}`);
console.log(`Identity: ${str}`);
console.log(`Uppercased: ${uppercased}`);
console.log(`Combined: ${combined.first}, ${combined.second}`);

// ===== 10. FUNCTION COMPOSITION =====
console.log("\n10. FUNCTION COMPOSITION:");

// Compose functions together
function compose<A, B, C>(
  f: (b: B) => C,
  g: (a: A) => B
): (a: A) => C {
  return (a: A) => f(g(a));
}

function pipe<A, B, C>(
  g: (a: A) => B,
  f: (b: B) => C
): (a: A) => C {
  return (a: A) => f(g(a));
}

// Example functions to compose
const addOne = (n: number): number => n + 1;
const multiplyByTwo = (n: number): number => n * 2;
const toString = (n: number): string => n.toString();

// Composition
const addOneThenDouble = compose(multiplyByTwo, addOne);
const doubleeThenToString = pipe(multiplyByTwo, toString);

console.log(`Compose (5 + 1) * 2 = ${addOneThenDouble(5)}`);
console.log(`Pipe 5 * 2 then toString = ${doubleeThenToString(5)}`);

console.log("\n=== FUNCTION CONCEPTS SUMMARY ===");
console.log("✓ Basic function types - parameter and return types");
console.log("✓ Optional parameters - ? syntax");
console.log("✓ Default parameters - = defaultValue");
console.log("✓ Rest parameters - ...args syntax");
console.log("✓ Function types - type aliases for functions");
console.log("✓ Function overloads - multiple signatures");
console.log("✓ Higher-order functions - functions as parameters");
console.log("✓ Function factories - functions returning functions");
console.log("✓ Async functions - Promise-based typing");
console.log("✓ Generic functions - type parameters");
console.log("✓ Function composition - combining functions");

export {
  MathOperation,
  StringProcessor,
  Predicate,
  add,
  multiply,
  greet,
  createUser,
  sum,
  format,
  createQuery,
  applyOperation,
  filterItems,
  createMultiplier,
  createValidator,
  fetchUserData,
  safeApiCall,
  swap,
  mapArray,
  combine,
  compose,
  pipe
}; 