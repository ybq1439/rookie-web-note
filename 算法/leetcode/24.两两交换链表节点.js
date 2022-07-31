/*
 * @Descripttion: 
 * @version: 
 * @Author: ybq
 * @Date: 2022-07-04 14:17:32
 * @LastEdiTime: 
 */
/* 
    1-新建一个头节点
    2-p.next = right
    3-left.next = right.next
    4-right.next = left
    5-p = left
*/
function ListNode(val = 0, next = null) {
    this.val = val
    this.next = next
}
const swapPairs = function (head) {
    if (!head || head.next == null) {
        return head
    }
    let dummy = new ListNode()
    dummy.next = head
    let p = dummy
    while (p.next !== null && p.next.next !== null) {
        let left = p.next
        let right = p.next.next
        p.next = right
        left.next = right.next
        right.next = left
        p = left
    }
    return dummy.next
};