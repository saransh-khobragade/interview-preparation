/**
 * Object Methods - Basic Operations
 */

const person = { name: 'John', age: 30, city: 'New York' };
const user = { id: 1, username: 'alice', active: true };

console.log('=== BASIC OBJECT METHODS ===');

// Object.keys(obj)
// Params: object
// Returns: array of object's enumerable property names
// Static method: called on Object constructor
const keys = Object.keys(person);
console.log('Keys:', keys); // ['name', 'age', 'city']

// Object.values(obj)
// Params: object
// Returns: array of object's enumerable property values
// Static method: called on Object constructor
const values = Object.values(person);
console.log('Values:', values); // ['John', 30, 'New York']

// Object.entries(obj)
// Params: object
// Returns: array of [key, value] pairs
// Static method: called on Object constructor
const entries = Object.entries(person);
console.log('Entries:', entries); // [['name', 'John'], ['age', 30], ['city', 'New York']]

// Object.assign(target, source1, source2, ...)
// Params: target object, source objects
// Returns: target object (modified)
// Modifies: target object
const merged = Object.assign({}, person, user);
console.log('Merged:', merged); // { name: 'John', age: 30, city: 'New York', id: 1, username: 'alice', active: true }

// Object.hasOwnProperty(property) - called on instance
// Params: property name (string)
// Returns: true if object has specified property
// Modifies: does NOT modify object
console.log('Has name property:', person.hasOwnProperty('name')); // true
console.log('Has email property:', person.hasOwnProperty('email')); // false

// Object.freeze(obj)
// Params: object to freeze
// Returns: the same object (now frozen)
// Modifies: makes object immutable
const frozenObj = Object.freeze({ a: 1, b: 2 });
frozenObj.a = 10; // This won't work
console.log('Frozen object:', frozenObj); // { a: 1, b: 2 }

// Object.isFrozen(obj)
// Params: object to check
// Returns: true if object is frozen
// Static method: called on Object constructor
console.log('Is frozen:', Object.isFrozen(frozenObj)); // true

// Object.seal(obj)
// Params: object to seal
// Returns: the same object (now sealed)
// Modifies: prevents adding/removing properties, allows modification
const sealedObj = Object.seal({ x: 1, y: 2 });
sealedObj.x = 10; // This works
sealedObj.z = 3;  // This won't work
console.log('Sealed object:', sealedObj); // { x: 10, y: 2 }

// Object.create(prototype, propertiesObject)
// Params: prototype object, properties descriptor (optional)
// Returns: new object with specified prototype
// Static method: called on Object constructor
const proto = { greet() { return 'Hello!'; } };
const obj = Object.create(proto);
console.log('Created object greeting:', obj.greet()); // 'Hello!'

// delete operator
// Params: object property
// Returns: true if deletion successful
// Modifies: removes property from object
const temp = { a: 1, b: 2, c: 3 };
delete temp.b;
console.log('After delete:', temp); // { a: 1, c: 3 }

// in operator
// Params: property name, object
// Returns: true if property exists in object
// Modifies: does NOT modify object
console.log('age in person:', 'age' in person); // true
console.log('email in person:', 'email' in person); // false

// Object.getOwnPropertyNames(obj)
// Params: object
// Returns: array of all property names (including non-enumerable)
// Static method: called on Object constructor
const propNames = Object.getOwnPropertyNames(person);
console.log('Property names:', propNames); // ['name', 'age', 'city'] 