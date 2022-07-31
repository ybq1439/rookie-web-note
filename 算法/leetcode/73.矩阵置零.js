/*
 * @Descripttion: 
 * @version: 
 * @Author: ybq
 * @Date: 2022-07-07 10:38:07
 * @LastEdiTime: 
 */

/* 
给定一个 m x n 的矩阵，如果一个元素为 0 ，
则将其所在行和列的所有元素都设为 0 。请使用 原地 算法。
要求直接操作数组 不能创建新数组
*/
/* 
思路：不能够创建新数组，那么就利用第一行和第一列去标记这一列这一行是否含有0
同时需要注意首先判断第一行第一列是否本身有0
！！！还需要注意，遍历的时候不能去动 第一行 第一列
*/
var setZeroes = function (matrix) {
    let firstRowHasZero = 0
    let fitstColHasZero = 0
    for (let i = 0; i < matrix[0].length; i++) {
        if (matrix[0][i] === 0) {
            firstRowHasZero = 1
        }
    }
    for (let i = 0; i < matrix.length; i++) {
        if (matrix[i][0] === 0) {
            fitstColHasZero = 1
        }
    }
    for (let row = 1; row < matrix.length; row++) {
        for (let col = 1; col < matrix[0].length; col++) {
            if (matrix[row][col] === 0) {
                matrix[0][col] = 0
                matrix[row][0] = 0
            }
        }
    }
    // 检查第一行
    for (let i = 1; i < matrix[0].length; i++) {
        if (matrix[0][i] === 0) {
            for (let row = 1; row < matrix.length; row++) {
                matrix[row][i] = 0
            }
        }
    }
    // 检查第一列
    for (let i = 1; i < matrix.length; i++) {
        if (matrix[i][0] === 0) {
            for (let col = 1; col < matrix[0].length; col++) {
                matrix[i][col] = 0
            }
        }
    }
    if (firstRowHasZero === 1) {
        for (let i = 0; i < matrix[0].length; i++) {
            matrix[0][i] = 0
        }
    }

    if (fitstColHasZero === 1) {
        for (let i = 0; i < matrix.length; i++) {
            matrix[i][0] = 0
        }
    }
};

let arr = [
    [0, 1, 2, 0],
    [3, 4, 5, 2],
    [1, 3, 1, 5]
]
setZeroes(arr)
console.log(arr)