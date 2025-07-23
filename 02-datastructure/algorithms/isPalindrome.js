/*
Palindrome Check Algorithm
--------------------------
Checks if a given string is a palindrome (reads the same forwards and backwards, ignoring case and non-alphanumeric characters).

Time Complexity: O(n)
Space Complexity: O(n)
*/

function isPalindrome(str) {
    const cleanStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    return cleanStr === cleanStr.split('').reverse().join('');
}

module.exports = isPalindrome; 