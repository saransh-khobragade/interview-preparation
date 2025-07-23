/*
House Robber Algorithm
-----------------------
Finds the maximum amount of money you can rob tonight without alerting the police (cannot rob two adjacent houses). Uses dynamic programming.

Time Complexity: O(n)
Space Complexity: O(1)
*/

function houseRobber(nums) {
    if (nums.length === 0) return 0;
    if (nums.length === 1) return nums[0];
    let prev1 = 0, prev2 = nums[0];
    for (let i = 1; i < nums.length; i++) {
        const current = Math.max(prev2, prev1 + nums[i]);
        prev1 = prev2;
        prev2 = current;
    }
    return prev2;
}

module.exports = houseRobber; 