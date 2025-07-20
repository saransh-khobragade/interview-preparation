// Valid Palindrome - LeetCode #125
// https://leetcode.com/problems/valid-palindrome/

/*
Problem: A phrase is a palindrome if, after converting all uppercase letters into lowercase letters 
and removing all non-alphanumeric characters, it reads the same forward and backward.

Example: "A man, a plan, a canal: Panama" -> true
*/

// Optimized Solution - Two Pointers
// Time: O(n), Space: O(1)
function isPalindrome(s) {
    const clean = s.toLowerCase().replace(/[^a-z0-9]/g, '');
    let left = 0, right = clean.length - 1;
    
    while (left < right) {
        if (clean[left] !== clean[right]) {
            return false;
        }
        left++;
        right--;
    }
    
    return true;
}

module.exports = { isPalindrome }; 