/*
 * @Descripttion: 
 * @version: 
 * @Author: ybq
 * @Date: 2022-07-07 10:07:13
 * @LastEdiTime: 
 */
// 动态规划 记忆化数组
var climbStairs = function (n) {
    const memo = Array(n)
    memo[0] = 1
    memo[1] = 2
    for (let i = 2; i < n; i++) {
        memo[i] = memo[i - 1] + memo[i - 2]
    }
    return memo[n - 1]
};

console.log(climbStairs(9))