/*
 * @Descripttion: 
 * @version: 
 * @Author: ybq
 * @Date: 2022-07-03 14:25:03
 * @LastEdiTime: 
 */
function ListNode(val, next) {
    this.val = val === undefined ? 0 : val
    this.next = next === undefined ? null : next
}
// 快慢指针
// 这个题目注意一开始快指针移动的距离，这里使用的是移动 n+1 次
// 因为最后 快指针移动到 null 时，left 位于 倒数第 n+1 个
const removeNthFromEnd = function (head, n) {
    let dummy = new ListNode()
    dummy.next = head
    let left = dummy
    let right = dummy
    let distance = 0
    while (distance <= n) {
        right = right.next
        distance++
    }
    while (right !== null) {
        right = right.next
        left = left.next
    }
    left.next = left.next.next
    return dummy.next
};