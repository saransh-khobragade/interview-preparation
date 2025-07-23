# Object Methods

Essential JavaScript object methods with parameter and return value documentation.

## Files
- `object-basics.js` - Basic operations (keys, values, assign, etc.)

## Quick Reference

### Get Object Data
```javascript
const obj = { name: 'John', age: 30 };

Object.keys(obj)        // Returns: ['name', 'age']
Object.values(obj)      // Returns: ['John', 30]
Object.entries(obj)     // Returns: [['name', 'John'], ['age', 30]]
```

### Modify Objects
```javascript
// Merge objects
Object.assign(target, source)  // Returns: modified target

// Make immutable
Object.freeze(obj)      // Returns: frozen object
Object.seal(obj)        // Returns: sealed object

// Create with prototype
Object.create(proto)    // Returns: new object
```

### Check Properties
```javascript
obj.hasOwnProperty('name')  // Returns: true/false
'name' in obj              // Returns: true/false
Object.isFrozen(obj)       // Returns: true/false
```

## Method Categories

### **Inspection Methods**
- `Object.keys()` - get property names
- `Object.values()` - get property values  
- `Object.entries()` - get [key, value] pairs
- `Object.getOwnPropertyNames()` - all properties

### **Modification Methods**
- `Object.assign()` - merge objects
- `delete` operator - remove properties
- `Object.freeze()` - make immutable
- `Object.seal()` - prevent add/remove properties

### **Creation Methods**
- `Object.create()` - create with prototype
- `{}` literal - create empty object

### **Check Methods**
- `hasOwnProperty()` - check property existence
- `in` operator - check property in object/prototype
- `Object.isFrozen()`, `Object.isSealed()` - check state

## Run Examples
```bash
node object-basics.js
``` 