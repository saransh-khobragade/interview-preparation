/**
 * Encapsulation - Access Control
 */

class BankAccount {
  public accountNumber: string;    // Anyone can access
  private balance: number;         // Only this class can access
  protected bankName: string;     // This class and subclasses
  readonly createdDate: Date;     // Cannot be changed after creation
  
  constructor(accountNumber: string, initialBalance: number) {
    this.accountNumber = accountNumber;
    this.balance = initialBalance;
    this.bankName = "MyBank";
    this.createdDate = new Date();
  }
  
  // Public method to safely access private balance
  getBalance(): number {
    return this.balance;
  }
  
  // Public method with validation
  deposit(amount: number): void {
    if (amount > 0) {
      this.balance += amount;
      console.log(`Deposited $${amount}. Balance: $${this.balance}`);
    }
  }
  
  // Private method for internal use
  private validateAmount(amount: number): boolean {
    return amount > 0 && amount <= this.balance;
  }
  
  withdraw(amount: number): void {
    if (this.validateAmount(amount)) {
      this.balance -= amount;
      console.log(`Withdrew $${amount}. Balance: $${this.balance}`);
    } else {
      console.log("Invalid amount or insufficient funds");
    }
  }
}

// Usage
const account = new BankAccount("123456", 1000);

console.log(account.accountNumber); // ✅ Works - public
console.log(account.getBalance());  // ✅ Works - public method

account.deposit(500);
account.withdraw(200);

// account.balance = 5000;       // ❌ Error - private
// account.validateAmount(100);  // ❌ Error - private method

export { BankAccount }; 