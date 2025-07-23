/**
 * COMMAND PATTERN
 * 
 * Definition:
 * The Command pattern encapsulates a request as an object, allowing you to
 * parameterize clients with different requests, queue operations, log requests,
 * and support undo functionality.
 * 
 * When to Use:
 * - Implement undo/redo functionality
 * - Queue operations for later execution
 * - Log operations for auditing
 * - Support macro recording/playback
 * - Decouple sender from receiver
 * 
 * Benefits:
 * ✅ Decouples invoker from receiver
 * ✅ Easy to add new commands
 * ✅ Supports undo/redo operations
 * ✅ Can compose commands (macro commands)
 * ✅ Can queue, log, and schedule commands
 * 
 * Drawbacks:
 * ❌ Can increase code complexity
 * ❌ More classes for simple operations
 * ❌ Memory overhead for storing command history
 * 
 * Key Components:
 * 1. Command Interface - defines execution contract
 * 2. Concrete Commands - implement specific operations
 * 3. Receiver - performs the actual work
 * 4. Invoker - triggers command execution
 * 
 * Real-world Examples:
 * - Text editor operations (cut, copy, paste, undo)
 * - Remote controls (TV, stereo, air conditioner)
 * - Database transactions (commit, rollback)
 * - GUI buttons and menu items
 * - Job scheduling systems
 */

/**
 * Command Interface - Defines the contract for all commands
 * 
 * All commands must implement execute() and undo() methods.
 * This enables uniform handling of different operations.
 */
interface Command {
  execute(): void;
  undo(): void;
  getDescription(): string; // For logging and debugging
}

/**
 * Receiver - The object that performs the actual work
 * 
 * The receiver knows how to perform the operations associated
 * with carrying out a request. Commands delegate to receivers.
 */
class Light {
  private isOn: boolean = false;
  private brightness: number = 100;
  private name: string;

  constructor(name: string = "Living Room Light") {
    this.name = name;
  }

  /**
   * Turns the light on
   */
  turnOn(): void {
    this.isOn = true;
    console.log(`💡 ${this.name} is ON (brightness: ${this.brightness}%)`);
  }

  /**
   * Turns the light off
   */
  turnOff(): void {
    this.isOn = false;
    console.log(`💡 ${this.name} is OFF`);
  }

  /**
   * Sets the brightness level
   * @param level - Brightness level (0-100)
   */
  setBrightness(level: number): void {
    this.brightness = Math.max(0, Math.min(100, level));
    if (this.isOn) {
      console.log(`💡 ${this.name} brightness set to ${this.brightness}%`);
    }
  }

  /**
   * Gets the current brightness level
   */
  getBrightness(): number {
    return this.brightness;
  }

  /**
   * Gets the current status
   */
  getStatus(): boolean {
    return this.isOn;
  }

  /**
   * Gets the light name
   */
  getName(): string {
    return this.name;
  }
}

/**
 * Concrete Commands - Implement specific operations
 * 
 * Each command encapsulates a request to a receiver object.
 * Commands store the receiver and parameters needed for the operation.
 */

class TurnOnLightCommand implements Command {
  private light: Light;

  constructor(light: Light) {
    this.light = light;
  }

  /**
   * Executes the turn on operation
   */
  execute(): void {
    this.light.turnOn();
  }

  /**
   * Undoes the turn on operation by turning off
   */
  undo(): void {
    this.light.turnOff();
  }

  getDescription(): string {
    return `Turn ON ${this.light.getName()}`;
  }
}

class TurnOffLightCommand implements Command {
  private light: Light;

  constructor(light: Light) {
    this.light = light;
  }

  /**
   * Executes the turn off operation
   */
  execute(): void {
    this.light.turnOff();
  }

  /**
   * Undoes the turn off operation by turning on
   */
  undo(): void {
    this.light.turnOn();
  }

  getDescription(): string {
    return `Turn OFF ${this.light.getName()}`;
  }
}

/**
 * More complex command that stores previous state for undo
 */
class SetBrightnessCommand implements Command {
  private light: Light;
  private newBrightness: number;
  private previousBrightness: number;

  constructor(light: Light, brightness: number) {
    this.light = light;
    this.newBrightness = brightness;
    this.previousBrightness = light.getBrightness(); // Store for undo
  }

  execute(): void {
    this.light.setBrightness(this.newBrightness);
  }

  undo(): void {
    this.light.setBrightness(this.previousBrightness);
  }

  getDescription(): string {
    return `Set ${this.light.getName()} brightness to ${this.newBrightness}%`;
  }
}

/**
 * Macro Command - Executes multiple commands as one
 * Demonstrates the Composite pattern within Command pattern
 */
class MacroCommand implements Command {
  private commands: Command[];

  constructor(commands: Command[]) {
    this.commands = commands;
  }

  execute(): void {
    console.log("🎬 Executing macro command...");
    this.commands.forEach(command => command.execute());
  }

  undo(): void {
    console.log("🔄 Undoing macro command...");
    // Undo in reverse order
    this.commands.slice().reverse().forEach(command => command.undo());
  }

  getDescription(): string {
    const descriptions = this.commands.map(cmd => cmd.getDescription());
    return `Macro: [${descriptions.join(", ")}]`;
  }
}

// Invoker
class RemoteControl {
  private commands: Command[] = [];
  private currentCommand: number = -1;

  executeCommand(command: Command): void {
    // Remove any commands after current position
    this.commands = this.commands.slice(0, this.currentCommand + 1);
    
    this.commands.push(command);
    this.currentCommand++;
    command.execute();
  }

  undo(): void {
    if (this.currentCommand >= 0) {
      const command = this.commands[this.currentCommand];
      command.undo();
      this.currentCommand--;
    } else {
      console.log("Nothing to undo");
    }
  }

  redo(): void {
    if (this.currentCommand < this.commands.length - 1) {
      this.currentCommand++;
      const command = this.commands[this.currentCommand];
      command.execute();
    } else {
      console.log("Nothing to redo");
    }
  }
}

// Usage Example
const light = new Light();
const remote = new RemoteControl();

const turnOnCommand = new TurnOnLightCommand(light);
const turnOffCommand = new TurnOffLightCommand(light);

// Execute commands
remote.executeCommand(turnOnCommand);  // Light is ON
remote.executeCommand(turnOffCommand); // Light is OFF
remote.executeCommand(turnOnCommand);  // Light is ON

// Undo operations
remote.undo(); // Light is OFF
remote.undo(); // Light is ON
remote.undo(); // Light is OFF

// Redo operations
remote.redo(); // Light is ON
remote.redo(); // Light is OFF

export { Command, Light, TurnOnLightCommand, TurnOffLightCommand, RemoteControl }; 