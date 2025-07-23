# Number Methods

Essential JavaScript number methods with parameter and return value documentation.

## Files
- `number-basics.js` - Basic operations (toString, toFixed, parseInt, Math methods, etc.)

## Quick Reference

### Formatting Numbers
```javascript
const num = 123.456;

num.toString()          // Returns: '123.456'
num.toFixed(2)          // Returns: '123.46'
num.toPrecision(4)      // Returns: '123.5'
num.toExponential(2)    // Returns: '1.23e+2'
```

### Parsing Strings
```javascript
Number.parseInt('123.45')     // Returns: 123
Number.parseFloat('123.45')   // Returns: 123.45
Number.parseInt('1010', 2)    // Returns: 10 (binary)
```

### Checking Values
```javascript
Number.isInteger(42)      // Returns: true
Number.isNaN(NaN)         // Returns: true
Number.isFinite(42)       // Returns: true
```

### Math Operations
```javascript
Math.round(3.7)          // Returns: 4
Math.floor(3.7)          // Returns: 3
Math.ceil(3.2)           // Returns: 4
Math.abs(-42)            // Returns: 42
Math.max(1, 5, 3)        // Returns: 5
Math.random()            // Returns: 0-1 random number
```

## Method Categories

### **Conversion Methods**
- `toString()` - number to string (with radix)
- `toFixed()` - fixed decimal places
- `toPrecision()` - significant digits
- `toExponential()` - scientific notation

### **Parsing Methods (Static)**
- `Number.parseInt()` - string to integer
- `Number.parseFloat()` - string to float
- `Number()` - type conversion

### **Validation Methods (Static)**
- `Number.isInteger()` - check if integer
- `Number.isNaN()` - check if NaN
- `Number.isFinite()` - check if finite

### **Math Methods (Static)**
- `Math.round()`, `Math.floor()`, `Math.ceil()` - rounding
- `Math.abs()` - absolute value
- `Math.max()`, `Math.min()` - extremes
- `Math.pow()`, `Math.sqrt()` - power operations
- `Math.random()` - random numbers

## Run Examples
```bash
node number-basics.js
``` 