/*
 * @Descripttion: 
 * @version: 
 * @Author: ybq
 * @Date: 2022-07-10 11:25:55
 * @LastEdiTime: 
 */
function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
}
var reverseBetween = function (head, left, right) {
    let pre = null
    let curr = head
    let next = null
    for (let i = 1; i < left; i++) {
        pre = curr
        curr = curr.next
    }
    // 这两个指针用于记录需要反转的位置的一开始的头，以及前一个，用于后面拼接链表
    let pre2 = pre
    let curr2 = curr
    pre = null
    // 特别注意循环停止后，最后的状态
    for (let i = left; i <= right; i++) {
        next = curr.next
        curr.next = pre
        pre = curr
        curr = next
    }
    // 这里需要注意，如果一开始就从第一个就要反转，那么就直接 head 等于 pre
    if (pre2 !== null) {
        pre2.next = pre
    } else {
        head = pre
    }
    curr2.next = curr
    return head
};