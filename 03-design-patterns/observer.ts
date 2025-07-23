/**
 * OBSERVER PATTERN
 * 
 * Definition:
 * The Observer pattern defines a one-to-many dependency between objects so that
 * when one object (Subject) changes state, all its dependents (Observers) are
 * automatically notified and updated.
 * 
 * When to Use:
 * - Event handling systems
 * - Model-View architectures (MVC, MVP, MVVM)
 * - Real-time data monitoring
 * - Newsletter subscriptions
 * - Social media notifications
 * 
 * Benefits:
 * ✅ Loose coupling between Subject and Observers
 * ✅ Dynamic subscription/unsubscription
 * ✅ Broadcast communication
 * ✅ Open/Closed Principle compliance
 * 
 * Drawbacks:
 * ❌ Memory leaks if observers aren't properly removed
 * ❌ Unexpected update chains
 * ❌ No guarantee of notification order
 * 
 * Key Components:
 * 1. Subject Interface - defines subscription management
 * 2. Observer Interface - defines update mechanism
 * 3. Concrete Subject - maintains observers and notifies them
 * 4. Concrete Observers - implement update behavior
 * 
 * Real-world Examples:
 * - DOM events (click, hover, etc.)
 * - Stock price monitoring systems
 * - News feed updates
 * - Weather monitoring stations
 * - Shopping cart updates in e-commerce
 */

// Observer interface - defines the contract for all observers
// All observers must implement the update method to receive notifications
interface Observer {
  update(temperature: number): void;
}

// Subject interface - defines the contract for subjects (publishers)
// Subjects manage their observer list and handle notifications
interface Subject {
  addObserver(observer: Observer): void;
  removeObserver(observer: Observer): void;
  notifyObservers(): void;
}

/**
 * Concrete Subject - The "publisher" that observers watch
 * 
 * This class maintains the list of observers and notifies them
 * when its state changes. It's the central point of the pattern.
 */
class WeatherStation implements Subject {
  // List of registered observers
  private observers: Observer[] = [];
  
  // The state that observers are interested in
  private temperature: number = 0;

  /**
   * Adds an observer to the notification list
   * @param observer - The observer to add
   */
  addObserver(observer: Observer): void {
    this.observers.push(observer);
    console.log(`Observer added. Total observers: ${this.observers.length}`);
  }

  /**
   * Removes an observer from the notification list
   * @param observer - The observer to remove
   */
  removeObserver(observer: Observer): void {
    const index = this.observers.indexOf(observer);
    if (index > -1) {
      this.observers.splice(index, 1);
      console.log(`Observer removed. Total observers: ${this.observers.length}`);
    }
  }

  /**
   * Notifies all registered observers about state change
   * This is the core mechanism of the Observer pattern
   */
  notifyObservers(): void {
    console.log(`Notifying ${this.observers.length} observers...`);
    // Iterate through all observers and call their update method
    this.observers.forEach(observer => observer.update(this.temperature));
  }

  /**
   * Changes the temperature and automatically notifies observers
   * This demonstrates automatic notification when state changes
   * @param temperature - New temperature value
   */
  setTemperature(temperature: number): void {
    console.log(`Temperature changing from ${this.temperature}°C to ${temperature}°C`);
    this.temperature = temperature;
    
    // Automatically notify all observers when state changes
    this.notifyObservers();
  }
}

/**
 * Concrete Observers - The "subscribers" that get notified
 * 
 * Each observer implements its own specific behavior when updated.
 * They can be added or removed from the subject dynamically.
 */

class Phone implements Observer {
  private name: string;

  constructor(name: string = "Mobile Phone") {
    this.name = name;
  }

  /**
   * Called by the subject when temperature changes
   * Implements phone-specific notification behavior
   */
  update(temperature: number): void {
    console.log(`📱 ${this.name}: Temperature alert - ${temperature}°C`);
    
    // Phone-specific logic could include:
    // - Send push notification
    // - Update mobile app
    // - Trigger alerts for extreme temperatures
  }
}

class TV implements Observer {
  private channel: string;

  constructor(channel: string = "Weather Channel") {
    this.channel = channel;
  }

  /**
   * Called by the subject when temperature changes
   * Implements TV-specific notification behavior
   */
  update(temperature: number): void {
    console.log(`📺 ${this.channel}: Weather update - ${temperature}°C`);
    
    // TV-specific logic could include:
    // - Update weather display
    // - Change background color based on temperature
    // - Show weather warnings
  }
}

// Usage Example
const weatherStation = new WeatherStation();
const phone = new Phone();
const tv = new TV();

weatherStation.addObserver(phone);
weatherStation.addObserver(tv);

weatherStation.setTemperature(25); // Both phone and TV get notified
weatherStation.setTemperature(30); // Both get updated again

export { Observer, Subject, WeatherStation, Phone, TV }; 