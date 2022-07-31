/*
 * @Descripttion: 
 * @version: 
 * @Author: ybq
 * @Date: 2022-07-08 23:21:00
 * @LastEdiTime: 
 */
// 回溯法 需要背模板
var subsets = function (nums) {
    const result = []

    function backTrack(start, curr) {
        result.push([...curr])

        for (let i = start; i < nums.length; i++) {
            curr.push(nums[i])
            backTrack(i + 1, curr)
            curr.pop()
        }
    }
    backTrack(0, [])
    return result
};