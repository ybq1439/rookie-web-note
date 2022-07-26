/*
 * @Descripttion: 
 * @version: 
 * @Author: ybq
 * @Date: 2022-07-14 21:58:14
 * @LastEdiTime: 
 */
var isPalindrome = function (s) {
    const str = s.toLocaleLowerCase().replace(/[\W_]/g, '')
    if (str.length < 2) {
        return true
    }
    let totalLength = str.length
    let right = totalLength - 1
    let left = 0
    while (left < right) {
        if (str[left] !== str[right]) {
            return false
        }
        left++
        right--
    }
    return true
};

console.log(isPalindrome("A man, a plan, a canal: Panama"))