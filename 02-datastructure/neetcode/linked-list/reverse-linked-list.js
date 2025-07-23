// Reverse Linked List - LeetCode #206
// https://leetcode.com/problems/reverse-linked-list/

/*
Problem: Given the head of a singly linked list, reverse the list, and return the reversed list.

Example: 1->2->3->4->5 -> 5->4->3->2->1
*/

// Optimized Solution - Iterative
// Time: O(n), Space: O(1)
function reverseList(head) {
    let prev = null;
    let current = head;
    
    while (current) {
        const next = current.next;
        current.next = prev;
        prev = current;
        current = next;
    }
    
    return prev;
}

// Recursive Solution
// Time: O(n), Space: O(n) - call stack
function reverseListRecursive(head) {
    if (!head || !head.next) {
        return head;
    }
    
    const newHead = reverseListRecursive(head.next);
    head.next.next = head;
    head.next = null;
    
    return newHead;
}

module.exports = { reverseList, reverseListRecursive }; 