/**
 * TypeScript Advanced Types
 * Union types, intersection types, mapped types, conditional types, and utility types
 */

console.log("=== TYPESCRIPT ADVANCED TYPES ===\n");

// ===== 1. UNION TYPES =====
console.log("1. UNION TYPES:");

// Basic union types
type StringOrNumber = string | number;
type Status = "loading" | "success" | "error";

function formatValue(value: StringOrNumber): string {
  if (typeof value === "string") {
    return value.toUpperCase();
  } else {
    return value.toString();
  }
}

function handleStatus(status: Status): string {
  switch (status) {
    case "loading":
      return "Please wait...";
    case "success":
      return "Operation completed!";
    case "error":
      return "Something went wrong!";
    default:
      // TypeScript ensures all cases are handled
      const exhaustiveCheck: never = status;
      return exhaustiveCheck;
  }
}

console.log(`Format string: ${formatValue("hello")}`);
console.log(`Format number: ${formatValue(42)}`);
console.log(`Status: ${handleStatus("success")}`);

// ===== 2. INTERSECTION TYPES =====
console.log("\n2. INTERSECTION TYPES:");

interface Person {
  name: string;
  age: number;
}

interface Employee {
  employeeId: string;
  department: string;
}

interface Manager {
  teamSize: number;
  budget: number;
}

// Intersection - has ALL properties from both types
type EmployeePerson = Person & Employee;
type ManagerEmployee = Employee & Manager;
type FullManager = Person & Employee & Manager;

const employee: EmployeePerson = {
  name: "John Doe",
  age: 30,
  employeeId: "EMP001",
  department: "Engineering"
};

const manager: FullManager = {
  name: "Jane Smith",
  age: 35,
  employeeId: "MGR001",
  department: "Engineering",
  teamSize: 10,
  budget: 100000
};

console.log(`Employee: ${employee.name} in ${employee.department}`);
console.log(`Manager: ${manager.name} manages ${manager.teamSize} people with $${manager.budget} budget`);

// ===== 3. TYPE ALIASES =====
console.log("\n3. TYPE ALIASES:");

// Complex type aliases
type EventHandler<T> = (event: T) => void;
type AsyncOperation<T> = () => Promise<T>;
type Dictionary<T> = { [key: string]: T };
type Predicate<T> = (item: T) => boolean;

// Using type aliases
const stringDict: Dictionary<string> = {
  name: "John",
  city: "New York"
};

const numberDict: Dictionary<number> = {
  age: 30,
  score: 95
};

const isEven: Predicate<number> = (num) => num % 2 === 0;
const isLongString: Predicate<string> = (str) => str.length > 5;

console.log(`String dict: ${stringDict.name} from ${stringDict.city}`);
console.log(`Is 4 even? ${isEven(4)}, Is "hello" long? ${isLongString("hello")}`);

// ===== 4. LITERAL TYPES =====
console.log("\n4. LITERAL TYPES:");

// String literal types
type Theme = "light" | "dark" | "auto";
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";
type Size = "small" | "medium" | "large";

// Numeric literal types
type DiceRoll = 1 | 2 | 3 | 4 | 5 | 6;
type HttpStatus = 200 | 201 | 400 | 401 | 404 | 500;

// Boolean literal types
type IsTrue = true;
type IsFalse = false;

function setTheme(theme: Theme): void {
  console.log(`Theme set to: ${theme}`);
}

function makeRequest(method: HttpMethod, url: string): string {
  return `${method} request to ${url}`;
}

setTheme("dark");
console.log(makeRequest("POST", "/api/users"));

// ===== 5. MAPPED TYPES =====
console.log("\n5. MAPPED TYPES:");

// Built-in mapped types
interface User {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
}

// Make all properties optional
type PartialUser = Partial<User>;

// Make all properties required
type RequiredUser = Required<PartialUser>;

// Make all properties readonly
type ReadonlyUser = Readonly<User>;

// Pick specific properties
type UserSummary = Pick<User, "id" | "name">;

