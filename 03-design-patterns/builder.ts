/**
 * BUILDER PATTERN
 * 
 * Definition:
 * The Builder pattern constructs complex objects step by step. It allows you
 * to create different types and representations of an object using the same
 * construction process.
 * 
 * When to Use:
 * - Create complex objects with many optional parameters
 * - Avoid "telescoping constructor" anti-pattern
 * - Need different representations of the same object
 * - Step-by-step construction process is important
 * 
 * Benefits:
 * ✅ Fluent interface for readable object creation
 * ✅ Step-by-step construction
 * ✅ Can create different representations
 * ✅ Immutable objects possible
 * ✅ Single Responsibility Principle
 * 
 * Drawbacks:
 * ❌ Increases code complexity
 * ❌ More classes to maintain
 * ❌ May be overkill for simple objects
 * 
 * Key Components:
 * 1. Product - the complex object being built
 * 2. Builder Interface - defines construction steps
 * 3. Concrete Builder - implements construction steps
 * 4. Director (optional) - orchestrates construction sequence
 * 
 * Real-world Examples:
 * - SQL query builders (SELECT, FROM, WHERE, ORDER BY)
 * - Configuration objects (database connections, UI components)
 * - Email messages (to, cc, subject, body, attachments)
 * - HTTP requests (URL, headers, body, method)
 * - Document builders (PDF, HTML, XML)
 */

/**
 * Product - The complex object being constructed
 * 
 * This is the final object that the Builder pattern creates.
 * It can have many optional components and configurations.
 */
class House {
  private walls: string = "";
  private roof: string = "";
  private foundation: string = "";
  private windows: number = 0;
  private doors: number = 0;
  private garage: boolean = false;
  private garden: boolean = false;
  private swimmingPool: boolean = false;

  // Setter methods for building the house components
  setWalls(walls: string): void {
    this.walls = walls;
  }

  setRoof(roof: string): void {
    this.roof = roof;
  }

  setFoundation(foundation: string): void {
    this.foundation = foundation;
  }

  setWindows(windows: number): void {
    this.windows = windows;
  }

  setDoors(doors: number): void {
    this.doors = doors;
  }

  setGarage(hasGarage: boolean): void {
    this.garage = hasGarage;
  }

  setGarden(hasGarden: boolean): void {
    this.garden = hasGarden;
  }

  setSwimmingPool(hasPool: boolean): void {
    this.swimmingPool = hasPool;
  }

  /**
   * Returns a description of the constructed house
   * Shows all the components that were built
   */
  describe(): string {
    let description = `🏠 House: ${this.foundation} foundation, ${this.walls} walls, ${this.roof} roof, ${this.windows} windows, ${this.doors} doors`;
    
    const extras: string[] = [];
    if (this.garage) extras.push("garage");
    if (this.garden) extras.push("garden");
    if (this.swimmingPool) extras.push("swimming pool");
    
    if (extras.length > 0) {
      description += ` with ${extras.join(", ")}`;
    }
    
    return description;
  }
}

/**
 * Builder Interface - Defines the construction steps
 * 
 * This interface defines all the steps needed to build a House.
 * Each method returns the builder itself to enable method chaining.
 */
interface HouseBuilder {
  buildFoundation(): HouseBuilder;
  buildWalls(): HouseBuilder;
  buildRoof(): HouseBuilder;
  addWindows(count: number): HouseBuilder;
  addDoors(count: number): HouseBuilder;
  addGarage(): HouseBuilder;
  addGarden(): HouseBuilder;
  addSwimmingPool(): HouseBuilder;
  getHouse(): House;
}

/**
 * Concrete Builder - Implements the construction steps
 * 
 * This class implements each step of the building process.
 * It maintains the state of the object being built and provides
 * a fluent interface for construction.
 */
class ConcreteHouseBuilder implements HouseBuilder {
  private house: House;

  constructor() {
    this.reset();
  }

  /**
   * Resets the builder to start building a new house
   */
  reset(): void {
    this.house = new House();
  }

  /**
   * Builds the foundation - returns this for method chaining
   */
  buildFoundation(): HouseBuilder {
    console.log("🔨 Building concrete foundation...");
    this.house.setFoundation("Concrete");
    return this; // Enable fluent interface
  }

  /**
   * Builds the walls - returns this for method chaining
   */
  buildWalls(): HouseBuilder {
    console.log("🧱 Building brick walls...");
    this.house.setWalls("Brick");
    return this;
  }

  /**
   * Builds the roof - returns this for method chaining
   */
  buildRoof(): HouseBuilder {
    console.log("🏠 Installing tile roof...");
    this.house.setRoof("Tile");
    return this;
  }

  /**
   * Adds windows to the house
   * @param count - Number of windows to add
   */
  addWindows(count: number): HouseBuilder {
    console.log(`🪟 Installing ${count} windows...`);
    this.house.setWindows(count);
    return this;
  }

