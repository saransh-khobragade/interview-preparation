// Merge Two Sorted Lists - LeetCode #21
// https://leetcode.com/problems/merge-two-sorted-lists/

/*
Problem: Merge two sorted linked lists and return it as a sorted list.

Example: [1,2,4] + [1,3,4] -> [1,1,2,3,4,4]
*/

// Optimized Solution - Iterative
// Time: O(n + m), Space: O(1)
function mergeTwoLists(l1, l2) {
    const dummy = { val: 0, next: null };
    let current = dummy;
    
    while (l1 && l2) {
        if (l1.val <= l2.val) {
            current.next = l1;
            l1 = l1.next;
        } else {
            current.next = l2;
            l2 = l2.next;
        }
        current = current.next;
    }
    
    current.next = l1 || l2;
    return dummy.next;
}

// Recursive Solution
// Time: O(n + m), Space: O(n + m) - call stack
function mergeTwoListsRecursive(l1, l2) {
    if (!l1) return l2;
    if (!l2) return l1;
    
    if (l1.val <= l2.val) {
        l1.next = mergeTwoListsRecursive(l1.next, l2);
        return l1;
    } else {
        l2.next = mergeTwoListsRecursive(l1, l2.next);
        return l2;
    }
}

module.exports = { mergeTwoLists, mergeTwoListsRecursive }; 