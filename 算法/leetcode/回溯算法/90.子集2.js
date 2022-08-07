/*
 * @Descripttion: 
 * @version: 
 * @Author: ybq
 * @Date: 2022-07-09 10:06:52
 * @LastEdiTime: 
 */
/* 
给你一个整数数组 nums ，其中可能包含重复元素，请你返回该数组所有可能的子集（幂集）。
解集 不能 包含重复的子集。返回的解集中，子集可以按 任意顺序 排列。
来源：力扣（LeetCode）

输入：nums = [1,2,2]
输出：[[],[1],[1,2],[1,2,2],[2],[2,2]]
*/

var subsetsWithDup = function (nums) {
    const result = []
    //首先排序
    nums.sort((a, b) => {
        return a - b
    })

    function back(start, cur) {
        result.push([...cur])
        // 这个 for 循环的作用是 选择 start 之后的元素与 cur 进行一个组合
        for (let i = start; i < nums.length; i++) {
            // i 为什么要大于 start ？允许出现 [1,2,2]
            // 但是如果 第一次选择 [1,2] 去组合了
            // 下一次选择下一个坐标 2 (前一个 2 坐标为 1) 还是 [1,2],
            // 那么就得 continue 放弃这个组合
            if (i > start && nums[i] === nums[i - 1]) {
                continue
            }
            cur.push(nums[i])
            back(i + 1, cur)
            cur.pop()
        }
    }
    back(0, [])
    return result
};
const subsetsWithDup_ = (nums) => {
    const result = []
    nums.sort((a, b) => {
        return a - b
    })
    const back = (start, curr) => {
        result.push([...curr])

        for (let i = start; i < nums.length; i++) {
            if (i > start && nums[i] === nums[i - 1]) {
                continue
            }
            curr.push(nums[i])
            back(i + 1, curr)
            curr.pop()
        }
    }
    return result
}
const result = subsetsWithDup([1, 2, 2])
console.log(result)