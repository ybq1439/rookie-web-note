/*
 * @Descripttion: 
 * @version: 
 * @Author: ybq
 * @Date: 2022-07-17 16:44:20
 * @LastEdiTime: 
 */
// 这个题目只需要找到 断层那里就可以
// 这个题 如果是翻转了的话，前面的一段都所有元素比后一段的元素大，
// 只需要找到第一个比前一个小的元素，就是最小元素
// 二分查找
var findMin = function (nums) {
    if (nums.length === 1) {
        return nums[0]
    }
    let totalLength = nums.length
    let left = 0
    let right = totalLength - 1
    if (nums[left] < nums[right]) {
        return nums[left]
    }
    while (left < right) {
        let mid = Math.floor(left + (right - left) / 2)

        if (nums[mid] > nums[mid + 1]) {
            return nums[mid + 1]
        }
        if (nums[mid - 1] > nums[mid]) {
            return nums[mid]
        }
        if (nums[left] < nums[mid]) {
            left = mid + 1
        } else {
            right = mid - 1
        }
    }
};