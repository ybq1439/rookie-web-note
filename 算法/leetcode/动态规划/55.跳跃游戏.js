/*
 * @Descripttion: 
 * @version: 
 * @Author: ybq
 * @Date: 2022-07-05 23:08:57
 * @LastEdiTime: 
 */

/* 给定一个非负整数数组 nums ，你最初位于数组的 第一个下标 。
数组中的每个元素代表你在该位置可以跳跃的最大长度。
判断你是否能够到达最后一个下标。 */

// 1-使用动态规划 topdown
// 借助一个数组用于存储路径是否是通的 1表示为通，-1表示不通，0表示未知
var canJump = function (nums) {
    let memo = Array(nums.length).fill(0)
    memo[memo.length - 1] = 1

    const jump = (position) => {
        if (memo[position] === -1) {
            return false
        }
        if (memo[position] === 1) {
            return true
        }
        // 防止下标越界
        const maxIndex = Math.min(position + nums[position], nums.length - 1)
        for (let i = position + 1; i <= maxIndex; i++) {
            const jumpResult = jump(i)
            if (jumpResult === true) {
                memo[position] = 1
                return true
            }
        }
        memo[position] = -1
        return false
    }
    let result = jump(0)
    return result
};
// 动态规划 下到上
const canjump_ = (nums) => {
    const totalLength = nums.length
    const memo = Array(totalLength).fill(0)
    memo[totalLength - 1] = 1
    for (let i = totalLength - 2; i >= 0; i--) {
        const maxJump = Math.min(totalLength - 1, i + nums[i]) //防止越界
        for (let j = i + 1; j <= maxJump; j++) {
            if (memo[j] === 1) {
                memo[i] = 1
                break
            }
        }
    }
    if (memo[0] === 1) {
        return true
    } else {
        return false
    }
}

// 最快 最好 贪心算法
// 思路：从后往前跳，如果 下标加上当前下标能跳的值 大于等于最大下标 那就能够到最后
// 同时 需要移动 maxJump 到前一个 因为只要 i-1 能够到 i ,那么只要满足 i-2 能够到 i-1 
// 就可以到达 i
const canJump__ = (nums) => {
    const totalLength = nums.length
    let maxJump = totalLength - 1
    for (let i = totalLength - 2; i >= 0; i--) {
        const canJump = nums[i] + i
        if (canJump >= maxJump) {
            maxJump = i
        }
    }
    return maxJump === 0 ? true : false
}