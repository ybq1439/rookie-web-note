/*
 * @Descripttion: 
 * @version: 
 * @Author: ybq
 * @Date: 2022-07-26 22:27:48
 * @LastEdiTime: 
 */
var productExceptSelf = function (nums) {
    const result = Array(nums.length).fill(1)
    let pro = 1
    for (let i = 0; i < nums.length; i++) {
        result[i] = result[i] * pro
        pro = pro * nums[i]
    }
    pro = 1
    for (let i = nums.length - 1; i >= 0; i--) {
        result[i] = result[i] * pro
        pro = pro * nums[i]
    }
    return result
};