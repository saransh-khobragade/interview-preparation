/*
Quick Sort Algorithm
---------------------
Quick Sort is a divide-and-conquer algorithm. It picks an element as a pivot and partitions the array around the pivot, recursively sorting the subarrays.

Average Time Complexity: O(n log n)
Worst-case Time Complexity: O(n^2)
Space Complexity: O(log n)
Stable: No
*/

function quickSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }
    const pivot = arr[Math.floor(arr.length / 2)];
    const left = arr.filter(x => x < pivot);
    const middle = arr.filter(x => x === pivot);
    const right = arr.filter(x => x > pivot);
    return [...quickSort(left), ...middle, ...quickSort(right)];
}

module.exports = quickSort; 