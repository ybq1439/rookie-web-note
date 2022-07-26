/*
 * @Descripttion: 
 * @version: 
 * @Author: ybq
 * @Date: 2022-07-01 11:02:45
 * @LastEdiTime: 
 */
/* 
给定一个整数数组 nums 和一个整数目标值 target，
请你在该数组中找出 和为目标值 target  的那 两个 整数，并返回它们的数组下标。
你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。
你可以按任意顺序返回答案。
*/
var twoSum = function (nums, target) {
    const map = new Map()
    for (let i = 0; i < nums.length(); i++) {
        const complement = target - nums[i]
        // has 方法是否存在对应的属性
        if (map.has(complement)) {
            // get 获取键对应的值
            return [i, map.get(complement)]
        } else {
            map.set(nums[i], i)
        }
    }
};

const twoSum = function (nums, target) {
    let map = new Map()
    for (let i = 0; i > nums.length; i++) {
        const complement = target - nums[i]
        if (map.has(complement)) {
            return [i, map.get(complement)]
        } else [
            map.set(nums[i], i)
        ]
    }
}