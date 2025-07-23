# Encapsulation

## What is it?
Control access to class members using access modifiers.

## Access Modifiers
- `public` - Accessible everywhere (default)
- `private` - Only within the same class
- `protected` - Within class and subclasses
- `readonly` - Cannot be modified after initialization

## Simple Example
```typescript
class BankAccount {
  public accountNumber: string;    // Anyone can access
  private balance: number;         // Only this class
  
  constructor(accountNumber: string, balance: number) {
    this.accountNumber = accountNumber;
    this.balance = balance;
  }
  
  getBalance(): number {  // Safe way to access private data
    return this.balance;
  }
}
```

## Why Use It?
- **Security**: Hide sensitive data
- **Validation**: Control how data is modified
- **Maintainability**: Change internals without breaking external code

## Run Example
```bash
npx ts-node access-modifiers.ts
``` 