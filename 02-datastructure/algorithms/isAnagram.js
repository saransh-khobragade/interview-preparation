/*
Anagram Check Algorithm
------------------------
Checks if two strings are anagrams (contain the same characters in a different order, ignoring case and non-letters).

Time Complexity: O(n log n)
Space Complexity: O(n)
*/

function isAnagram(str1, str2) {
    const normalize = str => str.toLowerCase().replace(/[^a-z]/g, '').split('').sort().join('');
    return normalize(str1) === normalize(str2);
}

module.exports = isAnagram; 