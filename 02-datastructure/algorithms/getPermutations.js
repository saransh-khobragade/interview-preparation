/*
String Permutations Algorithm
-----------------------------
Generates all possible permutations of a given string using recursion.

Time Complexity: O(n!)
Space Complexity: O(n!)
*/

function getPermutations(str) {
    if (str.length <= 1) return [str];
    const permutations = [];
    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        const remaining = str.slice(0, i) + str.slice(i + 1);
        const subPermutations = getPermutations(remaining);
        for (const perm of subPermutations) {
            permutations.push(char + perm);
        }
    }
    return permutations;
}

module.exports = getPermutations; 