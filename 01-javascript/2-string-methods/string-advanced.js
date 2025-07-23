/**
 * String Methods - Advanced Operations
 */

const text = 'Hello,World,JavaScript';
const sentence = 'The quick brown fox jumps';

console.log('=== ADVANCED STRING METHODS ===');

// .split(separator, limit)
// Params: separator string/regex, limit number (optional)
// Returns: array of substrings
// Modifies: does NOT modify original string
const words = sentence.split(' ');
console.log('Split by space:', words); // ['The', 'quick', 'brown', 'fox', 'jumps']

const limitedSplit = sentence.split(' ', 3);
console.log('Split with limit 3:', limitedSplit); // ['The', 'quick', 'brown']

// .match(regex)
// Params: regular expression
// Returns: array of matches (or null if no matches)
// Modifies: does NOT modify original string
const vowels = sentence.match(/[aeiou]/g);
console.log('Vowels found:', vowels); // ['e', 'u', 'i', 'o', 'o', 'u']

// .search(regex)
// Params: regular expression
// Returns: index of first match (-1 if not found)
// Modifies: does NOT modify original string
const firstVowel = sentence.search(/[aeiou]/);
console.log('First vowel at index:', firstVowel); // 2

// .padStart(targetLength, padString) / .padEnd(targetLength, padString)
// Params: target length, padding string (optional, default: space)
// Returns: new string padded to target length
// Modifies: does NOT modify original string
const num = '5';
console.log('Pad start:', num.padStart(3, '0')); // '005'
console.log('Pad end:', num.padEnd(3, '0')); // '500'

// .repeat(count)
// Params: number of repetitions
// Returns: new string with original repeated count times
// Modifies: does NOT modify original string
const star = '*';
console.log('Repeated:', star.repeat(5)); // '*****'

// .trimStart() / .trimEnd()
// Params: none
// Returns: new string with whitespace removed from start/end
// Modifies: does NOT modify original string
const spaced = '  hello  ';
console.log('Trim start:', `"${spaced.trimStart()}"`); // '"hello  "'
console.log('Trim end:', `"${spaced.trimEnd()}"`); // '"  hello"'

// .charCodeAt(index)
// Params: index number
// Returns: UTF-16 code unit at specified index
// Modifies: does NOT modify original string
console.log('Char code at 0:', sentence.charCodeAt(0)); // 84 (T)

// String.fromCharCode(num1, num2, ...)
// Params: UTF-16 code units
// Returns: string created from code units
// Static method: called on String constructor
console.log('From char codes:', String.fromCharCode(72, 101, 108, 108, 111)); // 'Hello'

// .localeCompare(compareString)
// Params: string to compare with
// Returns: number indicating sort order (-1, 0, or 1)
// Modifies: does NOT modify original string
const result1 = 'apple'.localeCompare('banana');
const result2 = 'banana'.localeCompare('apple');
console.log('apple vs banana:', result1); // -1 (apple comes first)
console.log('banana vs apple:', result2); // 1 (banana comes after)

// .concat(string1, string2, ...)
// Params: strings to concatenate
// Returns: new string with all strings joined
// Modifies: does NOT modify original string
const greeting = 'Hello'.concat(' ', 'World', '!');
console.log('Concatenated:', greeting); // 'Hello World!' 