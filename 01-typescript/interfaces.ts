/**
 * TypeScript Interfaces
 * Defining contracts for object shapes and structure
 */

console.log("=== TYPESCRIPT INTERFACES ===\n");

// ===== 1. BASIC INTERFACE =====
console.log("1. BASIC INTERFACE:");

interface User {
  id: number;
  name: string;
  email: string;
}

const user1: User = {
  id: 1,
  name: "John Doe",
  email: "john@example.com"
};

console.log(`User: ${user1.name} (${user1.email})`);

// ===== 2. OPTIONAL PROPERTIES =====
console.log("\n2. OPTIONAL PROPERTIES:");

interface Product {
  id: number;
  name: string;
  price: number;
  description?: string; // Optional property
  category?: string;    // Optional property
}

const product1: Product = {
  id: 1,
  name: "Laptop",
  price: 999.99
};

const product2: Product = {
  id: 2,
  name: "Phone",
  price: 599.99,
  description: "Latest smartphone",
  category: "Electronics"
};

console.log(`Product 1: ${product1.name} - $${product1.price}`);
console.log(`Product 2: ${product2.name} - $${product2.price} (${product2.category})`);

// ===== 3. READONLY PROPERTIES =====
console.log("\n3. READONLY PROPERTIES:");

interface Config {
  readonly apiKey: string;
  readonly baseUrl: string;
  timeout: number; // Can be modified
}

const config: Config = {
  apiKey: "abc123",
  baseUrl: "https://api.example.com",
  timeout: 5000
};

config.timeout = 10000; // OK - can modify
// config.apiKey = "new-key"; // Error! Cannot modify readonly property

console.log(`Config: ${config.baseUrl} with timeout ${config.timeout}ms`);

// ===== 4. FUNCTION TYPES IN INTERFACES =====
console.log("\n4. FUNCTION TYPES IN INTERFACES:");

interface Calculator {
  add(a: number, b: number): number;
  subtract(a: number, b: number): number;
  multiply(a: number, b: number): number;
  divide(a: number, b: number): number;
}

const calculator: Calculator = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b,
  divide: (a, b) => b !== 0 ? a / b : 0
};

console.log(`Calculator: 10 + 5 = ${calculator.add(10, 5)}`);
console.log(`Calculator: 10 * 3 = ${calculator.multiply(10, 3)}`);

// ===== 5. INDEX SIGNATURES =====
console.log("\n5. INDEX SIGNATURES:");

// String index signature
interface StringDictionary {
  [key: string]: string;
}

const translations: StringDictionary = {
  hello: "hola",
  goodbye: "adiós",
  thanks: "gracias"
};

console.log(`Translation of 'hello': ${translations.hello}`);
console.log(`Translation of 'thanks': ${translations.thanks}`);

// Number index signature
interface NumberArray {
  [index: number]: number;
}

const fibonacci: NumberArray = [1, 1, 2, 3, 5, 8, 13];
console.log(`Fibonacci[4]: ${fibonacci[4]}`);

// Mixed index signatures
interface MixedDict {
  [key: string]: any;
  [key: number]: any;
}

// ===== 6. EXTENDING INTERFACES =====
console.log("\n6. EXTENDING INTERFACES:");

interface Animal {
  name: string;
  age: number;
}

interface Dog extends Animal {
  breed: string;
  bark(): string;
}

interface Bird extends Animal {
  wingspan: number;
  fly(): string;
}

const dog: Dog = {
  name: "Buddy",
  age: 3,
  breed: "Golden Retriever",
  bark: () => "Woof!"
};

const bird: Bird = {
  name: "Tweety",
  age: 1,
  wingspan: 15,
  fly: () => "Flying high!"
};

console.log(`Dog: ${dog.name} (${dog.breed}) says ${dog.bark()}`);
console.log(`Bird: ${bird.name} with ${bird.wingspan}cm wingspan - ${bird.fly()}`);

// ===== 7. MULTIPLE INHERITANCE =====
console.log("\n7. MULTIPLE INHERITANCE:");

interface Flyable {
  fly(): void;
}

interface Swimmable {
  swim(): void;
}

interface Duck extends Animal, Flyable, Swimmable {
  quack(): string;
}

const duck: Duck = {
  name: "Donald",
  age: 2,
  fly: () => console.log("Flying over the pond"),
  swim: () => console.log("Swimming in the water"),
  quack: () => "Quack quack!"
};

console.log(`Duck ${duck.name} says: ${duck.quack()}`);
duck.fly();
duck.swim();

