/*
 * @Descripttion: 
 * @version: 
 * @Author: ybq
 * @Date: 2022-07-07 09:48:16
 * @LastEdiTime: 
 */
/* 
给定一个由 整数 组成的 非空 数组所表示的非负整数，在该数的基础上加一。
最高位数字存放在数组的首位， 数组中每个元素只存储单个数字。
你可以假设除了整数 0 之外，这个整数不会以零开头。
*/
var plusOne = function (digits) {
    let number = BigInt(digits.join('')) + BigInt(1)
    const arr = number.toString().split('')
    return arr.map((item) => Number.parseInt(item))
};
var plusOne_ = function (digits) {
    let totalLength = digits.length
    for (let i = totalLength - 1; i >= 0; i--) {
        if (digits[i] !== 9) {
            digits[i]++
            return digits
        } else {
            digits[i] = 0
        }
    }
    // 全是 9 的情况，这时候数组都变为 0 了
    return [1, ...digits]
}
console.log(plusOne([6, 1, 4, 5, 3, 9, 0, 1, 9, 5, 1, 8, 6, 7, 0, 5, 5, 4, 3]))