// Omit specific properties
type CreateUser = Omit<User, "id">;

// Custom mapped types
type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};

type Stringify<T> = {
  [P in keyof T]: string;
};

const partialUser: PartialUser = { name: "John" };
const userSummary: UserSummary = { id: 1, name: "Jane" };
const createUser: CreateUser = { name: "Bob", email: "bob@example.com", isActive: true };

console.log(`Partial user: ${partialUser.name}`);
console.log(`User summary: ${userSummary.id} - ${userSummary.name}`);

// ===== 6. CONDITIONAL TYPES =====
console.log("\n6. CONDITIONAL TYPES:");

// Basic conditional type
type IsString<T> = T extends string ? true : false;

type Test1 = IsString<string>; // true
type Test2 = IsString<number>; // false

// More complex conditional types
type NonNullable<T> = T extends null | undefined ? never : T;

type ArrayElement<T> = T extends (infer U)[] ? U : never;

type StringArrayElement = ArrayElement<string[]>; // string
type NumberArrayElement = ArrayElement<number[]>; // number

// Conditional types with generics
function processInput<T>(
  input: T
): T extends string ? string : T extends number ? number : never {
  if (typeof input === "string") {
    return input.toUpperCase() as any;
  } else if (typeof input === "number") {
    return (input * 2) as any;
  } else {
    throw new Error("Unsupported type");
  }
}

console.log(`Process string: ${processInput("hello")}`);
console.log(`Process number: ${processInput(21)}`);

// ===== 7. UTILITY TYPES =====
console.log("\n7. UTILITY TYPES:");

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  inStock: boolean;
}

// Record - creates object type with specific keys and value type
type ProductsByCategory = Record<string, Product[]>;

const productsByCategory: ProductsByCategory = {
  electronics: [
    { id: 1, name: "Laptop", price: 999, category: "electronics", inStock: true }
  ],
  books: [
    { id: 2, name: "TypeScript Guide", price: 29, category: "books", inStock: true }
  ]
};

// Exclude - removes types from union
type PrimaryColors = "red" | "green" | "blue";
type SecondaryColors = "orange" | "purple" | "green";
type OnlyPrimary = Exclude<PrimaryColors, SecondaryColors>; // "red" | "blue"

// Extract - keeps only specified types from union
type CommonColors = Extract<PrimaryColors, SecondaryColors>; // "green"

// ReturnType - gets return type of function
function getUser() {
  return { id: 1, name: "John", email: "john@example.com" };
}

type UserType = ReturnType<typeof getUser>; // { id: number; name: string; email: string; }

// Parameters - gets parameter types of function
function createProduct(name: string, price: number, inStock: boolean) {
  return { name, price, inStock };
}

type CreateProductParams = Parameters<typeof createProduct>; // [string, number, boolean]

console.log(`Electronics products: ${productsByCategory.electronics[0].name}`);

// ===== 8. TEMPLATE LITERAL TYPES =====
console.log("\n8. TEMPLATE LITERAL TYPES:");

// Template literal types (TypeScript 4.1+)
type EventName<T extends string> = `on${Capitalize<T>}`;
type HttpUrl<T extends string> = `https://${T}.com`;

type ClickEvent = EventName<"click">; // "onClick"
type MouseEvent = EventName<"mouseOver">; // "onMouseOver"

type GoogleUrl = HttpUrl<"google">; // "https://google.com"
type GitHubUrl = HttpUrl<"github">; // "https://github.com"

// More complex template literals
type CSSProperty<T extends string> = `--${T}`;
type CSSValue<T extends string | number> = `${T}px` | `${T}%` | `${T}rem`;

type ColorProperty = CSSProperty<"primary-color">; // "--primary-color"
type SizeValue = CSSValue<16>; // "16px" | "16%" | "16rem"

console.log("Template literal types help with string manipulation at type level");

// ===== 9. DISCRIMINATED UNIONS =====
console.log("\n9. DISCRIMINATED UNIONS:");

// Each type in union has a discriminant property
interface LoadingState {
  status: "loading";
}

