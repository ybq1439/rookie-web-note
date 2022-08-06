/*
 * @Descripttion: 
 * @version: 
 * @Author: ybq
 * @Date: 2022-08-03 22:15:31
 * @LastEdiTime: 
 */
var numIslands = function (grid) {
    let result = 0
    let totalLength = grid.length
    // 深度优先 用于沉没岛屿
    const dfs = (row, col) => {
        // 递归出口：越界 或者 为陆地
        if (row < 0 || row >= totalLength || grid[row][col] === '0' || col >= grid[0].length || col < 0) {
            return
        }
        grid[row][col] = '0'
        dfs(row - 1, col)
        dfs(row + 1, col)
        dfs(row, col - 1)
        dfs(row, col + 1)
    }
    for (let row = 0; row < totalLength; row++) {
        for (let col = 0; col < grid[0].length; col++) {
            if (grid[row][col] === '1') {
                result++
                dfs(row, col)
            }
        }
    }
    return result
};