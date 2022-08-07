/*
 * @Descripttion: 
 * @version: 
 * @Author: ybq
 * @Date: 2022-07-27 13:55:57
 * @LastEdiTime: 
 */
// number 转化为 字符串，字符串按位相加
const bigNumberAdd = (number1, number2) => {
    let result = ''
    let arr1 = number1.toString().split('')
    let arr2 = number2.toString().split('')
    let carry = false
    while (arr1.length > 0 || arr2.length > 0) {
        let num1 = arr1.pop()
        let num2 = arr2.pop()
        if (!num1) {
            num1 = 0
        }
        if (!num2) {
            num2 = 0
        }
        let res = parseInt(num1) + parseInt(num2)
        if (carry) {
            res++
        }
        result = res % 10 + result
        if (res >= 10) {
            carry = true
        } else {
            carry = false
        }
    }
    if (carry) {
        result = '1' + result
    }
    return result
}
const result = bigNumberAdd(1234, 56789)
console.log(result)