interface SuccessState {
  status: "success";
  data: any;
}

interface ErrorState {
  status: "error";
  error: string;
}

type AsyncState = LoadingState | SuccessState | ErrorState;

function handleAsyncState(state: AsyncState): string {
  switch (state.status) {
    case "loading":
      return "Loading...";
    case "success":
      return `Success: ${JSON.stringify(state.data)}`;
    case "error":
      return `Error: ${state.error}`;
    default:
      const exhaustiveCheck: never = state;
      return exhaustiveCheck;
  }
}

const loadingState: AsyncState = { status: "loading" };
const successState: AsyncState = { status: "success", data: { id: 1, name: "John" } };
const errorState: AsyncState = { status: "error", error: "Network error" };

console.log(handleAsyncState(loadingState));
console.log(handleAsyncState(successState));
console.log(handleAsyncState(errorState));

// ===== 10. INDEX ACCESS TYPES =====
console.log("\n10. INDEX ACCESS TYPES:");

  interface Company {
    name: string;
    employees: {
      id: number;
      name: string;
      position: string;
    }[];
    founded: Date;
  }

  // Access nested types
  type CompanyEmployee = Company["employees"][number]; // Gets array element type
  type EmployeeName = CompanyEmployee["name"]; // string
type CompanyName = Company["name"]; // string

  // Keyof operator
  type CompanyKeys = keyof Company; // "name" | "employees" | "founded"
  type EmployeeKeys = keyof CompanyEmployee; // "id" | "name" | "position"

function getCompanyProperty<K extends keyof Company>(company: Company, key: K): Company[K] {
  return company[key];
}

const company: Company = {
  name: "Tech Corp",
  employees: [
    { id: 1, name: "Alice", position: "Developer" },
    { id: 2, name: "Bob", position: "Designer" }
  ],
  founded: new Date("2020-01-01")
};

const companyName = getCompanyProperty(company, "name");
const employees = getCompanyProperty(company, "employees");

console.log(`Company: ${companyName} with ${employees.length} employees`);

// ===== 11. TYPE ASSERTIONS =====
console.log("\n11. TYPE ASSERTIONS:");

// Type assertion (type casting)
function processUnknown(value: unknown): string {
  // Type guard with assertion
  if (typeof value === "string") {
    return value.toUpperCase();
  }
  
  // Assertion when you know the type
  const obj = value as { toString(): string };
  return obj.toString();
}

// Non-null assertion
function getElementLength(element: string | null): number {
  // Use ! to assert non-null (be careful!)
  return element!.length;
}

// Const assertion
const colors = ["red", "green", "blue"] as const;
type Color = typeof colors[number]; // "red" | "green" | "blue"

const config = {
  apiUrl: "https://api.example.com",
  timeout: 5000
} as const;

console.log(`Unknown processing: ${processUnknown("hello")}`);
console.log(`Colors: ${colors.join(", ")}`);

console.log("\n=== ADVANCED TYPES SUMMARY ===");
console.log("✓ Union types - A | B (either A or B)");
console.log("✓ Intersection types - A & B (both A and B)");
console.log("✓ Type aliases - custom type names");
console.log("✓ Literal types - specific value types");
console.log("✓ Mapped types - transform object types");
console.log("✓ Conditional types - T extends U ? X : Y");
console.log("✓ Utility types - Partial, Pick, Omit, etc.");
console.log("✓ Template literals - string manipulation types");
console.log("✓ Discriminated unions - type-safe state management");
console.log("✓ Index access - T[K] property access");
console.log("✓ Type assertions - type casting");

export {
  StringOrNumber,
  Status,
  EmployeePerson,
  FullManager,
  EventHandler,
  AsyncOperation,
  Dictionary,
  Theme,
  HttpMethod,
  User,
  PartialUser,
  UserSummary,
  CreateUser,
  Product,
  AsyncState,
  Company,
  CompanyEmployee,
  processInput,
  handleAsyncState,
  getCompanyProperty,
  processUnknown
}; 