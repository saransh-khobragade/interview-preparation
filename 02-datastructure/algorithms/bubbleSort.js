/*
Bubble Sort Algorithm
---------------------
Bubble Sort is a simple comparison-based sorting algorithm. It repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. This process is repeated until the list is sorted.

Time Complexity: O(n^2)
Space Complexity: O(1)
Stable: Yes
*/

function bubbleSort(arr) {
    const n = arr.length;
    const result = [...arr];
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (result[j] > result[j + 1]) {
                [result[j], result[j + 1]] = [result[j + 1], result[j]];
            }
        }
    }
    return result;
}

module.exports = bubbleSort; 