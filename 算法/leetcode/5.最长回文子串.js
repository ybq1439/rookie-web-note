/*
 * @Descripttion: 
 * @version: 
 * @Author: ybq
 * @Date: 2022-07-02 14:16:08
 * @LastEdiTime: 
 */
/* 
!!!!需要注意字符串长度 为奇数和偶数两种情况
*/
var longestPalindrome = function (s) {
    if (s.length < 2) {
        return s
    }
    let start = 0 //最长回文子串的最左边下标
    let maxLength = 1 //最长回文子串的长度 注意：这里需要是 1 因为如果 s === ’ab‘，需要返回 a
    // 辅助函数 两件事情
    // 1-检查左右两边是否越界
    // 2-检查左右两边的字符是否相等
    const helper = (left, right) => {
        while (left >= 0 && right < s.length && s[left] == s[right]) {
            //通过下标判断当前回文字符串长度
            if (right - left + 1 > maxLength) {
                maxLength = right - left + 1
                start = left
            }
            left--
            right++
        }
    }
    // 这里一定需要两边的，不能够先判断 s 奇偶
    // 例如 abab 偶数，如果只遍历一边，会出问题
    // 如果需要先判断奇偶,这个奇偶应该是 最长的回文串 的奇偶
    // 注意：这里需要从 0 开始，是不会越界的，同时分了两种情况，不会有漏掉的
    for (let i = 0; i < s.length; i++) {
        // 长度为奇数的情况
        helper(i - 1, i + 1)
        // 长度为偶数的情况
        helper(i, i + 1)
    }
    return s.substring(start, maxLength + start)
};

