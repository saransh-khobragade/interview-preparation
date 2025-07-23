/*
Insertion Sort Algorithm
------------------------
Insertion Sort builds the final sorted array one item at a time. It is much less efficient on large lists than more advanced algorithms like quicksort, heapsort, or merge sort.

Time Complexity: O(n^2)
Space Complexity: O(1)
Stable: Yes
*/

function insertionSort(arr) {
    const result = [...arr];
    const n = result.length;
    for (let i = 1; i < n; i++) {
        let current = result[i];
        let j = i - 1;
        while (j >= 0 && result[j] > current) {
            result[j + 1] = result[j];
            j--;
        }
        result[j + 1] = current;
    }
    return result;
}

module.exports = insertionSort; 