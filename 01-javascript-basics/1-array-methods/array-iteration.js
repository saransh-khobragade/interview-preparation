/**
 * Array Methods - Iteration
 */

const numbers = [1, 2, 3, 4, 5];
const words = ['hello', 'world', 'javascript'];

console.log('=== ARRAY ITERATION METHODS ===');

// .forEach(callback(element, index, array))
// Params: callback function
// Returns: undefined
// Modifies: does NOT modify original array
console.log('forEach:');
numbers.forEach(num => console.log(`  ${num} x 2 = ${num * 2}`));

// .map(callback(element, index, array))
// Params: callback function that returns new value
// Returns: new array with transformed elements
// Modifies: does NOT modify original array
const doubled = numbers.map(num => num * 2);
console.log('Doubled:', doubled); // [2, 4, 6, 8, 10]

// .filter(callback(element, index, array))
// Params: callback function that returns boolean
// Returns: new array with elements that pass test
// Modifies: does NOT modify original array
const evens = numbers.filter(num => num % 2 === 0);
console.log('Even numbers:', evens); // [2, 4]

// .find(callback(element, index, array))
// Params: callback function that returns boolean
// Returns: first element that passes test (or undefined)
// Modifies: does NOT modify original array
const found = numbers.find(num => num > 3);
console.log('First > 3:', found); // 4

// .findIndex(callback(element, index, array))
// Params: callback function that returns boolean
// Returns: index of first element that passes test (or -1)
// Modifies: does NOT modify original array
const foundIndex = numbers.findIndex(num => num > 3);
console.log('Index of first > 3:', foundIndex); // 3

// .some(callback(element, index, array))
// Params: callback function that returns boolean
// Returns: true if ANY element passes test
// Modifies: does NOT modify original array
const hasEven = numbers.some(num => num % 2 === 0);
console.log('Has even numbers:', hasEven); // true

// .every(callback(element, index, array))
// Params: callback function that returns boolean
// Returns: true if ALL elements pass test
// Modifies: does NOT modify original array
const allPositive = numbers.every(num => num > 0);
console.log('All positive:', allPositive); // true

// .reduce(callback(accumulator, element, index, array), initialValue)
// Params: callback function, initial value (optional)
// Returns: single accumulated value
// Modifies: does NOT modify original array
const sum = numbers.reduce((acc, num) => acc + num, 0);
console.log('Sum:', sum); // 15

// .includes(searchElement, fromIndex)
// Params: element to search for, starting index (optional)
// Returns: true if element is found
// Modifies: does NOT modify original array
const hasThree = numbers.includes(3);
console.log('Has number 3:', hasThree); // true

// .indexOf(searchElement, fromIndex)
// Params: element to search for, starting index (optional)
// Returns: first index of element (or -1 if not found)
// Modifies: does NOT modify original array
const indexOfThree = numbers.indexOf(3);
console.log('Index of 3:', indexOfThree); // 2 