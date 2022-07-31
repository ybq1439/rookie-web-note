/*
 * @Descripttion: 
 * @version: 
 * @Author: ybq
 * @Date: 2022-07-06 12:15:46
 * @LastEdiTime: 
 */
/* 一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为 “Start” ）。
机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为 “Finish” ）。
问总共有多少条不同的路径？
 */
// 动态规划
// 思路：首先把第一行和第一列都置为 1，因为到达他们的路径都有一条
// 然后中间的格子到他们的路径就等于 左边的格子路径加上上边的格子路径
var uniquePaths = function (m, n) {
    const memo = []
    for (let i = 0; i < n; i++) {
        memo.push([])
    }
    // 第一行置为 1
    for (let col = 0; col < m; col++) {
        memo[0][col] = 1
    }
    for (let row = 0; row < n; row++) {
        memo[row][0] = 1
    }
    for (let row = 1; row < n; row++) {
        for (let col = 1; col < m; col++) {
            memo[row][col] = memo[row][col - 1] + memo[row - 1][col]
        }
    }
    return memo[n - 1][m - 1]
};