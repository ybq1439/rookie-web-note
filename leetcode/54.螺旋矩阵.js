/*
 * @Descripttion: 
 * @version: 
 * @Author: ybq
 * @Date: 2022-07-05 15:26:32
 * @LastEdiTime: 
 */
var spiralOrder = function (matrix) {
    if (matrix.length === 0) {
        return []
    }
    let top = 0
    let bottom = matrix.length - 1
    let left = 0
    let right = matrix[0].length - 1
    let diraction = 'right'
    let result = []
    while (top <= bottom && left <= right) {
        if (diraction === 'right') {
            for (let i = left; i <= right; i++) {
                result.push(matrix[top][i])
            }
            top++
            diraction = 'down'
        } else if (diraction === 'down') {
            for (let i = top; i <= bottom; i++) {
                result.push(matrix[i][right])
            }
            right--
            diraction = 'left'
        } else if (diraction === 'left') {
            for (let i = right; i >= left; i--) {
                result.push(matrix[bottom][i])
            }
            bottom--
            diraction = 'top'
        } else if (diraction === 'top') {
            for (let i = bottom; i >= top; i--) {
                result.push(matrix[i][left])
            }
            left++
            diraction = 'right'
        }
    }
    return result
};