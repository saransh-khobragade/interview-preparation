/*
Longest Common Subsequence (LCS) Algorithm
------------------------------------------
Finds the longest subsequence common to two strings using dynamic programming.

Time Complexity: O(mn)
Space Complexity: O(mn)
*/

function longestCommonSubsequence(str1, str2) {
    const m = str1.length;
    const n = str2.length;
    const dp = Array(m + 1).fill().map(() => Array(n + 1).fill(0));
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (str1[i - 1] === str2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
    // Reconstruct the sequence
    let i = m, j = n;
    const sequence = [];
    while (i > 0 && j > 0) {
        if (str1[i - 1] === str2[j - 1]) {
            sequence.unshift(str1[i - 1]);
            i--;
            j--;
        } else if (dp[i - 1][j] > dp[i][j - 1]) {
            i--;
        } else {
            j--;
        }
    }
    return sequence.join('');
}

module.exports = longestCommonSubsequence; 