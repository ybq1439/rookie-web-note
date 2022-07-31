/*
 * @Descripttion: 
 * @version: 
 * @Author: ybq
 * @Date: 2022-07-09 11:27:03
 * @LastEdiTime: 
 */
/* 
给定两个整数 n 和 k，返回范围 [1, n] 中所有可能的 k 个数的组合。
你可以按 任何顺序 返回答案。
*/
var combine = function (n, k) {
    const result = []
    const back = (start, cur) => {
        if (cur.length === k) {
            // 一定注意浅拷贝
            result.push([...cur])

        }

        for (let i = start; i <= n; i++) {
            if (cur.length === k) {
                continue
            }
            cur.push(i)
            back(i + 1, cur)
            cur.pop()
        }
    }
    back(1, [])
    return result
};