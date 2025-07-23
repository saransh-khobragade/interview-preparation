/**
 * PROTOTYPE PATTERN
 * 
 * Definition:
 * The Prototype pattern creates objects by cloning existing instances (prototypes)
 * rather than creating new instances from scratch. It's useful when object creation
 * is expensive or complex.
 * 
 * When to Use:
 * - Object creation is expensive (database calls, complex calculations)
 * - Need to create objects similar to existing ones
 * - Avoid subclassing for object creation
 * - Runtime object configuration
 * - Composition over inheritance scenarios
 * 
 * Benefits:
 * ✅ Reduces object creation cost
 * ✅ Hides complexity of object creation
 * ✅ Alternative to inheritance
 * ✅ Runtime object configuration
 * ✅ Can clone complex object graphs
 * 
 * Drawbacks:
 * ❌ Complex objects may be hard to clone
 * ❌ Circular references can cause issues
 * ❌ Deep vs shallow copy considerations
 * ❌ Each class must implement clone method
 * 
 * Key Components:
 * 1. Prototype Interface - declares clone method
 * 2. Concrete Prototypes - implement clone method
 * 3. Client - creates new objects by cloning prototypes
 * 4. Prototype Registry (optional) - manages prototype instances
 * 
 * Real-world Examples:
 * - Document templates (Word, PDF templates)
 * - Game object spawning (enemies, items, terrain)
 * - UI component templates
 * - Configuration presets
 * - Database record templates
 */

/**
 * Prototype Interface - Defines the contract for cloneable objects
 * 
 * Generic interface that ensures type safety when cloning objects.
 * All prototypes must implement this interface.
 */
interface Cloneable<T> {
  clone(): T;
}

/**
 * Concrete Prototype - Car class that can be cloned
 * 
 * Demonstrates a simple prototype with basic properties.
 * Each car can be cloned to create new instances with the same configuration.
 */
class Car implements Cloneable<Car> {
  private brand: string;
  private model: string;
  private color: string;
  private year: number;
  private features: string[];

  constructor(brand: string, model: string, color: string, year: number) {
    this.brand = brand;
    this.model = model;
    this.color = color;
    this.year = year;
    this.features = [];
  }

  /**
   * Clone method - Creates a new Car instance with same properties
   * This is a shallow clone for simple properties
   */
  clone(): Car {
    const cloned = new Car(this.brand, this.model, this.color, this.year);
    
    // Deep copy the features array
    cloned.features = [...this.features];
    
    console.log(`🚗 Cloning car: ${this.getInfo()}`);
    return cloned;
  }

  // Setter methods for customizing cloned objects
  setBrand(brand: string): void {
    this.brand = brand;
  }

  setModel(model: string): void {
    this.model = model;
  }

  setColor(color: string): void {
    this.color = color;
  }

  setYear(year: number): void {
    this.year = year;
  }

  addFeature(feature: string): void {
    this.features.push(feature);
  }

  getFeatures(): string[] {
    return [...this.features]; // Return copy to prevent external modification
  }

  getInfo(): string {
    const featuresStr = this.features.length > 0 ? ` (${this.features.join(", ")})` : "";
    return `${this.year} ${this.brand} ${this.model} in ${this.color}${featuresStr}`;
  }
}

/**
 * Complex Prototype Example - Document with deep cloning
 * 
 * Demonstrates how to handle complex objects with nested properties
 * that require deep cloning to avoid shared references.
 */
class Document implements Cloneable<Document> {
  private title: string;
  private content: string;
  private metadata: { [key: string]: any };
  private createdAt: Date;
  private tags: string[];

  constructor(title: string, content: string) {
    this.title = title;
    this.content = content;
    this.metadata = {};
    this.createdAt = new Date();
    this.tags = [];
  }

  /**
   * Clone method with deep copying for complex properties
   * 
   * Demonstrates proper deep cloning to avoid shared references
   * between original and cloned objects.
   */
  clone(): Document {
    console.log(`📄 Cloning document: "${this.title}"`);
    
    const cloned = new Document(this.title, this.content);
    
    // Deep copy metadata object to avoid shared references
    cloned.metadata = JSON.parse(JSON.stringify(this.metadata));
    
    // Clone the date object
    cloned.createdAt = new Date(this.createdAt.getTime());
    
    // Deep copy tags array
    cloned.tags = [...this.tags];
    
    return cloned;
  }

  setTitle(title: string): void {
    this.title = title;
  }

  setContent(content: string): void {
    this.content = content;
  }

  addMetadata(key: string, value: any): void {
    this.metadata[key] = value;
  }

  getMetadata(): { [key: string]: any } {
    // Return a copy to prevent external modification
    return JSON.parse(JSON.stringify(this.metadata));
  }

