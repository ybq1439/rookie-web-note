/*
 * @Descripttion: 
 * @version: 
 * @Author: ybq
 * @Date: 2022-07-04 15:33:54
 * @LastEdiTime: 
 */

/* 给你一个整数数组 nums ，请你找出一个具有最大和的连续子数组（子数组最少包含一个元素），
返回其最大和。
子数组 是数组中的一个连续部分。 */

// 动态规划，每一次都面临两个选择，是把最新的元素添加进去
// 还是说使用最新的元素重新开一个新的数组
var maxSubArray = function (nums) {
    if (nums.length == 1) {
        return nums[0]
    }
    let arr = []
    let max = nums[0]
    arr[0] = nums[0]
    for (let i = 1; i < nums.length; i++) {
        arr[i] = Math.max(nums[i] + arr[i - 1], nums[i])
        max = Math.max(arr[i], max)
    }
    return max
};