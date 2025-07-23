/*
Binary Search Algorithm
-----------------------
Binary Search is an efficient algorithm for finding an item from a sorted array by repeatedly dividing the search interval in half.

Time Complexity: O(log n)
Space Complexity: O(1)
*/

function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (arr[mid] === target) {
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return -1;
}

module.exports = binarySearch; 