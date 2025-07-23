# Array Methods

Essential JavaScript array methods with examples.

## Files
- `array-basics.js` - Basic operations (push, pop, slice, etc.)
- `array-iteration.js` - Iteration methods (map, filter, reduce, etc.)

## Quick Reference

### Basic Operations
```javascript
const arr = [1, 2, 3];

arr.push(4);           // Add to end → [1, 2, 3, 4]
arr.pop();             // Remove from end → [1, 2, 3]
arr.unshift(0);        // Add to start → [0, 1, 2, 3]
arr.shift();           // Remove from start → [1, 2, 3]
arr.slice(1, 3);       // Extract portion → [2, 3]
arr.splice(1, 1, 'x'); // Remove/add → [1, 'x', 3]
```

### Iteration Methods
```javascript
const numbers = [1, 2, 3, 4, 5];

numbers.map(n => n * 2);        // Transform → [2, 4, 6, 8, 10]
numbers.filter(n => n > 3);     // Filter → [4, 5]
numbers.find(n => n > 3);       // Find first → 4
numbers.reduce((sum, n) => sum + n, 0); // Reduce → 15
```

## Run Examples
```bash
node array-basics.js
node array-iteration.js
``` 