/**
 * STRATEGY PATTERN
 * 
 * Definition:
 * The Strategy pattern defines a family of algorithms, encapsulates each one,
 * and makes them interchangeable. It lets the algorithm vary independently
 * from clients that use it.
 * 
 * When to Use:
 * - Multiple ways to perform a task (payment methods, sorting algorithms)
 * - Avoid conditional statements for algorithm selection
 * - Switch algorithms at runtime
 * - Open/Closed Principle - easy to add new strategies
 * 
 * Benefits:
 * ✅ Eliminates conditional statements
 * ✅ Easy to add new algorithms without changing existing code
 * ✅ Algorithms can be tested independently
 * ✅ Runtime algorithm switching
 * ✅ Follows Open/Closed Principle
 * 
 * Drawbacks:
 * ❌ Clients must be aware of different strategies
 * ❌ Increased number of classes
 * ❌ Communication overhead between Strategy and Context
 * 
 * Key Components:
 * 1. Strategy Interface - defines common interface for all algorithms
 * 2. Concrete Strategies - implement different algorithms
 * 3. Context - uses a Strategy to execute the algorithm
 * 
 * Real-world Examples:
 * - Payment processing (Credit Card, PayPal, Crypto, Bank Transfer)
 * - Compression algorithms (ZIP, RAR, 7Z)
 * - Sorting algorithms (QuickSort, MergeSort, BubbleSort)
 * - Navigation routes (Fastest, Shortest, Scenic)
 * - Discount calculations (Percentage, Fixed Amount, Buy-One-Get-One)
 */

// Strategy interface - defines the contract for all payment strategies
// This ensures all payment methods have a consistent interface
interface PaymentStrategy {
  pay(amount: number): string;
}

/**
 * Concrete Strategies - Each implements a different payment algorithm
 * 
 * Each strategy encapsulates a specific payment method with its own
 * business logic, validation, and processing rules.
 */

class CreditCard implements PaymentStrategy {
  private cardNumber: string;
  private cvv: string;
  private expiryDate: string;

  constructor(cardNumber: string, cvv: string = "123", expiryDate: string = "12/25") {
    this.cardNumber = cardNumber;
    this.cvv = cvv;
    this.expiryDate = expiryDate;
  }

  /**
   * Implements credit card payment logic
   * In real implementation: validate card, check limits, process payment
   */
  pay(amount: number): string {
    // Credit card specific validation and processing logic
    if (amount > 10000) {
      return `Credit card payment of $${amount} requires additional verification`;
    }
    
    return `✅ Paid $${amount} with Credit Card ending in ${this.cardNumber.slice(-4)}`;
  }
}

class PayPal implements PaymentStrategy {
  private email: string;
  private isVerified: boolean;

  constructor(email: string, isVerified: boolean = true) {
    this.email = email;
    this.isVerified = isVerified;
  }

  /**
   * Implements PayPal payment logic
   * In real implementation: authenticate user, check PayPal balance, process
   */
  pay(amount: number): string {
    if (!this.isVerified) {
      return `❌ PayPal account ${this.email} needs verification`;
    }

    // PayPal specific processing logic
    return `✅ Paid $${amount} with PayPal account ${this.email}`;
  }
}

class Cash implements PaymentStrategy {
  /**
   * Implements cash payment logic
   * In real implementation: calculate change, update inventory, print receipt
   */
  pay(amount: number): string {
    // Cash specific logic
    if (amount > 500) {
      return `💰 Large cash payment of $${amount} - ID verification required`;
    }
    
    return `✅ Paid $${amount} with cash`;
  }
}

/**
 * Context Class - Uses a strategy to execute the payment algorithm
 * 
 * The context maintains a reference to a strategy object and delegates
 * the payment processing to the current strategy. It can switch strategies
 * at runtime without changing its own code.
 */
class ShoppingCart {
  private paymentStrategy: PaymentStrategy | null = null;
  private items: string[] = [];

  /**
   * Sets the payment strategy to be used for checkout
   * This allows runtime switching between different payment methods
   */
  setPaymentStrategy(strategy: PaymentStrategy): void {
    this.paymentStrategy = strategy;
    console.log(`Payment method updated to: ${strategy.constructor.name}`);
  }

  /**
   * Adds an item to the cart
   */
  addItem(item: string): void {
    this.items.push(item);
  }

  /**
   * Processes checkout using the selected payment strategy
   * The context delegates the payment processing to the strategy
   */
  checkout(amount: number): string {
    if (!this.paymentStrategy) {
      throw new Error("❌ Payment method not selected");
    }

    console.log(`Processing checkout for ${this.items.length} items...`);
    
    // Delegate payment processing to the strategy
    const result = this.paymentStrategy.pay(amount);
    
    // Context can add its own logic before/after strategy execution
    if (result.includes('✅')) {
      console.log(`📦 Order confirmed! Items: ${this.items.join(', ')}`);
    }
    
    return result;
  }
}

// Usage Example
const cart = new ShoppingCart();

// Pay with credit card
cart.setPaymentStrategy(new CreditCard("1234567890123456"));
console.log(cart.checkout(100));

// Switch to PayPal
cart.setPaymentStrategy(new PayPal("user@example.com"));
console.log(cart.checkout(50));

// Switch to cash
cart.setPaymentStrategy(new Cash());
console.log(cart.checkout(25));

export { PaymentStrategy, CreditCard, PayPal, Cash, ShoppingCart }; 