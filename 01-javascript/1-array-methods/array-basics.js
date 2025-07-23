/**
 * Array Methods - Basic Operations
 */

// Creating arrays
const fruits = ['apple', 'banana', 'orange'];
const numbers = [1, 2, 3, 4, 5];

console.log('=== BASIC ARRAY METHODS ===');

// .length - Property (not method)
// Returns: number of elements in array
console.log('Length:', fruits.length); // 3

// .push(element1, element2, ...) 
// Params: elements to add to end
// Returns: new length of array
// Modifies: original array
fruits.push('grape');
console.log('After push:', fruits); // ['apple', 'banana', 'orange', 'grape']

// .pop()
// Params: none
// Returns: removed element (or undefined if empty)
// Modifies: original array
const lastFruit = fruits.pop();
console.log('Popped:', lastFruit); // grape
console.log('After pop:', fruits); // ['apple', 'banana', 'orange']

// .unshift(element1, element2, ...)
// Params: elements to add to beginning
// Returns: new length of array
// Modifies: original array
fruits.unshift('mango');
console.log('After unshift:', fruits); // ['mango', 'apple', 'banana', 'orange']

// .shift()
// Params: none
// Returns: removed element (or undefined if empty)
// Modifies: original array
const firstFruit = fruits.shift();
console.log('Shifted:', firstFruit); // mango
console.log('After shift:', fruits); // ['apple', 'banana', 'orange']

// .slice(start, end)
// Params: start index, end index (optional)
// Returns: new array with extracted elements
// Modifies: does NOT modify original array
const sliced = fruits.slice(1, 3);
console.log('Sliced (1,3):', sliced); // ['banana', 'orange']
console.log('Original:', fruits); // ['apple', 'banana', 'orange']

// .splice(start, deleteCount, item1, item2, ...)
// Params: start index, number to delete, items to add
// Returns: array of removed elements
// Modifies: original array
const removed = fruits.splice(1, 1, 'kiwi', 'mango');
console.log('Removed:', removed); // ['banana']
console.log('After splice:', fruits); // ['apple', 'kiwi', 'mango', 'orange']

// .join(separator)
// Params: separator string (optional, default: comma)
// Returns: string with all elements joined
// Modifies: does NOT modify original array
const joined = fruits.join(', ');
console.log('Joined:', joined); // apple, kiwi, mango, orange

// String.split(separator)
// Params: separator string or regex
// Returns: array of substrings
// Modifies: does NOT modify original string
const str = 'red,green,blue';
const colors = str.split(',');
console.log('Split string:', colors); // ['red', 'green', 'blue'] 