  /**
   * Adds doors to the house
   * @param count - Number of doors to add
   */
  addDoors(count: number): HouseBuilder {
    console.log(`🚪 Installing ${count} doors...`);
    this.house.setDoors(count);
    return this;
  }

  /**
   * Adds a garage to the house
   */
  addGarage(): HouseBuilder {
    console.log("🚗 Adding garage...");
    this.house.setGarage(true);
    return this;
  }

  /**
   * Adds a garden to the house
   */
  addGarden(): HouseBuilder {
    console.log("🌱 Adding garden...");
    this.house.setGarden(true);
    return this;
  }

  /**
   * Adds a swimming pool to the house
   */
  addSwimmingPool(): HouseBuilder {
    console.log("🏊 Adding swimming pool...");
    this.house.setSwimmingPool(true);
    return this;
  }

  /**
   * Returns the built house and resets the builder
   */
  getHouse(): House {
    const result = this.house;
    this.reset(); // Reset for next house
    return result;
  }
}

/**
 * Alternative Builder for different house types
 * Demonstrates how different builders can create different representations
 */
class WoodenHouseBuilder implements HouseBuilder {
  private house: House;

  constructor() {
    this.house = new House();
  }

  buildFoundation(): HouseBuilder {
    console.log("🪵 Building wooden foundation...");
    this.house.setFoundation("Wooden");
    return this;
  }

  buildWalls(): HouseBuilder {
    console.log("🌲 Building wooden walls...");
    this.house.setWalls("Wood");
    return this;
  }

  buildRoof(): HouseBuilder {
    console.log("🏠 Installing shingle roof...");
    this.house.setRoof("Shingle");
    return this;
  }

  addWindows(count: number): HouseBuilder {
    console.log(`🪟 Installing ${count} wooden-framed windows...`);
    this.house.setWindows(count);
    return this;
  }

  addDoors(count: number): HouseBuilder {
    console.log(`🚪 Installing ${count} wooden doors...`);
    this.house.setDoors(count);
    return this;
  }

  addGarage(): HouseBuilder {
    console.log("🚗 Adding wooden garage...");
    this.house.setGarage(true);
    return this;
  }

  addGarden(): HouseBuilder {
    console.log("🌱 Adding natural garden...");
    this.house.setGarden(true);
    return this;
  }

  addSwimmingPool(): HouseBuilder {
    console.log("🏊 Adding natural swimming pool...");
    this.house.setSwimmingPool(true);
    return this;
  }

  getHouse(): House {
    return this.house;
  }
}

/**
 * Director (Optional) - Orchestrates the construction process
 * 
 * The Director knows how to build specific types of houses.
 * It provides predefined construction sequences for common house types.
 * Clients can use the Director for standard configurations or use
 * the Builder directly for custom configurations.
 */
class HouseDirector {
  /**
   * Builds a simple house with basic features
   * @param builder - The builder to use for construction
   */
  static buildSimpleHouse(builder: HouseBuilder): House {
    console.log("🏗️  Director: Building simple house...\n");
    return builder
      .buildFoundation()
      .buildWalls()
      .buildRoof()
      .addWindows(4)
      .addDoors(1)
      .getHouse();
  }

  /**
   * Builds a luxury house with premium features
   * @param builder - The builder to use for construction
   */
  static buildLuxuryHouse(builder: HouseBuilder): House {
    console.log("🏗️  Director: Building luxury house...\n");
    return builder
      .buildFoundation()
      .buildWalls()
      .buildRoof()
      .addWindows(10)
      .addDoors(3)
      .addGarage()
      .addGarden()
      .addSwimmingPool()
      .getHouse();
  }

  /**
   * Builds a family house with practical features
   * @param builder - The builder to use for construction
   */
  static buildFamilyHouse(builder: HouseBuilder): House {
    console.log("🏗️  Director: Building family house...\n");
    return builder
      .buildFoundation()
      .buildWalls()
      .buildRoof()
      .addWindows(8)
      .addDoors(2)
      .addGarage()
      .addGarden()
      .getHouse();
  }

  /**
   * Builds an eco-friendly house
   * @param builder - The builder to use for construction
   */
  static buildEcoHouse(builder: HouseBuilder): House {
    console.log("🏗️  Director: Building eco-friendly house...\n");
    return builder
      .buildFoundation()
      .buildWalls()
      .buildRoof()
      .addWindows(6)
      .addDoors(2)
      .addGarden()
      .getHouse();
  }
}

// Usage Example
const builder = new ConcreteHouseBuilder();

// Build house step by step
const customHouse = builder
  .buildFoundation()
  .buildWalls()
  .buildRoof()
  .addWindows(6)
  .addDoors(2)
  .getHouse();

console.log(customHouse.describe());

// Use director for predefined configurations
const simpleHouse = HouseDirector.buildSimpleHouse(new ConcreteHouseBuilder());
console.log(simpleHouse.describe());

const luxuryHouse = HouseDirector.buildLuxuryHouse(new ConcreteHouseBuilder());
console.log(luxuryHouse.describe());

export { House, HouseBuilder, ConcreteHouseBuilder, HouseDirector }; 