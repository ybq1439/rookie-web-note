/*
 * @Descripttion: 
 * @version: 
 * @Author: ybq
 * @Date: 2022-07-26 14:59:43
 * @LastEdiTime: 
 */

const result = ["1", "2", "3"].map(parseInt)
console.log(result)

console.log(parseInt(15, 16))
["1", '2', '3'].map((item, index) => {
    return parseInt(item, index)
})