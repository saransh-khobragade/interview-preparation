// Linked List Cycle - LeetCode #141
// https://leetcode.com/problems/linked-list-cycle/

/*
Problem: Given head, the head of a linked list, determine if the linked list has a cycle in it.

Example: 3->2->0->-4->2 (cycle) -> true
*/

// Optimized Solution - Floyd's Cycle Finding (Fast/Slow Pointers)
// Time: O(n), Space: O(1)
function hasCycle(head) {
    if (!head || !head.next) return false;
    
    let slow = head;
    let fast = head;
    
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
        
        if (slow === fast) {
            return true;
        }
    }
    
    return false;
}

// Hash Set Solution
// Time: O(n), Space: O(n)
function hasCycleHash(head) {
    const seen = new Set();
    let current = head;
    
    while (current) {
        if (seen.has(current)) {
            return true;
        }
        seen.add(current);
        current = current.next;
    }
    
    return false;
}

module.exports = { hasCycle, hasCycleHash }; 