// 依据第一行与第一列 确定到达每一个 格子需要的步数
// 第一行与第一列 格子需要的步数都是确定的
var minPathSum = function (grid) {
    const totalLength = grid.length;
    const colLength = grid[0].length;
    const memo = Array(totalLength)
    for (let i = 0; i < totalLength; i++) {
        memo[i] = [];
    }
    // 确定第一行 到达每个格子需要的步数
    memo[0][0] = grid[0][0];
    for (let i = 1; i < grid[0].length; i++) {
        memo[0][i] = grid[0][i] + memo[0][i - 1];
    }
    // 确定第一列 到达每个格子需要的步数
    for (let j = 1; j < totalLength; j++) {
        memo[j][0] = grid[j][0] + memo[j - 1][0]
    }
    for (let row = 1; row < totalLength; row++) {
        for (let col = 1; col < grid[0].length; col++) {
            const min = Math.min(memo[row][col - 1], memo[row - 1][col]);
            memo[row][col] = grid[row][col] + min;
        }
    }
    return memo[totalLength - 1][colLength - 1]
};