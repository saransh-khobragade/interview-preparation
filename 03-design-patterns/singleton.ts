/**
 * SINGLETON PATTERN
 * 
 * Definition:
 * The Singleton pattern ensures that a class has only one instance throughout 
 * the application lifecycle and provides a global point of access to that instance.
 * 
 * When to Use:
 * - Database connections
 * - Logger instances
 * - Configuration settings
 * - Cache implementations
 * - Thread pools
 * 
 * Benefits:
 * ✅ Controlled access to the sole instance
 * ✅ Reduced memory footprint
 * ✅ Global access point
 * ✅ Lazy initialization
 * 
 * Drawbacks:
 * ❌ Violates Single Responsibility Principle
 * ❌ Difficult to unit test
 * ❌ Can become a global state (anti-pattern)
 * ❌ Threading issues in multi-threaded environments
 * 
 * Key Components:
 * 1. Private static instance variable
 * 2. Private constructor (prevents direct instantiation)
 * 3. Public static getInstance() method
 */

class Database {
  // Static variable to hold the single instance
  private static instance: Database | null = null;
  private connection: string;

  // Private constructor prevents direct instantiation
  // This is the key mechanism that enforces singleton behavior
  private constructor() {
    this.connection = "Connected to database";
    console.log("Database instance created");
    
    // Simulate expensive initialization
    // In real scenario: establish DB connection, load config, etc.
  }

  /**
   * Static method to get the singleton instance
   * This is the only way to access the instance from outside
   * 
   * @returns {Database} The single instance of Database
   */
  public static getInstance(): Database {
    // Lazy initialization: create instance only when first requested
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  // Business methods of the singleton
  public query(sql: string): string {
    return `Executing: ${sql}`;
  }

  public getConnection(): string {
    return this.connection;
  }
}

// Usage Example
const db1 = Database.getInstance();
const db2 = Database.getInstance();

console.log(db1 === db2); // true - same instance
console.log(db1.query("SELECT * FROM users"));
console.log(db2.getConnection());

export { Database }; 