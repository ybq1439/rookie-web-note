/*
 * @Descripttion: 
 * @version: 
 * @Author: ybq
 * @Date: 2022-07-09 11:50:02
 * @LastEdiTime: 
 */
/* 
给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。答案可以按 任意顺序 返回。
给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母
*/
// 同样是回溯的写法，但是 循环不太一样 多了一层 需要依据数字去获取对应的字母
var letterCombinations = function (digits) {
    const result = []
    const digitsLength = digits.length
    // 数字与字母对应数组，其中 1 和 0 都是对应为 空。
    const map = ['', '', 'abc', 'def', 'ghi', 'jkl', 'mno', 'pqrs', 'tuv', 'wxyz']
    if (!length) {
        return []
    }
    if (length === 1) {
        return map[digits].split('')
    }
    const back = (index, cur) => {
        // 终止条件 递归一定要有出口
        if (cur.length === digitsLength) {
            result.push(cur.join(''))
            return
        }
        for (const v of map[digits[index]]) {
            cur.push(v)
            back(index + 1, cur)
            cur.pop()
        }
    }
    back(0, [])
    return result
};

const test = (digits) => {
    const digitsLength = digits.length
    const map = ['', '', 'abc', 'def', 'ghi', 'jkl', 'mno', 'pqrs', 'tuv', 'wxyz']
    if (digitsLength === 1) {
        return map[digits].split('')
    }
    if (digitsLength === 0) {
        return []
    }
    const result = []
    const back = (index, cur) => {
        if (cur.length === digitsLength) {
            result.push(cur.join(''))
            return
        }
        for (const item of map[digits[index]]) {
            cur.push(item)
            back(index + 1, cur)
            cur.pop()
        }
    }
    back(0, [])
    return result
}