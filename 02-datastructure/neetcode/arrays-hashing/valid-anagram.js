// Valid Anagram - LeetCode #242
// https://leetcode.com/problems/valid-anagram/

/*
Problem: Given two strings s and t, return true if t is an anagram of s, and false otherwise.
An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase.

Example: s = "anagram", t = "nagaram" -> true
*/

// Optimized Solution - Character Count
// Time: O(n), Space: O(1) - fixed size alphabet
function isAnagram(s, t) {
    if (s.length !== t.length) return false;
    
    const count = new Array(26).fill(0);
    
    for (let i = 0; i < s.length; i++) {
        count[s.charCodeAt(i) - 97]++;
        count[t.charCodeAt(i) - 97]--;
    }
    
    return count.every(c => c === 0);
}

module.exports = { isAnagram }; 