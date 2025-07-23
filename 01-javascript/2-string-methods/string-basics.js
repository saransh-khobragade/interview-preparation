/**
 * String Methods - Basic Operations
 */

const text = '  Hello World  ';
const sentence = 'JavaScript is awesome!';

console.log('=== BASIC STRING METHODS ===');

// .length - Property (not method)
// Returns: number of characters in string
console.log('Length:', text.length); // 15

// .trim()
// Params: none
// Returns: new string with whitespace removed from both ends
// Modifies: does NOT modify original string
console.log('Trimmed:', text.trim()); // 'Hello World'

// .toUpperCase() / .toLowerCase()
// Params: none
// Returns: new string in upper/lower case
// Modifies: does NOT modify original string
console.log('Upper:', text.toUpperCase()); // '  HELLO WORLD  '
console.log('Lower:', text.toLowerCase()); // '  hello world  '

// .charAt(index)
// Params: index number
// Returns: character at specified index (empty string if out of range)
// Modifies: does NOT modify original string
console.log('Char at 2:', sentence.charAt(2)); // 'v'

// .indexOf(searchValue, fromIndex)
// Params: string to search for, starting index (optional)
// Returns: index of first occurrence (-1 if not found)
// Modifies: does NOT modify original string
console.log('Index of "Script":', sentence.indexOf('Script')); // 4

// .lastIndexOf(searchValue, fromIndex)
// Params: string to search for, starting index (optional)
// Returns: index of last occurrence (-1 if not found)
// Modifies: does NOT modify original string
console.log('Last index of "a":', sentence.lastIndexOf('a')); // 16

// .includes(searchString, position)
// Params: string to search for, starting position (optional)
// Returns: true if string contains searchString
// Modifies: does NOT modify original string
console.log('Includes "Java":', sentence.includes('Java')); // true

// .startsWith(searchString, position) / .endsWith(searchString, length)
// Params: string to search for, position/length (optional)
// Returns: true if string starts/ends with searchString
// Modifies: does NOT modify original string
console.log('Starts with "Java":', sentence.startsWith('Java')); // true
console.log('Ends with "!":', sentence.endsWith('!')); // true

// .slice(start, end)
// Params: start index, end index (optional)
// Returns: new string with extracted portion
// Modifies: does NOT modify original string
console.log('Slice (0, 10):', sentence.slice(0, 10)); // 'JavaScript'

// .substring(start, end)
// Params: start index, end index (optional)
// Returns: new string with extracted portion (similar to slice)
// Modifies: does NOT modify original string
console.log('Substring (0, 4):', sentence.substring(0, 4)); // 'Java'

// .substr(start, length) - DEPRECATED
// Params: start index, length (optional)
// Returns: new string with extracted portion
// Modifies: does NOT modify original string
console.log('Substr (4, 6):', sentence.substr(4, 6)); // 'Script'

// .replace(searchValue, replaceValue)
// Params: string/regex to find, replacement string
// Returns: new string with first occurrence replaced
// Modifies: does NOT modify original string
console.log('Replace:', sentence.replace('awesome', 'great')); // 'JavaScript is great!'

// .replaceAll(searchValue, replaceValue)
// Params: string/regex to find, replacement string
// Returns: new string with all occurrences replaced
// Modifies: does NOT modify original string
const repeated = 'test test test';
console.log('Replace all:', repeated.replaceAll('test', 'demo')); // 'demo demo demo' 