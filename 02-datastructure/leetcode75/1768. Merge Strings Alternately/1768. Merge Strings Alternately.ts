/*
You are given two strings word1 and word2.
Merge the strings by adding letters in alternating order,
starting with word1. If a string is longer than the other, 
append the additional letters onto the end of the merged string.
Return the merged string.
Input: word1 = "abc", word2 = "pqr"
Output: "apbqcr"
 */
function mergeAlternately(word1: string, word2: string): string {
    let result = ''
    const len = word1.length > word2.length ? word1.length : word2.length
    for (let i = 0; i < len; i++) {
        if (i < word1.length) {
            result += word1[i]
        }
        if (i < word2.length) {
            result += word2[i]
        }
    }
    return result
};

// Test the function
console.log(mergeAlternately("abc", "pqr"))