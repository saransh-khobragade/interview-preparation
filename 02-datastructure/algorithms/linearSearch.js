/*
Linear Search Algorithm
-----------------------
Linear Search checks each element in the array sequentially until the target value is found or the array ends.

Time Complexity: O(n)
Space Complexity: O(1)
*/

function linearSearch(arr, target) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) {
            return i;
        }
    }
    return -1;
}

module.exports = linearSearch; 