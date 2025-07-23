# String Methods

Essential JavaScript string methods with parameter and return value documentation.

## Files
- `string-basics.js` - Basic operations (trim, case, slice, replace, etc.)
- `string-advanced.js` - Advanced operations (split, match, pad, etc.)

## Quick Reference

### Basic Operations
```javascript
const str = '  Hello World  ';

str.trim()              // Returns: 'Hello World'
str.toUpperCase()       // Returns: '  HELLO WORLD  '
str.charAt(2)           // Returns: 'H'
str.indexOf('World')    // Returns: 8
str.slice(2, 7)         // Returns: 'Hello'
str.replace('World', 'JS') // Returns: '  Hello JS  '
```

### Advanced Operations
```javascript
const text = 'Hello,World,JS';

text.split(',')         // Returns: ['Hello', 'World', 'JS']
text.match(/[aeiou]/g)  // Returns: ['e', 'o', 'o']
'5'.padStart(3, '0')    // Returns: '005'
'*'.repeat(3)           // Returns: '***'
```

## Method Categories

### **Search & Check**
- `indexOf()`, `lastIndexOf()`, `search()`
- `includes()`, `startsWith()`, `endsWith()`
- `match()` - with regex

### **Extract & Transform**
- `slice()`, `substring()`, `substr()`
- `charAt()`, `charCodeAt()`
- `split()` - string to array

### **Modify & Format**
- `trim()`, `trimStart()`, `trimEnd()`
- `toUpperCase()`, `toLowerCase()`
- `replace()`, `replaceAll()`
- `padStart()`, `padEnd()`, `repeat()`

## Run Examples
```bash
node string-basics.js
node string-advanced.js
``` 