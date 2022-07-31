/*
 * @Descripttion: 
 * @version: 
 * @Author: ybq
 * @Date: 2022-07-24 23:00:38
 * @LastEdiTime: 
 */
var rob = function (nums) {
    const memo = []
    const totalLength = nums.length
    if (totalLength === 0) {
        return 0
    }
    if (totalLength === 1) {
        return nums[0]
    }
    memo[0] = nums[0]
    memo[1] = Math.max(memo[0], nums[1])
    for (let i = 2; i < totalLength; i++) {
        memo[i] = Math.max(memo[i] + memo[i - 2], memo[i - 1])
    }
    return memo[totalLength - 1]
}
// 空间优化
const robb = (nums) => {
    const totalLength = nums.length
    if (totalLength === 1) {
        return nums[1]
    }
    if (totalLength === 0) {
        return 0
    }
    // 首先判断 第一个 和 第二个元素 防止越界
    let pre2 = nums[0]
    let pre1 = Math.max(nums[0], nums[1])
    for (let i = 2; i < totalLength; i++) {
        const temp = Math.max(nums[i] + pre2, pre1)
        pre2 = pre1
        pre1 = temp
    }
    return pre1
}