/*
 * @Descripttion: 
 * @version: 
 * @Author: ybq
 * @Date: 2022-07-06 11:34:37
 * @LastEdiTime: 
 */

/* 
以数组 intervals 表示若干个区间的集合，其中单个区间为 intervals[i] = [starti, endi] 。
请你合并所有重叠的区间，并返回 一个不重叠的区间数组，该数组需恰好覆盖输入中的所有区间 。
思路：关键是要将数组先按照 区间左边界排序
*/
var merge = function (intervals) {
    if (intervals.length < 2) {
        return intervals
    }
    intervals.sort((a, b) => {
        return a[0] - b[0] //升序排列
    })
    let cur = intervals[0]
    let result = []
    for (let interval of intervals) {
        if (cur[1] >= interval[0]) {
            cur[1] = Math.max(interval[1], cur[1])
        } else {
            result.push(cur)
            cur = interval
        }
    }
    if (cur.length !== 0) {
        result.push(cur)
    }
    return result
};