/*
 * @Descripttion: 
 * @version: 
 * @Author: ybq
 * @Date: 2022-07-09 11:40:02
 * @LastEdiTime: 
 */
var combinationSum3 = function (k, n) {
    const result = []

    const add = (start, cur) => {
        return start + cur
    }
    const back = (start, cur) => {
        // 要求长度大于 0 是因为不是对空数组 reduce
        if (cur.length > 0 && cur.reduce(add) === n && cur.length === k) {
            result.push([...cur])
        }
        for (let i = start; i <= 9; i++) {
            cur.push(i)
            back(i + 1, cur)
            cur.pop()
        }
    }
    back(1, [])
    return result
};

const combinationSum_ = (k, n) => {
    const result = []
    const add = (a, b) => {
        return a + b
    }
    const back = (start, curr) => {
        if (curr.length === k && curr.reduce(add) === n && cur.length > 0) {
            result.push([...curr])
        }
        for (let i = start; i <= 9; i++) {
            curr.push(i)
            back(i + 1, curr)
            curr.pop()
        }
    }
    back(1, [])
    return result
}