// ===== 8. HYBRID TYPES =====
console.log("\n8. HYBRID TYPES:");

// Interface that acts as both object and function
interface Counter {
  (start: number): string;
  interval: number;
  reset(): void;
}

function getCounter(): Counter {
  let counter = function(start: number) {
    return `Started counting from ${start}`;
  } as Counter;
  
  counter.interval = 1000;
  counter.reset = function() {
    console.log("Counter reset");
  };
  
  return counter;
}

const myCounter = getCounter();
console.log(myCounter(10));
console.log(`Interval: ${myCounter.interval}ms`);
myCounter.reset();

// ===== 9. GENERIC INTERFACES =====
console.log("\n9. GENERIC INTERFACES:");

interface Repository<T> {
  getById(id: number): T | undefined;
  getAll(): T[];
  add(item: T): void;
  update(id: number, item: T): void;
  delete(id: number): void;
}

interface Book {
  id: number;
  title: string;
  author: string;
}

class BookRepository implements Repository<Book> {
  private books: Book[] = [];

  getById(id: number): Book | undefined {
    return this.books.find(book => book.id === id);
  }

  getAll(): Book[] {
    return [...this.books];
  }

  add(book: Book): void {
    this.books.push(book);
  }

  update(id: number, book: Book): void {
    const index = this.books.findIndex(b => b.id === id);
    if (index !== -1) {
      this.books[index] = book;
    }
  }

  delete(id: number): void {
    this.books = this.books.filter(book => book.id !== id);
  }
}

const bookRepo = new BookRepository();
bookRepo.add({ id: 1, title: "TypeScript Guide", author: "John Smith" });
bookRepo.add({ id: 2, title: "JavaScript Basics", author: "Jane Doe" });

console.log(`All books: ${bookRepo.getAll().map(b => b.title).join(", ")}`);
console.log(`Book 1: ${bookRepo.getById(1)?.title}`);

// ===== 10. INTERFACE MERGING =====
console.log("\n10. INTERFACE MERGING:");

// Multiple interface declarations with same name merge
interface Window {
  title: string;
}

interface Window {
  width: number;
  height: number;
}

// Now Window has all properties: title, width, height
const window: Window = {
  title: "My Window",
  width: 800,
  height: 600
};

console.log(`Window: ${window.title} (${window.width}x${window.height})`);

// ===== 11. CONDITIONAL PROPERTIES =====
console.log("\n11. CONDITIONAL PROPERTIES:");

interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
  timestamp: Date;
}

const successResponse: ApiResponse<User[]> = {
  success: true,
  data: [user1],
  timestamp: new Date()
};

const errorResponse: ApiResponse<null> = {
  success: false,
  data: null,
  error: "User not found",
  timestamp: new Date()
};

console.log(`Success response: ${successResponse.data.length} users`);
console.log(`Error response: ${errorResponse.error}`);

// ===== 12. UTILITY WITH INTERFACES =====
console.log("\n12. UTILITY WITH INTERFACES:");

interface TaskBase {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
}

// Partial - makes all properties optional
type CreateTask = Partial<TaskBase>;

// Pick - select specific properties
type TaskSummary = Pick<TaskBase, "id" | "title" | "completed">;

// Omit - exclude specific properties
type UpdateTask = Omit<TaskBase, "id">;

const newTask: CreateTask = {
  title: "Learn TypeScript",
  priority: "high"
};

const taskSummary: TaskSummary = {
  id: 1,
  title: "Complete project",
  completed: false
};

console.log(`New task: ${newTask.title} (${newTask.priority})`);
console.log(`Task summary: ${taskSummary.title} - ${taskSummary.completed ? 'Done' : 'Pending'}`);

console.log("\n=== INTERFACE CONCEPTS SUMMARY ===");
console.log("✓ Basic interfaces - define object structure");
console.log("✓ Optional properties - ? syntax");
console.log("✓ Readonly properties - readonly keyword");
console.log("✓ Function types - method signatures");
console.log("✓ Index signatures - dynamic property access");
console.log("✓ Interface inheritance - extends keyword");
console.log("✓ Multiple inheritance - extends multiple interfaces");
console.log("✓ Hybrid types - function + object properties");
console.log("✓ Generic interfaces - <T> type parameters");
console.log("✓ Interface merging - multiple declarations merge");
console.log("✓ Utility types - Partial, Pick, Omit, etc.");

export {
  User,
  Product,
  Config,
  Calculator,
  Animal,
  Dog,
  Bird,
  Duck,
  Repository,
  Book,
  BookRepository,
  Window,
  ApiResponse,
  TaskBase
}; 