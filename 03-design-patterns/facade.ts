/**
 * FACADE PATTERN
 * 
 * Definition:
 * The Facade pattern provides a simplified interface to a complex subsystem.
 * It defines a higher-level interface that makes the subsystem easier to use
 * by hiding the complexity of the system.
 * 
 * When to Use:
 * - Simplify interaction with complex APIs or libraries
 * - Provide a single entry point to a subsystem
 * - Decouple clients from subsystem components
 * - Layer complex systems for better organization
 * 
 * Benefits:
 * ✅ Simplifies complex interfaces
 * ✅ Decouples client from subsystem
 * ✅ Promotes loose coupling
 * ✅ Easier to use and understand
 * ✅ Can provide default behavior
 * 
 * Drawbacks:
 * ❌ Can become a "god object" if not designed carefully
 * ❌ May limit access to advanced features
 * ❌ Additional layer of abstraction
 * 
 * Key Components:
 * 1. Facade - provides simple interface to complex subsystem
 * 2. Subsystem Classes - implement complex functionality
 * 3. Client - uses the Facade instead of subsystem directly
 * 
 * Real-world Examples:
 * - Computer startup process (hide CPU, memory, disk complexity)
 * - Web framework facades (hide HTTP, routing, templating complexity)
 * - Database ORM (hide SQL, connection, transaction complexity)
 * - Payment processing (hide multiple gateway APIs)
 * - Home theater systems (hide TV, sound, lighting complexity)
 */

/**
 * Complex Subsystem Classes
 * 
 * These classes represent the complex internal workings of a computer.
 * Each has its own interface and specific responsibilities.
 * Clients shouldn't need to know about all these details.
 */

class CPU {
  /**
   * Freezes the processor to prepare for boot sequence
   */
  freeze(): void {
    console.log("🔧 CPU: Freezing processor for initialization");
  }

  /**
   * Jumps to a specific memory position to start execution
   * @param position - Memory address to jump to
   */
  jump(position: number): void {
    console.log(`🔧 CPU: Jumping to memory position ${position}`);
  }

  /**
   * Executes the loaded instructions
   */
  execute(): void {
    console.log("🔧 CPU: Executing boot instructions");
  }

  /**
   * Additional CPU operations that might be needed
   */
  setFrequency(frequency: number): void {
    console.log(`🔧 CPU: Setting frequency to ${frequency}MHz`);
  }

  enableCache(): void {
    console.log("🔧 CPU: Enabling processor cache");
  }
}

class Memory {
  /**
   * Loads data into memory at specified position
   * @param position - Memory address
   * @param data - Data to load
   */
  load(position: number, data: string): void {
    console.log(`💾 Memory: Loading '${data}' at position ${position}`);
  }

  /**
   * Additional memory operations
   */
  allocate(size: number): number {
    console.log(`💾 Memory: Allocating ${size} bytes`);
    return Math.floor(Math.random() * 1000000); // Simulate memory address
  }

  clear(position: number, size: number): void {
    console.log(`💾 Memory: Clearing ${size} bytes at position ${position}`);
  }
}

class HardDrive {
  /**
   * Reads data from hard drive
   * @param lba - Logical Block Address
   * @param size - Number of bytes to read
   * @returns The read data
   */
  read(lba: number, size: number): string {
    console.log(`💿 HardDrive: Reading ${size} bytes from LBA ${lba}`);
    return "boot sector data"; // Simulate boot data
  }

  /**
   * Additional hard drive operations
   */
  seek(position: number): void {
    console.log(`💿 HardDrive: Seeking to position ${position}`);
  }

  spinUp(): void {
    console.log("💿 HardDrive: Spinning up disk");
  }
}

/**
 * Facade - Provides a simple interface to the complex computer subsystem
 * 
 * The facade hides the complexity of the boot process from clients.
 * Instead of requiring clients to understand CPU, Memory, and HardDrive
 * interactions, they can simply call start() and shutdown().
 */
class ComputerFacade {
  // References to subsystem components
  private cpu: CPU;
  private memory: Memory;
  private hardDrive: HardDrive;

  constructor() {
    // Initialize all subsystem components
    this.cpu = new CPU();
    this.memory = new Memory();
    this.hardDrive = new HardDrive();
  }

  /**
   * Simple start method that hides complex boot sequence
   * 
   * This is the main benefit of the Facade pattern - clients don't need
   * to know the intricate details of the boot process. They just call start().
   */
  start(): void {
    console.log("🖥️  Computer: Initiating startup sequence...\n");
    
    // Complex boot sequence hidden from client
    // Step 1: Prepare hardware
    this.hardDrive.spinUp();
    this.cpu.setFrequency(2400);
    this.cpu.enableCache();
    
    // Step 2: Initialize boot process
    this.cpu.freeze();
    
    // Step 3: Load boot data
    this.hardDrive.seek(0);
    const bootData = this.hardDrive.read(0, 1024);
    
    // Step 4: Load into memory
    const memoryAddress = this.memory.allocate(1024);
    this.memory.load(memoryAddress, bootData);
    
    // Step 5: Start execution
    this.cpu.jump(memoryAddress);
    this.cpu.execute();
    
    console.log("✅ Computer: Boot sequence completed successfully!\n");
  }

  /**
   * Simple shutdown method that handles complex shutdown sequence
   */
  shutdown(): void {
    console.log("🖥️  Computer: Initiating shutdown sequence...\n");
    
    // Complex shutdown sequence
    console.log("🔧 CPU: Stopping all processes");
    console.log("💾 Memory: Saving critical data");
    console.log("💾 Memory: Clearing sensitive information");
    console.log("💿 HardDrive: Parking read/write heads");
    console.log("💿 HardDrive: Spinning down disk");
    
    console.log("✅ Computer: Shutdown completed safely!\n");
  }

  /**
   * Simple restart method combining shutdown and startup
   */
  restart(): void {
    console.log("🔄 Computer: Restarting system...\n");
    this.shutdown();
    // Simulate brief pause
    console.log("⏳ Waiting for hardware reset...\n");
    this.start();
  }

  /**
   * Simple status check that queries all subsystems
   */
  getStatus(): string {
    console.log("📊 Computer: Checking system status...");
    console.log("🔧 CPU: Running at optimal performance");
    console.log("💾 Memory: 8GB available, 4GB in use");
    console.log("💿 HardDrive: 500GB available, running normally");
    
    return "System running normally";
  }
}

// Usage Example
const computer = new ComputerFacade();
computer.start(); // Simple interface to complex boot process

export { ComputerFacade, CPU, Memory, HardDrive }; 