  addTag(tag: string): void {
    if (!this.tags.includes(tag)) {
      this.tags.push(tag);
    }
  }

  getTags(): string[] {
    return [...this.tags];
  }

  getInfo(): string {
    const preview = this.content.length > 50 
      ? this.content.substring(0, 50) + "..." 
      : this.content;
    
    const metadataCount = Object.keys(this.metadata).length;
    const tagsStr = this.tags.length > 0 ? ` [${this.tags.join(", ")}]` : "";
    
    return `📄 Document: "${this.title}" - ${preview} (${metadataCount} metadata items)${tagsStr}`;
  }
}

/**
 * Prototype Registry - Manages a collection of prototype objects
 * 
 * The registry pattern provides a centralized way to store and retrieve
 * prototype instances. This is useful when you have many predefined
 * prototypes that clients can clone.
 */
class CarPrototypeRegistry {
  private prototypes: { [key: string]: Car } = {};

  /**
   * Adds a prototype to the registry
   * @param key - Unique identifier for the prototype
   * @param car - The car prototype to store
   */
  addPrototype(key: string, car: Car): void {
    console.log(`📝 Registering car prototype: ${key}`);
    this.prototypes[key] = car;
  }

  /**
   * Gets a clone of the specified prototype
   * @param key - The prototype identifier
   * @returns A cloned car or undefined if not found
   */
  getPrototype(key: string): Car | undefined {
    const prototype = this.prototypes[key];
    if (prototype) {
      console.log(`🏭 Creating car from prototype: ${key}`);
      return prototype.clone();
    } else {
      console.log(`❌ Prototype not found: ${key}`);
      return undefined;
  }
  }

  /**
   * Removes a prototype from the registry
   * @param key - The prototype identifier to remove
   */
  removePrototype(key: string): boolean {
    if (this.prototypes[key]) {
      delete this.prototypes[key];
      console.log(`🗑️  Removed prototype: ${key}`);
      return true;
    }
    return false;
  }

  /**
   * Lists all available prototype keys
   */
  listPrototypes(): string[] {
    return Object.keys(this.prototypes);
  }

  /**
   * Gets detailed information about all prototypes
   */
  getPrototypeInfo(): { [key: string]: string } {
    const info: { [key: string]: string } = {};
    for (const [key, car] of Object.entries(this.prototypes)) {
      info[key] = car.getInfo();
    }
    return info;
  }
}

/**
 * Generic Prototype Registry for any cloneable type
 * 
 * Demonstrates how to create a reusable registry for any prototype type
 */
class PrototypeRegistry<T extends Cloneable<T>> {
  private prototypes: Map<string, T> = new Map();

  addPrototype(key: string, prototype: T): void {
    this.prototypes.set(key, prototype);
  }

  getPrototype(key: string): T | undefined {
    const prototype = this.prototypes.get(key);
    return prototype ? prototype.clone() : undefined;
  }

  removePrototype(key: string): boolean {
    return this.prototypes.delete(key);
  }

  listPrototypes(): string[] {
    return Array.from(this.prototypes.keys());
  }

  clear(): void {
    this.prototypes.clear();
  }
}

// Usage Example
console.log("=== Car Cloning ===");
const originalCar = new Car("Toyota", "Camry", "Blue", 2023);
console.log("Original:", originalCar.getInfo());

const clonedCar = originalCar.clone();
clonedCar.setColor("Red");
clonedCar.setYear(2024);

console.log("Original:", originalCar.getInfo()); // Unchanged
console.log("Cloned:", clonedCar.getInfo());     // Modified

console.log("\n=== Document Cloning ===");
const originalDoc = new Document("Report", "This is a quarterly report...");
originalDoc.addMetadata("author", "John Doe");
originalDoc.addMetadata("department", "Finance");

const clonedDoc = originalDoc.clone();
clonedDoc.setTitle("Monthly Report");
clonedDoc.addMetadata("month", "January");

console.log("Original:", originalDoc.getInfo());
console.log("Cloned:", clonedDoc.getInfo());

console.log("\n=== Prototype Registry ===");
const registry = new CarPrototypeRegistry();

// Add prototypes
registry.addPrototype("sedan", new Car("Honda", "Accord", "Black", 2023));
registry.addPrototype("suv", new Car("Ford", "Explorer", "White", 2023));

// Create cars from prototypes
const newSedan = registry.getPrototype("sedan");
const newSuv = registry.getPrototype("suv");

if (newSedan) {
  newSedan.setColor("Silver");
  console.log("New sedan:", newSedan.getInfo());
}

if (newSuv) {
  newSuv.setYear(2024);
  console.log("New SUV:", newSuv.getInfo());
}

console.log("Available prototypes:", registry.listPrototypes());

export { Cloneable, Car, Document, CarPrototypeRegistry }; 