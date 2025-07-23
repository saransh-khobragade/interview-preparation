/*
Longest Substring Without Repeating Characters (Sliding Window)
--------------------------------------------------------------
Given a string s, find the length of the longest substring without repeating characters.

Pattern: Sliding Window
This approach uses a window to track the current substring without duplicates, expanding and shrinking as needed.

Example:
Input: "abcabcbb"
Output: 3 ("abc")

Time Complexity: O(n)
Space Complexity: O(min(n, m)), where m is the charset size
*/

function lengthOfLongestSubstring(s) {
    let maxLen = 0;
    let left = 0;
    const seen = new Map();
    for (let right = 0; right < s.length; right++) {
        if (seen.has(s[right]) && seen.get(s[right]) >= left) {
            left = seen.get(s[right]) + 1;
        }
        seen.set(s[right], right);
        maxLen = Math.max(maxLen, right - left + 1);
    }
    return maxLen;
}

module.exports = lengthOfLongestSubstring; 