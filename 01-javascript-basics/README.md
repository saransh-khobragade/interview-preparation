# JavaScript Syntax - Methods and Operations

Comprehensive guide to JavaScript built-in methods with parameter and return value documentation.

## 📁 Folder Structure

### 1. **Array Methods** (`1-array-methods/`)
- **Basic Operations**: push, pop, slice, splice, join
- **Iteration Methods**: map, filter, reduce, forEach, find
- **Files**: `array-basics.js`, `array-iteration.js`

### 2. **String Methods** (`2-string-methods/`)
- **Basic Operations**: trim, case conversion, search, replace
- **Advanced Operations**: split, match, pad, repeat
- **Files**: `string-basics.js`, `string-advanced.js`

### 3. **Object Methods** (`3-object-methods/`)
- **Basic Operations**: keys, values, entries, assign, freeze
- **Files**: `object-basics.js`

### 4. **Number Methods** (`4-number-methods/`)
- **Basic Operations**: toString, toFixed, parseInt, Math methods
- **Files**: `number-basics.js`

## 🎯 What You'll Learn

Each method includes:
- **Parameters**: What inputs the method expects
- **Return Values**: What the method gives back
- **Modifies**: Whether it changes the original data
- **Examples**: Practical usage with expected output

## 🚀 Quick Reference

### Array Operations
```javascript
// Modify original
arr.push(item)          // Add to end → returns new length
arr.pop()               // Remove from end → returns removed item

// Create new array
arr.map(fn)             // Transform → returns new array
arr.filter(fn)          // Filter → returns new array
arr.slice(start, end)   // Extract → returns new array
```

### String Operations
```javascript
// Create new string
str.trim()              // Remove whitespace → returns trimmed string
str.slice(start, end)   // Extract portion → returns substring
str.replace(old, new)   // Replace text → returns new string
str.split(separator)    // Split to array → returns array
```

### Object Operations
```javascript
// Get object data
Object.keys(obj)        // Get property names → returns array
Object.values(obj)      // Get values → returns array
Object.entries(obj)     // Get [key, value] pairs → returns array

// Modify objects
Object.assign(target, source) // Merge → returns target object
```

### Number Operations
```javascript
// Format numbers
num.toFixed(2)          // Fixed decimals → returns string
num.toString(16)        // Convert to hex → returns string

// Parse strings
Number.parseInt(str)    // String to int → returns number
Number.parseFloat(str)  // String to float → returns number
```

## 📋 Documentation Format

Each method follows this pattern:
```javascript
// .methodName(param1, param2)
// Params: description of parameters
// Returns: what the method returns
// Modifies: whether it changes original data
const result = obj.methodName(value);
console.log('Result:', result); // Expected output
```

## 🚀 Quick Start

```bash
# Navigate to any category
cd 1-array-methods
node array-basics.js

cd ../2-string-methods  
node string-basics.js

cd ../3-object-methods
node object-basics.js
```

## 💡 Key Benefits

- **Complete Documentation**: Parameters, returns, and side effects
- **Practical Examples**: Real usage with expected output
- **Organized by Type**: Easy to find related methods
- **Short & Focused**: Each example demonstrates one concept
- **Copy-Paste Ready**: Code you can immediately use

Perfect reference for JavaScript interviews, daily coding, and learning built-in methods! 