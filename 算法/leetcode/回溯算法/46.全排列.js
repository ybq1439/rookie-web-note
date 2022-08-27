/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function (nums) {
    const totalLength = nums.length;
    const map = new Map();
    const result = [];
    const back = (cur) => {
        if (cur.length === totalLength) {
            result.push([...cur])
        }
        for (const item of nums) {
            if (map.get(item) === 1) {
                continue
            }
            map.set(item, 1)
            cur.push(item)
            back(cur)
            cur.pop()
            map.set(item, 0)
        }
    };
    back([])
    return result
};