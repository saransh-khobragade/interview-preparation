// Longest Substring Without Repeating Characters - LeetCode #3
// https://leetcode.com/problems/longest-substring-without-repeating-characters/

/*
Problem: Given a string s, find the length of the longest substring without repeating characters.

Example: "abcabcbb" -> 3 ("abc")
*/

// Optimized Solution - Sliding Window
// Time: O(n), Space: O(min(m,n)) where m is charset size
function lengthOfLongestSubstring(s) {
    const seen = new Map();
    let left = 0, maxLength = 0;
    
    for (let right = 0; right < s.length; right++) {
        const char = s[right];
        
        if (seen.has(char) && seen.get(char) >= left) {
            left = seen.get(char) + 1;
        }
        
        seen.set(char, right);
        maxLength = Math.max(maxLength, right - left + 1);
    }
    
    return maxLength;
}

module.exports = { lengthOfLongestSubstring }; 