/*
 * @Descripttion: 
 * @version: 
 * @Author: ybq
 * @Date: 2022-07-17 16:35:14
 * @LastEdiTime: 
 */
var maxProduct = function (nums) {
    const minProduct = []
    const maxProduct = []
    minProduct[0] = nums[0]
    maxProduct[0] = nums[0]
    let max = nums[0]
    for (let i = 1; i < nums.length; i++) {
        minProduct[i] = Math.min(nums[i], nums[i] * minProduct[i - 1], nums[i] * maxProduct[i - 1])
        maxProduct[i] = Math.max(nums[i], nums[i] * maxProduct[i - 1], nums[i] * minProduct[i - 1])
        max = Math.max(max, maxProduct[i])
    }
    return max
};