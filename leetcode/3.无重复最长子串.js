/*
 * @Descripttion: 
 * @version: 
 * @Author: ybq
 * @Date: 2022-07-01 12:04:10
 * @LastEdiTime: 
 */
/* 
滑动窗口，左边那个指针一直指向最左边元素，如果 set 里面包括了 right 指向元素，
那么一边删除 set 中 left 对应的元素，一边移动 left 指针
*/
var lengthOfLongestSubstring = function (s) {
    let set = new Set()
    let left = right = max = 0
    for (; right < s.length; right++) {
        if (!set.has(s[right])) {
            set.add(s[right])
            max = Math.max(max, set.size)
        } else {
            while (set.has(s[right])) {
                set.delete(s[left])
                left++
            }
            set.add(s[right])
        }
    }
    return max
};