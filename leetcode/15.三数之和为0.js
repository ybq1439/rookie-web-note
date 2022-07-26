/*
 * @Descripttion: 
 * @version: 
 * @Author: ybq
 * @Date: 2022-07-02 15:22:47
 * @LastEdiTime: 
 */

/* 
描述：找到数组中三个元素和为 0 的所有组合
！不能有重复的组合

思路：首先对数组排序，然后遍历查找；
两个指针，一个最开始指向 start:i+1 一个指向 end:length-1

难点：对于重复的元素的处理，三个指针都要去判断是否又重复的元素：
    1-遍历循环一开始的时候，判断 cur；
    2-找到一组组合的时候，移动两个指针时也要判断两个指针是否又重复的元素；
*/
var threeSum = function (nums) {
    if (nums.length == 0) {
        return []
    }
    let result = []
    nums = nums.sort(function (a, b) {
        return a - b
    })
    for (let i = 0; i < nums.length - 2; i++) {
        if (i > 0 && nums[i] == nums[i - 1]) {
            continue
        }
        let end = nums.length - 1
        let start = i + 1
        while (start < end) {
            if (nums[i] + nums[start] + nums[end] === 0) {
                result.push([nums[i], nums[start], nums[end]])
                start++
                end--
                // 这里还需要去重 判断 start 和 end 是否还是相等的元素
                while (start < end && nums[start] === nums[start - 1]) {
                    start++
                }
                while (start < end && nums[end] === nums[end + 1]) {
                    end--
                }
            } else if (nums[i] + nums[start] + nums[end] > 0) {
                end--
            } else if (nums[i] + nums[start] + nums[end] < 0) {
                start++
            }
        }
    }
    return result
};


threeSum([-1, 0, 1, 2, -1, -4])
console.log('threeSum([-1, 0, 1, 2, -1, -4])', threeSum([0, 0, 0, 0]))