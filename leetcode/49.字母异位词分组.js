/*
 * @Descripttion: 
 * @version: 
 * @Author: ybq
 * @Date: 2022-07-04 14:39:35
 * @LastEdiTime: 
 */
/* 
 *思路：对于每一项单词，创建一个 26 个元素的数组
 *分别代表对应 26 个字母出现的次数，然后去遍历单词
 *将对应字母出现次数填进去。
 *对于是一组 异位词 那么他们的 字母数组是相同的，用一个 map 存起来
 */
var groupAnagrams = function (strs) {
    if (strs.length === 0) {
        return []
    }
    let map = new Map()
    for (const str of strs) {
        let chars = Array(26).fill(0)
        for (let i = 0; i < str.length; i++) {
            // 字符串中只会包含小写字母，所以是减掉 97
            const ascii = str.charCodeAt(i) - 97
            chars[ascii]++
        }
        let temp = chars.join('.')
        if (map.has(temp)) {
            map.set(temp, [...map.get(temp), str])
        } else {
            map.set(temp, [str])
        }
    }
    const result = []
    for (const arr of map) {
        result.push(arr[1])
    }
    return result
};