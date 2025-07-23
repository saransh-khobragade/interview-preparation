/*
Linked List Cycle (Fast and Slow Pointers)
-------------------------------------------
Given the head of a linked list, determine if the list has a cycle in it.

Pattern: Fast and Slow Pointers (Floyd's Tortoise and Hare)
We use two pointers moving at different speeds to detect a cycle.

Example:
Input: head = [3,2,0,-4], pos = 1 (tail connects to node index 1)
Output: true

Time Complexity: O(n)
Space Complexity: O(1)
*/

function hasCycle(head) {
    let slow = head, fast = head;
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow === fast) return true;
    }
    return false;
}

module.exports = hasCycle; 