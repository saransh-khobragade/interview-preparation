/*
Selection Sort Algorithm
------------------------
Selection Sort divides the input list into two parts: the sublist of items already sorted and the sublist of items remaining to be sorted. It repeatedly selects the smallest (or largest) element from the unsorted sublist and moves it to the end of the sorted sublist.

Time Complexity: O(n^2)
Space Complexity: O(1)
Stable: No
*/

function selectionSort(arr) {
    const result = [...arr];
    const n = result.length;
    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < n; j++) {
            if (result[j] < result[minIndex]) {
                minIndex = j;
            }
        }
        if (minIndex !== i) {
            [result[i], result[minIndex]] = [result[minIndex], result[i]];
        }
    }
    return result;
}

module.exports = selectionSort; 