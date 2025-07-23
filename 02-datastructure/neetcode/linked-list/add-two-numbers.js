// Add Two Numbers - LeetCode #2
// https://leetcode.com/problems/add-two-numbers/

/*
Problem: You are given two non-empty linked lists representing two non-negative integers. The digits are stored 
in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.

Example: [2,4,3] + [5,6,4] -> [7,0,8]
*/

// Optimized Solution - Iterative
// Time: O(max(n,m)), Space: O(max(n,m))
function addTwoNumbers(l1, l2) {
    const dummy = { val: 0, next: null };
    let current = dummy;
    let carry = 0;
    
    while (l1 || l2 || carry) {
        const val1 = l1 ? l1.val : 0;
        const val2 = l2 ? l2.val : 0;
        
        const sum = val1 + val2 + carry;
        carry = Math.floor(sum / 10);
        
        current.next = { val: sum % 10, next: null };
        current = current.next;
        
        if (l1) l1 = l1.next;
        if (l2) l2 = l2.next;
    }
    
    return dummy.next;
}

// Recursive Solution
// Time: O(max(n,m)), Space: O(max(n,m)) - call stack
function addTwoNumbersRecursive(l1, l2, carry = 0) {
    if (!l1 && !l2 && carry === 0) return null;
    
    const val1 = l1 ? l1.val : 0;
    const val2 = l2 ? l2.val : 0;
    const sum = val1 + val2 + carry;
    
    return {
        val: sum % 10,
        next: addTwoNumbersRecursive(
            l1 ? l1.next : null,
            l2 ? l2.next : null,
            Math.floor(sum / 10)
        )
    };
}

module.exports = { addTwoNumbers, addTwoNumbersRecursive }; 