/*
Sort Array of Numbers
----------------------
Sorts an array of numbers in ascending order using Array.prototype.sort with a compare function.
*/

function sortArray(arr) {
    return arr.slice().sort((a, b) => a - b);
}

module.exports = sortArray; 