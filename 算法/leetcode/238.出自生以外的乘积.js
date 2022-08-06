/*
 * @Descripttion: 
 * @version: 
 * @Author: ybq
 * @Date: 2022-08-03 22:45:22
 * @LastEdiTime: 
 */
var productExceptSelf = function (nums) {
    let resultArr = Array(nums.length).fill(1)
    let product = 1
    for (let i = 0; i < nums.length; i++) {
        resultArr[i] = resultArr[i] * product
        product = product * nums[i]
    }
    product = 1
    for (let i = nums.length - 1; i >= 0; i--) {
        resultArr[i] = resultArr[i] * product
        product = product * nums[i]
    }
    return resultArr
};