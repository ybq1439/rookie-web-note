/*
 * @Descripttion: 
 * @version: 
 * @Author: ybq
 * @Date: 2022-07-10 11:37:07
 * @LastEdiTime: 
 */
// 三个指针
var reverseList = function (head) {
    let pre = null
    let curr = head
    while (curr !== null) {
        let next = curr.next
        curr.next = pre
        pre = curr
        curr = next
    }
    return pre
};