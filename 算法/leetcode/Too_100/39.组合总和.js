/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
// 数组中的元素可以重复使用
var combinationSum = function (candidates, target) {
    const result = [];
    candidates.sort((a, b) => { a - b })
    const totalLength = candidates.length;
    const ADD = (a, b) => {
        return a + b
    };
    const back = (start, cur) => {
        if (cur.length > 0) {
            const sum = cur.reduce(ADD);
            if (sum > target) {
                return
            } else if (sum === target) {
                result.push([...cur])
                return
            }
        }
        for (let i = start; i < totalLength; i++) {
            cur.push(candidates[i])
            // 这里选择从 i 开始，允许选择重复元素
            back(i, cur)
            cur.pop()
        }
    };
    back(0, [])
    return result
};