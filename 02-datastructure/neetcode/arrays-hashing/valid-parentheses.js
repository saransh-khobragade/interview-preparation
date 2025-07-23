// Valid Parentheses - LeetCode #20
// https://leetcode.com/problems/valid-parentheses/

/*
Problem: Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', 
determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.

Example: "()[]{}" -> true, "([)]" -> false
*/

// Optimized Solution using Stack
// Time: O(n), Space: O(n)
function isValid(s) {
    const stack = [];
    const pairs = {
        ')': '(',
        '}': '{',
        ']': '['
    };
    
    for (let char of s) {
        if (char in pairs) {
            // Closing bracket
            if (stack.pop() !== pairs[char]) {
                return false;
            }
        } else {
            // Opening bracket
            stack.push(char);
        }
    }
    
    return stack.length === 0;
}

module.exports = { isValid }; 