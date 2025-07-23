/**
 * DECORATOR PATTERN
 * 
 * Definition:
 * The Decorator pattern allows behavior to be added to objects dynamically
 * without altering their structure. It provides a flexible alternative to
 * subclassing for extending functionality.
 * 
 * When to Use:
 * - Add features to objects dynamically at runtime
 * - Avoid creating numerous subclasses for every combination
 * - Extend functionality without modifying existing code
 * - Multiple optional features that can be combined
 * 
 * Benefits:
 * ✅ Add/remove behavior at runtime
 * ✅ Combine multiple decorators
 * ✅ Single Responsibility Principle
 * ✅ Open/Closed Principle
 * ✅ Alternative to inheritance
 * 
 * Drawbacks:
 * ❌ Can create many small objects
 * ❌ Complex debugging with multiple decorators
 * ❌ Hard to remove specific decorators
 * ❌ Order of decorators can matter
 * 
 * Key Components:
 * 1. Component Interface - defines operations that can be decorated
 * 2. Concrete Component - basic implementation
 * 3. Base Decorator - wraps a component and delegates operations
 * 4. Concrete Decorators - add specific behavior
 * 
 * Real-world Examples:
 * - Java I/O streams (BufferedReader, FileReader)
 * - Coffee shop add-ons (milk, sugar, syrup)
 * - Text formatting (bold, italic, underline)
 * - Image filters (blur, brightness, contrast)
 * - Middleware in web frameworks
 */

// Component interface - defines the basic operations that can be decorated
// Both concrete components and decorators implement this interface
interface Coffee {
  cost(): number;
  description(): string;
}

/**
 * Concrete Component - The base object that can be decorated
 * 
 * This is the core object that provides the basic functionality.
 * Decorators will wrap this object to add additional features.
 */
class BasicCoffee implements Coffee {
  cost(): number {
    return 2.0; // Base price for basic coffee
  }

  description(): string {
    return "Basic Coffee";
  }
}

/**
 * Base Decorator - Abstract class that wraps a Coffee component
 * 
 * This class implements the Component interface and maintains a reference
 * to a Component object. It delegates all operations to the wrapped component
 * by default, but concrete decorators can override these methods to add behavior.
 */
abstract class CoffeeDecorator implements Coffee {
  protected coffee: Coffee; // The component being decorated

  constructor(coffee: Coffee) {
    this.coffee = coffee;
  }

  /**
   * Default implementation delegates to the wrapped component
   * Concrete decorators can override this to add their own cost
   */
  cost(): number {
    return this.coffee.cost();
  }

  /**
   * Default implementation delegates to the wrapped component
   * Concrete decorators can override this to modify the description
   */
  description(): string {
    return this.coffee.description();
  }
}

/**
 * Concrete Decorators - Add specific functionality to the coffee
 * 
 * Each decorator adds its own behavior while maintaining the interface.
 * Multiple decorators can be chained together to combine effects.
 */

class Milk extends CoffeeDecorator {
  private readonly MILK_COST = 0.5;

  /**
   * Adds milk cost to the base coffee cost
   * Demonstrates how decorators extend functionality
   */
  cost(): number {
    return this.coffee.cost() + this.MILK_COST;
  }

  /**
   * Appends milk to the description
   * Shows how decorators can modify the output
   */
  description(): string {
    return this.coffee.description() + " + Milk";
  }
}

class Sugar extends CoffeeDecorator {
  private readonly SUGAR_COST = 0.2;

  cost(): number {
    return this.coffee.cost() + this.SUGAR_COST;
  }

  description(): string {
    return this.coffee.description() + " + Sugar";
  }
}

class Vanilla extends CoffeeDecorator {
  private readonly VANILLA_COST = 0.7;

  cost(): number {
    return this.coffee.cost() + this.VANILLA_COST;
  }

  description(): string {
    return this.coffee.description() + " + Vanilla";
  }
}

/**
 * Additional Decorator Examples
 * Demonstrates how easy it is to add new decorators
 */

class WhippedCream extends CoffeeDecorator {
  private readonly WHIPPED_CREAM_COST = 0.6;

  cost(): number {
    return this.coffee.cost() + this.WHIPPED_CREAM_COST;
  }

  description(): string {
    return this.coffee.description() + " + Whipped Cream";
  }
}

class ExtraShot extends CoffeeDecorator {
  private readonly EXTRA_SHOT_COST = 1.0;

  cost(): number {
    return this.coffee.cost() + this.EXTRA_SHOT_COST;
  }

  description(): string {
    return this.coffee.description() + " + Extra Shot";
  }
}

// Usage Example
let coffee: Coffee = new BasicCoffee();
console.log(`${coffee.description()}: $${coffee.cost()}`);

coffee = new Milk(coffee);
console.log(`${coffee.description()}: $${coffee.cost()}`);

coffee = new Sugar(coffee);
console.log(`${coffee.description()}: $${coffee.cost()}`);

coffee = new Vanilla(coffee);
console.log(`${coffee.description()}: $${coffee.cost()}`);

export { Coffee, BasicCoffee, CoffeeDecorator, Milk, Sugar, Vanilla }; 